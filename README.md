# koalalikecode blog

Personal blog built with [Astro](https://astro.build). Posts are Markdown files in the repo, built to fully static HTML.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro 7 (static, zero JS by default) |
| Language | TypeScript strict |
| Content | Content Collections + Markdown/MDX, validated with Zod |
| CSS | Tailwind CSS v4 (CSS-first config, no JS config file) |
| Code blocks | Expressive Code (Shiki), highlighted at build time |
| Search | Pagefind — static index, no backend |
| Comments | Giscus (GitHub Discussions) |
| SEO | sitemap, RSS, JSON-LD, canonical, OG |

## Running locally

```bash
npm install
npm run dev          # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build to `dist/`, then generate the search index |
| `npm run preview` | Serve the build (needed to test search) |
| `npm run check` | Type-check TypeScript and Astro templates |

> Search only works after `npm run build`, because the Pagefind index is generated at build time. In `npm run dev` the search page reports that the index is missing.

## Writing a post

Create a file in `src/content/blog/`:

```markdown
---
title: "Post title"
description: "Short summary, shown in listings and OG tags."
slug: "post-url-slug"
pubDate: 2026-09-11
tags: ["javascript", "frontend"]
categories: ["code"]
heroImage: "../../assets/blog/image-name.png"
draft: false
---

Body written in Markdown.
```

Posts with `draft: true` appear in dev but are excluded from production builds.

Images live in `src/assets/blog/` and are referenced by relative path, so Astro resizes them, converts formats, and emits width/height to prevent layout shift.

### Why `.md` and not `.mdx`

Content migrated from the old blog contains unclosed `<br>` tags outside code blocks. MDX parses HTML as JSX, so those break the build. `.mdx` still works for new posts that need to embed components.

## Layout

```
src/
  assets/blog/       post images (optimised at build time)
  components/        shared components
  content/blog/      posts (.md)
  layouts/           page shells
  lib/posts.ts       post queries, reading time, related posts
  pages/             routes
  styles/global.css  design tokens and article typography
  consts.ts          site config — change SITE_URL before deploying
migration/           archived data from the old MongoDB blog
```

## Deploying

Hosted on Cloudflare Workers with static assets, configured in `wrangler.jsonc`.
Workers rather than Pages because Cloudflare now directs new projects there —
Pages still runs, but feature work has moved to Workers.

A purely static site needs no Worker script: Cloudflare serves the built files
in `dist/` directly.

```bash
npm run build
npx wrangler deploy            # manual deploy
npx wrangler deploy --dry-run  # validate config without uploading
```

For automatic deploys, connect the repository under **Workers & Pages → your
Worker → Settings → Builds**, with build command `npm run build`, output
directory `dist`, and the environment variable `NODE_VERSION=22` (Astro 7
requires Node 20 or newer).

### Before the first deploy

1. Set `SITE_URL` in `src/consts.ts` to the real domain, and match the
   `Sitemap:` line in `public/robots.txt`
2. Install the [Giscus app](https://github.com/apps/giscus) on the repository —
   Discussions is already enabled and the ids are already wired up

## History

The previous Next.js 14 + MongoDB version is tagged `v1-nextjs`. Content was migrated to Markdown; `migration/` holds the original records for reference.
