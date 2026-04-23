# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SvelteKit E-commerce — Full e-commerce storefront with product catalog, category filtering, Svelte 5 reactive cart store, cart drawer checkout, and Supabase-backed authentication.

Built with SvelteKit 2, Svelte 5, TypeScript, Tailwind CSS v4, and Supabase.

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Production build
npm run preview          # Preview production build
npm run check            # svelte-check (type checking)
npm run lint             # ESLint + Prettier
npm run format           # Prettier write

# Testing
npm run test             # Run unit tests (vitest)
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report (lcov + text)
npm run test:e2e         # Playwright E2E tests

# Supabase (requires Supabase CLI)
npx supabase start       # Start local Supabase (DB:54322, Studio:54323, API:54321)
npx supabase db reset    # Reset DB and run seed data
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
PUBLIC_SUPABASE_URL=http://localhost:54321
PUBLIC_SUPABASE_ANON_KEY=<local anon key from supabase start>
SUPABASE_SERVICE_ROLE_KEY=<local service role key from supabase start>
```

## Architecture

- `src/routes/` — File-based routing (`+page.svelte`, `+page.server.ts`, `+server.ts`)
  - `src/routes/auth/login/` — Email/password sign-in page
  - `src/routes/auth/signup/` — Account creation page
  - `src/routes/products/` — Product listing and detail pages
  - `src/routes/checkout/` — Checkout flow
  - `src/routes/orders/` — Order history
  - `src/routes/account/` — Account settings
- `src/lib/` — Shared library code (`$lib` alias)
  - `src/lib/supabase.ts` — Browser Supabase client (`supabase` export)
  - `src/lib/supabase.server.ts` — Server Supabase clients (`supabaseAdmin`, `createServerClient`)
  - `src/lib/stores/` — Svelte 5 runes-based reactive state
    - `auth.svelte.ts` — Auth state (`authStore`)
    - `cart.svelte.ts` — Cart state with localStorage persistence (`cart`)
  - `src/lib/components/` — Reusable Svelte components
  - `src/lib/types/database.ts` — Supabase generated database types
- `src/hooks.server.ts` — SvelteKit server hooks for Supabase session handling
- `supabase/` — Database migrations and seed data
- `e2e/` — Playwright E2E specs
- `src/**/__tests__/` — Vitest unit tests (co-located with source)
- `vitest.config.ts` — Vitest configuration (overrides vite.config.ts test block)
- `playwright.config.ts` — Playwright configuration (baseURL: localhost:5173)

## Supabase Integration

- Browser client (`src/lib/supabase.ts`): uses `PUBLIC_SUPABASE_URL` + `PUBLIC_SUPABASE_ANON_KEY`
- Server admin client (`supabaseAdmin`): uses `SUPABASE_SERVICE_ROLE_KEY`, bypasses RLS
- Server user client (`createServerClient(accessToken?)`): passes user JWT for RLS enforcement
- Session management in `hooks.server.ts` via `supabase.auth.getUser()`

## Rules

- Use `+page.server.ts` for server-side data loading
- Use `+server.ts` for API endpoints
- TypeScript for all `.ts` files; type annotations in `.svelte` `<script lang="ts">`
- Tailwind utility classes for styling — no custom CSS files
- Use SvelteKit form actions for mutations
- Svelte 5 runes (`$state`, `$derived`, `$effect`) for reactive state
- ARIA labels required on all interactive elements
- Auth pages use the browser `supabase` client directly (no server action needed for auth)

## Testing

- Unit tests: `src/**/__tests__/*.test.ts` — run with `npm run test`
- E2E tests: `e2e/*.spec.ts` — run with `npm run test:e2e`
- Mock SvelteKit env modules in unit tests:
  ```typescript
  vi.mock("$env/static/public", () => ({
    PUBLIC_SUPABASE_URL: "http://localhost:54321",
    PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
  }));
  vi.mock("$app/environment", () => ({ browser: false }));
  ```
