# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 0.1.x (main) | ✅ Yes |

## Reporting a Vulnerability

If you discover a security vulnerability, **do not** open a public GitHub issue.

### How to report

1. **Email** **cerealboxx123@gmail.com** with subject `[SECURITY] guildpass-integrations — <brief description>`.
2. Include a description of the vulnerability, steps to reproduce, and potential impact.
3. We will acknowledge receipt within **72 hours** and provide an assessment within **7 days**.

### Scope

This repository is a Next.js frontend application.

**In-scope concerns:**
- Exposure of wallet addresses or private user data via the API layer
- Client-side authentication or access-gate bypass
- Cross-site scripting (XSS) in rendered wallet data or community content
- Environment variable leakage (e.g., server-only secrets exposed client-side via `NEXT_PUBLIC_*`)
- Unsafe use of `dangerouslySetInnerHTML`

**Out-of-scope for this repo:**
- Vulnerabilities in `guildpass-core` backend — report there
- Wagmi / viem / Next.js library vulnerabilities — report to their maintainers

### Disclosure Policy

- We ask for a **90-day** coordinated disclosure window before public disclosure.
- We will credit reporters in release notes unless you prefer anonymity.

Thank you for helping keep GuildPass secure.
