# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (outputs to .next/standalone)
npm start        # Start production server
npm run lint     # Run ESLint
```

No test runner is configured.

## Architecture

**Intelligrator** is a Next.js App Router RSS feed reader. The core data flow is:

1. `app/page.tsx` (RSC) renders `<RssClientFeed>` with a default feed URL
2. `components/RssClientFeed.tsx` (client component) fetches `/api/rss?url=...` on mount
3. `app/api/rss/route.ts` uses `rss-parser` to fetch and parse the remote RSS feed, returning JSON

### Key files

| File | Role |
|------|------|
| `app/page.tsx` | Entry point; passes feed URL to RssClientFeed |
| `components/RssClientFeed.tsx` | Client component; fetches, renders feed cards |
| `app/api/rss/route.ts` | API route; parses RSS via `rss-parser`, returns 400/502 on errors |
| `lib/utils.ts` | `cn()` — Tailwind class merging utility used throughout |

### UI layer

- shadcn/ui components (New York style) live in `components/ui/`
- Variants are managed with `class-variance-authority` (CVA)
- Tailwind CSS 4 via PostCSS; dark mode is enabled by default (`.dark` on `<html>`)
- Path alias `@/*` maps to the repo root (configured in `tsconfig.json`)

### Deployment

Dockerfile uses a multi-stage Node 22 Alpine build targeting `next.config.ts`'s `output: "standalone"`. The container runs as a non-root `nextjs` user.
