# Legacy redirect branch

This branch is not the blog. It holds one file, `vercel.json`, whose only job is
to 301 every URL from the retired Vercel deployment to the current site:

**https://koalalikecode.duykhanhchi1993.workers.dev**

The blog itself lives on `main`.

## Why this exists rather than just deleting the Vercel project

The old blog ran from August 2022 to September 2026, so its URLs may be indexed
and may have been shared. Deleting the project outright would turn every one of
those links into a dead end and discard whatever search ranking they accumulated.

Post URLs were deliberately kept identical during the rebuild, so the mapping is
exact rather than approximate:

| Old URL | Redirects to |
| --- | --- |
| `/blogs/<slug>` | `/blogs/<slug>/` |
| `/tags/<tag>` | `/tags/<tag>/` |
| `/categories/<name>` | `/tags/` |
| `/search` | `/search/` |
| `/admin/*`, `/api/*` | `/` |
| anything else | `/` |

Categories were dropped in the rebuild — every post was filed under `code`, so
the taxonomy carried no information that tags did not already carry.

301 rather than Vercel's default 308: both are permanent, but 301 is understood
by every crawler and proxy, including old ones.

Order matters. Vercel evaluates redirects top to bottom, so the `/(.*)` catch-all
sits last and only sees paths no earlier rule matched.

## Retiring the old admin surface

The old deployment kept serving `/admin/login` and `/api/comments/add` right up
until this branch replaced it. That build had a weak admin login and an
unsanitised comment endpoint that rendered arbitrary HTML. Redirecting those
paths removes both, and this branch ships no server code and no database
connection at all.

## Deploying this

In the Vercel project, set the production branch to `legacy-redirect`. There is
nothing to build: no `package.json`, no framework, just static configuration.

## When the site moves again

Every destination in `vercel.json` is an absolute URL. If the blog gets a custom
domain, update this file too or these redirects will keep pointing at the old
workers.dev hostname.

## When to delete this

Keep it until Google has moved the old URLs across — six to twelve months is the
usual guidance. Search Console will show when the old URLs stop being requested.
After that, the Vercel project and this branch can both go.
