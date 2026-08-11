# Rosemont Grove — Brampton Landing

Independent luxury landing website for **Rosemont Grove**, a Hallett Homes detached-home community at Heritage Road & Steeles Avenue West in Brampton, Ontario.

## Stack

- Next.js App Router (TypeScript)
- Tailwind CSS v4
- Zod validation
- Server Components by default

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Configuration

Update business and project details in:

- `src/config/site.ts` — brokerage, phone, email, analytics IDs, domain
- `src/data/project.ts` — verified project facts
- `src/data/faq.ts` — FAQ answers

Environment variables are documented in `.env.example`.

### Lead delivery

- Default: `CRM_PROVIDER=console` (development logging)
- Production webhook: set `CRM_PROVIDER=webhook`, `CRM_WEBHOOK_URL`, and optional `CRM_API_KEY`

### Images

Place approved project imagery in `public/images/` and update paths in `src/data/project.ts`. Current imagery is atmospheric/illustrative pending official renderings.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Notes

This site is an independent real estate marketing website and is not the official Hallett Homes website.
