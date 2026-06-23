import type { AccessDecision, MembershipTier, Role, Session } from './types'

const TIER_ORDER: MembershipTier[] = ['free', 'standard', 'pro']

export function computeAccessDecision(
  session: Session | undefined,
  requirements: { minTier?: MembershipTier; roles?: Role[] },
): AccessDecision {
  const now = new Date().toISOString()

  if (!session || !session.membership) {
    return {
      allowed: false,
      reason: 'Your current membership does not grant access.',
      checkedAt: now,
    }
  }

  const hasRole = requirements.roles
    ? requirements.roles.some(r => session.roles?.includes(r))
    : true

  const meetsTier = requirements.minTier
    ? TIER_ORDER.indexOf(session.membership.tier) >= TIER_ORDER.indexOf(requirements.minTier)
    : true

  if (!hasRole || !meetsTier || !session.membership.active) {
    return {
      allowed: false,
      reason: 'Your current membership does not grant access.',
      checkedAt: now,
    }
  }

  return {
    allowed: true,
    reason: 'Access granted.',
    checkedAt: now,
  }
}
