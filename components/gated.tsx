'use client'
import { ReactNode, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { getApi, type MembershipTier, type Role } from '@/lib/api'
import { computeAccessDecision } from '@/lib/api/access-decision'
import {
  accessKeys,
  ACCESS_DECISION_STALE_TIME,
  ACCESS_DECISION_GC_TIME,
} from '@/lib/query'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { LoadingState, ErrorState, safeErrorMessage } from './ui/api-states'

export function Gated({
  children,
  minTier,
  roles,
  resourceId
}: {
  children: ReactNode
  minTier?: MembershipTier
  roles?: Role[]
  resourceId?: string
}) {
  const { address, chain } = useAccount()
  const env = String(chain?.id ?? 1)

  const { data: session, isLoading: sessionLoading, isError, error, refetch } = useQuery({
    queryKey: ['session', address],
    queryFn: () => getApi(address).getSession(),
    enabled: !!address,
    retry: 1,
  })

  const { data: cachedDecision, isLoading: decisionLoading } = useQuery({
    queryKey: accessKeys.decision(env, address ?? '', resourceId ?? ''),
    queryFn: () => computeAccessDecision(session!, { minTier, roles }),
    enabled: !!session && !!resourceId,
    staleTime: ACCESS_DECISION_STALE_TIME,
    gcTime: ACCESS_DECISION_GC_TIME,
    retry: 1,
  })

  const fallbackDecision = useMemo(
    () => session ? computeAccessDecision(session, { minTier, roles }) : undefined,
    [session, minTier, roles]
  )

  const decision = resourceId ? cachedDecision : fallbackDecision
  const isLoading = resourceId ? (sessionLoading || decisionLoading) : sessionLoading

  if (!address) {
    return <AccessDenied reason="Please connect your wallet to continue." />
  }

  if (isLoading) {
    return <LoadingState message="Checking access…" />
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not verify access"
        message={safeErrorMessage(error)}
        onRetry={() => refetch()}
      />
    )
  }

  if (!decision?.allowed) {
    return <AccessDenied reason={decision?.reason ?? 'Your current membership does not grant access.'} />
  }

  return <>{children}</>
}

export function AccessDenied({ reason }: { reason: string }) {
  return (
    <div className="rounded-md border p-6">
      <div className="text-lg font-medium mb-2">Access Denied</div>
      <div className="text-sm text-muted-foreground mb-4">{reason}</div>
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className={buttonVariants()}>Back to Dashboard</Link>
        <Link href="/dashboard" className={buttonVariants({ variant: 'outline' })}>Upgrade or Renew</Link>
      </div>
    </div>
  )
}
