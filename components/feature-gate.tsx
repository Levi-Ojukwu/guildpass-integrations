import { ReactNode } from 'react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export function FeatureUnavailable({ name }: { name: string }) {
  return (
    <div className="rounded-md border p-6 max-w-lg">
      <div className="text-lg font-medium mb-2">{name} is not available</div>
      <p className="text-sm text-muted-foreground mb-4">
        This module is not enabled in the current environment. If you are a
        developer, set the corresponding{' '}
        <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">
          NEXT_PUBLIC_FEATURE_*
        </code>{' '}
        variable to <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">true</code>{' '}
        in your <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">.env.local</code>.
      </p>
      <Link href="/dashboard" className={buttonVariants({ variant: 'outline' })}>
        Back to Dashboard
      </Link>
    </div>
  )
}

export function FeatureGate({
  enabled,
  name,
  children,
}: {
  enabled: boolean
  name: string
  children: ReactNode
}) {
  if (!enabled) return <FeatureUnavailable name={name} />
  return <>{children}</>
}
