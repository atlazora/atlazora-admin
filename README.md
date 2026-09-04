# Atlazora Admin

Internal administrative application for Atlazora.

## Foundation

- React
- TypeScript
- Vite
- Authenticated internal SPA

## Architectural Boundaries

- `atlazora-contracts` is the authoritative API/schema contract source.
- Backend/domain authorization remains authoritative.
- Frontend permission-aware behavior is UX enforcement only.
- Direct routine database access is prohibited.
- Administrative actions must preserve authorization, attribution, validation, and auditability requirements.

## Work Unit

Initial foundation established under:

`W00-WU08 — Admin Foundation`
