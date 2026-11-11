# SkinTheory website

The marketing site and blog for [skintheory.app](https://skintheory.app). GitHub
Pages builds it with Jekyll on every push to the publishing branch, so there's
no build step to run before committing.

The blog works the same way as the weirdfriends.app blog: same folder layout,
front matter and `make` commands. Only the look is different.

```
├── index.html            landing page
├── about.html            about us page
├── privacy_policy.html   privacy policy (same address as on the old site)
├── terms.html            terms of service
├── 404.html              shown by GitHub Pages for missing pages (absolute paths, so it works at any depth)
├── favicon.svg, favicon.png, apple-touch-icon.png
├── blog/
│   ├── index.html        /blog/: list of posts
│   └── feed.xml          /blog/feed.xml: Atom feed
├── _blog/<slug>/         one folder per post: index.md plus its images
├── _layouts/             default.html (head, header, footer) and post.html
├── _includes/            head, header, signup, cta-footer, post-card, post-meta, mascot
├── _config.yml           Jekyll settings and the blog collection
└── assets/
    ├── css/              fonts.css, base.css (shared), home.css, about.css, legal.css, blog.css
    ├── js/               main.js (header, reel, reveals), signup.js (email form)
    ├── fonts/            self-hosted Bricolage Grotesque and Figtree
    └── img/              optimized images
```

The hand-made pages (`index.html`, `about.html`, `privacy_policy.html`,
`terms.html`, `404.html`) have no front matter, so Jekyll copies them through
untouched. Their header and footer are still written out in each file. If you
change one, change the others and `_includes/header.html` /
`_includes/cta-footer.html` too.

Blog pages use absolute paths (`/assets/...`). The site is served from the
root of `skintheory.app`, so it doesn't need to work under a sub-path.

## Adding a blog post

```sh
make new title="my post title"
```

Each post is a folder in `_blog/` holding an `index.md` and any images for that post:

```
_blog/
  my-post-title/
    index.md
    cover.jpg
```

Without a title the folder is named with today's date, e.g. `_blog/2026-11-11/`.
The folder name is the URL, so `_blog/my-post-title/` is served at
`/blog/my-post-title/`.

Front matter:

```markdown
---
title: my post title
date: 2026-11-11
author: Conor
description: one-line summary shown on the blog index, in search results and share previews (optional)
image: cover.jpg               # featured image (optional)
image_alt: what's in the image # (optional)
tags: [app-update]             # shown as pills, "app-update" -> "app update" (optional)
---
```

- **`date`** is required and sets the ordering. A post dated in the future is
  left off the blog page and the feed. GitHub Pages only rebuilds on a push,
  so the post goes live on the first push after that date, not on the date
  itself. It also shows up in `sitemap.xml` early, because Jekyll 3 keeps
  future posts in the collection. For a draft, add `published: false` instead
  and remove it when the post is ready.
- **Featured image**: shown at the top of the post, on its card on `/blog/`,
  and as the share preview. A plain filename is looked up in the post's folder;
  `/...` paths and full URLs are used as they are. Posts without one get a card
  with the mascot, and share the site's `og.jpg`.
- **Inline images**: `![alt text](photo.jpg)` next to the post fills the text column.
  For phone screenshots add `{: .screenshot}` so they show at phone size, centred,
  and for squarish images like charts add `{: .narrow}` (max 520px):
  `![The Timeline screen](timeline.webp){: .screenshot}`. Export phone screenshots
  at 640px wide (`cwebp -q 82 -resize 640 0 in.png -o out.webp`).
- **Cover from screenshots**: `make cover post=<folder> left=a.webp center=b.webp right=c.webp version=v1.2.3`
  renders a 1600×1000 `cover.jpg` in the post's folder: three tilted phones on the
  navy grid, with an optional version pill. The template is `_tools/cover/cover.html`;
  it needs Google Chrome. Then set `image: cover.jpg`.
- Reading time is worked out from the word count (200 words a minute).

`AGENTS.md` (with `CLAUDE.md` linked to it) has the same steps written for AI
coding agents, including how to edit an email into a post.

The newest post is shown as a large card at the top of `/blog/`, and the
rest go in a grid below it. Each post ends with up to two "More posts", the
email signup and the download section.

## Guides, compare page and AI summary

- **Acne triggers** (`_triggers/<name>.md` → `/acne-triggers/<name>/`) and **acne treatments**
  (`_treatments/<name>.md` → `/acne-treatments/<name>/`) are evergreen guides with a question-style
  title, an FAQ and sources in the front matter. The hub pages list them automatically.
- `/compare/` compares SkinTheory with other ways of tracking acne.
- `llms.txt` is a plain-text summary of the app for AI assistants, and `robots.txt` lets search and AI
  crawlers in. The home page has a visible FAQ plus matching JSON-LD.

When features, trackers or pricing change, update `llms.txt`, the home FAQ and its JSON-LD together.
`AGENTS.md` has the guide template and rules.

## Preview

One-time setup (Ruby 3.3 via rbenv, then the same gems GitHub Pages uses):

```sh
rbenv install -s 3.3.9   # .ruby-version pins the repo to this
make install
```

Then:

```sh
make serve
```

Open http://localhost:4000. Edits to markdown, layouts, includes and CSS
rebuild automatically; changes to `_config.yml` need a restart. `make serve`
also shows future-dated posts; `make build` writes the site as it will go
live to `_site/`.

## Publishing to GitHub Pages

In the repository settings, under Pages, choose "Deploy from a branch", pick the
branch and the `/ (root)` folder. GitHub runs Jekyll on every push. The custom
domain is set in the same settings page and recorded in `CNAME`.

The social preview tags in `index.html` (`og:url`, `og:image`) point at
`https://skintheory.app`, as does `url` in `_config.yml`.

`sitemap.xml` and `robots.txt` are generated by the `jekyll-sitemap` plugin.

## Email signup

The signup form's `data-endpoint` attribute is the Loops form URL. It appears
in `index.html`, `about.html` and `_includes/signup.html`. `signup.js` posts the
address there as a URL-encoded `email` field.

## Images

The files in `assets/img` are already optimized. Screenshots come in two widths
(for example `screen-timeline-360.webp` and `screen-timeline-720.webp`), and the
pages pick one with `srcset`. To replace an image, export it as WebP at the same
widths and keep the file names.

Blog images aren't resized for you. Export them at about 1600px wide (JPEG or
WebP) before adding them to a post's folder.
