# GuildPass Frontend (guildpass-integrations)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-green?style=flat-square)](https://nodejs.org)

The main frontend MVP for the GuildPass ecosystem. Built with **Next.js 14 App Router**, TypeScript, Tailwind CSS, wagmi/viem, and React Query, this app provides the member and admin dashboards for the GuildPass token-gated community platform.

> **Part of the [Adamantine-Guild](https://github.com/Adamantine-Guild) project** — a Web3 membership and token-gated community platform built for the open-source ecosystem.

---

## Features (MVP)

- **Member dashboard** — wallet connect, membership state, community & tier, expiration, badges placeholder, gated resources, profile summary
- **Admin dashboard** — overview, member list, role assignment, resource access policies, community settings
- **Access-gated experiences** — gated pages, gated content sections, event access, denied states, upgrade/renew placeholders
- **Wallet-aware UX** — connect flow, authenticated member experience, role-aware UI states, admin-only sections
- **Local development** — mock/demo mode with seeded fake data; typed API layer switches between mock and live

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone and enter
git clone https://github.com/Adamantine-Guild/guildpass-integrations.git
cd guildpass-integrations

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local as needed (mock mode requires no changes)
```

### Run in mock / demo mode

```bash
NEXT_PUBLIC_MOCK_MODE=true npm run dev
```

Open http://localhost:3000.

### Run against live guildpass-core

```bash
# Set NEXT_PUBLIC_CORE_API_URL in .env.local first
npm run dev
```

---

## Environment Variables

| Variable | Required | Description |
| ---- | ------- | ----------- |
| `NEXT_PUBLIC_MOCK_MODE` | No | Set `true` to use in-memory mock API (no backend needed) |
| `NEXT_PUBLIC_DEMO_MODE` | No | Alias for `NEXT_PUBLIC_MOCK_MODE` |
| `NEXT_PUBLIC_CORE_API_URL` | Live mode only | Base URL of the `guildpass-core` access-api |

See [`.env.example`](./.env.example) for a ready-to-copy template.

---

## Scripts

```bash
npm run dev        # Start Next.js dev server (http://localhost:3000)
npm run build      # Production build
npm run start      # Start production server (after build)
npm run lint       # Lint via Next.js ESLint config
npm run typecheck  # TypeScript type checking
```

---

## Architecture

| Path | Purpose |
| ---- | ------- |
| `app/*` | Next.js App Router pages |
| `lib/wallet/providers.tsx` | wagmi and React Query global providers |
| `lib/api/*` | API layer (`getApi(address?)` switches mock ↔ live) |
| `lib/api/live.ts` | Live integration with `guildpass-core` |
| `lib/api/types.ts` | Shared TypeScript types |
| `components/ui/*` | Minimal shadcn-style UI primitives |
| `components/gated.tsx` | Access-gate component |
| `components/admin-guard.tsx` | Admin-only section guard |
| `components/nav.tsx` | Navigation bar |

---

## Integration Points

- **Access API**: `lib/api/live.ts` integrates with `guildpass-core` `/v1/*` endpoints
- **Contract clients/ABIs**: Add viem/wagmi hooks in feature modules as needed
- **Shared types**: `lib/api/types.ts` — align with `guildpass-core` shared types package

---

## What's Implemented vs Deferred

**Implemented**:
- Core member and admin surfaces listed above
- Basic role assignment and policy editing
- Gated pages and states

**Deferred (intentionally)**:
- Advanced analytics and governance
- Rich profile customization and contribution history
- Social graph and advanced moderation
- Complex admin workflows, rewards visualization, full event management
- Complete billing/subscription management UX

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide.

### How to contribute

1. Browse open issues tagged [`good first issue`](https://github.com/Adamantine-Guild/guildpass-integrations/issues?q=label%3A%22good+first+issue%22) or [`help wanted`](https://github.com/Adamantine-Guild/guildpass-integrations/issues?q=label%3A%22help+wanted%22).
2. Comment directly on the GitHub issue you'd like to work on.
3. Fork the repo, create a feature branch, implement your change, open a PR.

### Maintainer contact

- Contact: cerealboxx123@gmail.com

## License

MIT — see [LICENSE](./LICENSE).
