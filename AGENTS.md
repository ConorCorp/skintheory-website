# AGENTS.md: skintheory.app website

Marketing site and blog for SkinTheory (an acne and skin tracker app). Jekyll on
GitHub Pages: pushing to the publishing branch rebuilds the site. `README.md` has
the full layout of the repo; this file is the short version plus how to write blog
posts. `CLAUDE.md` is a symlink to this file.

The blog works the same way as the one in the sibling `weirdfriends-waitlist`
repo (same folder layout, front matter, `make` targets, and the same
`blog/feed.xml`). Keep the two in step when changing how the blog works.

## Commands

```sh
make install                      # once: Ruby gems into vendor/
make serve                        # http://localhost:4000, live reload, shows future-dated posts
make build                        # build into _site/ as it will go live
make new title="post title"       # new post folder _blog/post-title/index.md
make cover post=<folder> left=a.webp center=b.webp right=c.webp [version=v1.2.3] [label="..."]
```

## Things not to break

- `index.html`, `about.html`, `privacy_policy.html`, `terms.html` and `404.html`
  have no front matter on purpose: Jekyll copies them through byte-for-byte. They
  use relative asset paths (except `404.html`, which must use absolute ones because
  it is served at any missing URL). Don't add front matter to them.
- Their header and footer are written out in each file. If you change the nav or
  footer links, also change `_includes/header.html` and `_includes/cta-footer.html`
  (used by blog, guide and compare pages).
- Blog templates use absolute paths (`/assets/...`, `/blog/...`).
- `home.css` is loaded on blog pages and already uses some generic class names
  (`.phone`, `.section`, `.badge`, ...). Check `assets/css/home.css` before naming
  a new class in `blog.css`.
- Styling uses the tokens in `assets/css/base.css` (`--ink`, `--ink-soft`,
  `--blue`, `--surface`, `--line`, `--shadow-card`, `--font-display`, ...).
- Commit or push only when asked.

## Writing a blog post

1. **Create it**: `make new title="..."`. The folder name becomes the URL
   (`_blog/<folder>/` is served at `/blog/<folder>/`). App release posts use the
   version as the folder name, e.g. `_blog/v3.3.2/` → `/blog/v3.3.2/`: run
   `make new title="v3.3.2"`, rename the folder to `v3.3.2` (the slug turns dots
   into dashes), then set the full title in the front matter.
2. **Front matter**:
   ```yaml
   ---
   title: "v3.3.2 - New UI, 3 free trackers and smarter reminders"
   date: 2026-11-11              # required; sets the order
   author: Conor
   description: "One sentence for the blog card, search results and share previews."
   tags: [app-update]            # optional; shown as pills ("app update")
   image: cover.jpg              # optional cover, in the post's folder
   image_alt: "What the cover shows"
   ---
   ```
   App release posts are titled `vX.Y.Z - <summary>` and tagged `app-update`.
   For a draft, add `published: false`. A future `date` hides the post from the
   blog page and feed, but GitHub Pages only rebuilds on push, so it goes live on
   the first push after that date.
3. **Text**: posts are often copies of Conor's mailing-list emails. Keep his
   wording and voice: fix typos and grammar only, use `##` headings for the
   email's sections, and bold a few key phrases at most. Don't rewrite, add
   marketing copy, or invent details. Mention any edit beyond typo fixes.
   Drop email-only bits that make no sense on the site (e.g. "keep a follow on
   this email list" becomes "join the email list below"; the signup form sits
   under every post).
4. **Images** go in the post's folder, referenced by filename. Convert them to
   WebP and give them a width and height so the page doesn't jump:
   - Phone screenshots (usually 1206x2622): `cwebp -q 82 -resize 640 0 in.png -o name.webp`,
     then `![What the screen shows](name.webp){: .screenshot width="640" height="1391"}`.
     `.screenshot` shows them at phone size, centred.
   - Squarish images such as charts: `cwebp -q 85 in.png -o name.webp`, then
     `{: .narrow width="W" height="H"}` (max 520px wide).
   - Wide images and photos: plain `![alt](photo.webp)` fills the column. Export
     about 1600px wide.
   - Always write real alt text describing what the image shows.
5. **Cover image**: if the post has phone screenshots, render a cover from three
   of them with `make cover post=<folder> left=... center=... right=... version=vX.Y.Z`
   (the centre one is the main screen). It writes `_blog/<folder>/cover.jpg`
   (1600x1000, navy grid, tilted phones; template in `_tools/cover/cover.html`).
   Set `image: cover.jpg` and `image_alt`. Look at the result before using it.
   Without an image the post gets a mascot card and the site's default share image.
6. **Check it**: `make serve`, then look at `/blog/` and the post at phone and
   desktop widths (360px and 1440px at least). Nothing should scroll sideways.
   `/blog/feed.xml` should list the post with absolute image URLs.

## Search and AI discoverability

The site is written to be found in search and recommended by AI assistants. Keep these in sync
whenever features, trackers or pricing change:

- `llms.txt`: plain-text summary for AI assistants (what it does, pricing, positioning, every page URL).
  Add new guide pages to its list.
- `index.html`: the visible FAQ section (`#faq`) and the JSON-LD `@graph` in `<head>` (Organization,
  WebSite, MobileApplication, FAQPage). The FAQPage answers must match the visible answers word for word.
- `robots.txt`: allows all crawlers, including AI ones, and points to the sitemap.
- Facts to state the same way everywhere: SkinTheory is a free acne tracker app for iPhone and Android;
  free for all your own data, forever; Lab+ adds extra trackers and graph features; any 2 Lab+ trackers
  are free at a time. No price is published. Never publish aggregate user stats.
- Core messages: get scientific about your skin with your own data; it tracks a treatment journey *and*
  isolates the real causes around it (gym, bedsheets, diet, sleep, cycle); photos are private, never in
  the camera roll, and yours to keep forever.

## Writing a guide (acne triggers and treatments)

Evergreen guides are Jekyll collections: `_triggers/<name>.md` is served at `/acne-triggers/<name>/` and
`_treatments/<name>.md` at `/acne-treatments/<name>/`, with the layout `_layouts/guide.html`. The hub pages
(`acne-triggers/index.html`, `acne-treatments/index.html`) list them automatically, sorted by `order`.

```yaml
---
title: "Does dairy cause acne?"          # H1, phrased as the question people search
title_tag: "Does Dairy Cause Acne? What the Evidence Says (and How to Test It) | SkinTheory"
short: "Dairy"                           # card label and breadcrumb
description: "Direct 1-2 sentence answer, ~150 chars (lede and meta description)."
updated: 2026-11-11                      # bump when you edit it
order: 1                                 # position on the hub
evidence:                                # trigger guides only; shown as a box above the body and on cards
  level: "Some evidence"                 # Strong evidence | Some evidence | Mixed evidence | Little direct evidence
  summary: "1-2 sentences: what the research shows and its main limitation."
faq:                                     # shown on the page and as FAQPage JSON-LD
  - q: "..."
    a: "2-3 sentences that make sense quoted on their own."
sources:
  - title: "Exact article title"
    publisher: "American Academy of Dermatology"
    url: "https://..."
---
```

- Body: `## The short answer` first, then the evidence, then how to test or track it in SkinTheory with
  one screenshot (`{: .screenshot width="W" height="H"}`, from `assets/img/` or a blog post folder). The layout adds
  the FAQ, sources, a not-medical-advice note and related guides; don't repeat them in the body.
- Evidence levels show as grades A-D: the flask mascot filled to the grade saying "I'd give this a B"
  (`_includes/evidence-level.html`, styles under "Evidence grade" in `blog.css`; key on the triggers hub,
  `_includes/guide-hub.html`). **Strong** (A) = consistent
  findings including controlled trials or clinical consensus; **Some** (B) = fairly consistent observational
  link or small trials, cause not proven; **Mixed** (C) = some studies for, some against, or the effect is small; **Little
  direct** (D) = little evidence of a link, or barely studied; mostly mechanism or expert advice. Rate honestly and make the short answer agree with it.
  Give evidence against a link as well as for it. Don't sugar-coat either way.
- Sources: AAD, NHS, Mayo Clinic, DermNet or peer-reviewed reviews. Only cite pages you've opened and
  that support the claim. Every number and "X says" needs a source you've read.
- Tone: careful with health claims ("evidence is mixed", "for some people"). No dosing advice; point to
  a dermatologist or doctor for diagnosis, prescriptions and side effects.
- Only describe app features that exist (see the facts above). There's no medication, stress or
  side-effect tracker: use the skincare routine, mood, skin feeling and a hypothesis instead.
- Add the new page to `llms.txt`.

## Where things are

| Path | What |
| --- | --- |
| `_blog/<slug>/index.md` | Posts, with their images beside them |
| `blog/index.html` | `/blog/`: newest post as a large card, the rest in a grid |
| `blog/feed.xml` | Atom feed (hand-written; skips future posts, makes image URLs absolute) |
| `_layouts/default.html`, `_layouts/post.html` | Page shell and single post |
| `_includes/` | head (meta, Open Graph, analytics), header, signup, cta-footer, post-card, post-meta, post-tags, mascot |
| `assets/css/blog.css` | All blog styles, including `.prose`, `.screenshot`, `.narrow` |
| `_tools/cover/cover.html` | Cover template used by `make cover` |
| `_triggers/`, `_treatments/` | Guide pages; hubs in `acne-triggers/` and `acne-treatments/` |
| `_layouts/guide.html`, `_includes/guide-card.html`, `_includes/guide-hub.html` | Guide layout, card and hub |
| `compare/index.html` | `/compare/`: SkinTheory vs other ways to track acne |
| `llms.txt`, `robots.txt` | Summary for AI assistants; crawler rules and sitemap link |
