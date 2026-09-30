# SkinTheory website

A static site: plain HTML, CSS and JavaScript, no build step. The repository
root is the site, so GitHub Pages can serve it straight from the branch.

```
├── index.html            landing page
├── about.html            about us page
├── privacy_policy.html   privacy policy (same address as on the old site)
├── terms.html            terms of service
├── 404.html              shown by GitHub Pages for missing pages
├── favicon.svg, favicon.png, apple-touch-icon.png
├── .nojekyll             tells GitHub Pages to serve the files as they are
└── assets/
    ├── css/              fonts.css, base.css (shared), home.css, about.css, legal.css
    ├── js/               main.js (header, reel, reveals), signup.js (email form)
    ├── fonts/            self-hosted Bricolage Grotesque and Figtree
    └── img/              optimized images
```

## Preview

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publishing to GitHub Pages

In the repository settings, under Pages, choose "Deploy from a branch", pick the
branch and the `/ (root)` folder. All paths are relative, so the site works both
on a custom domain and under `username.github.io/repo/`.

For a custom domain, set it in the same settings page. GitHub then adds a
`CNAME` file to the repository.

The social preview tags in `index.html` (`og:url`, `og:image`) point at
`https://skintheory.app`. Change them if the site goes live on another domain.

## Email signup

Set the `data-endpoint` attribute of the signup form in `index.html` to the
mailing list URL. `signup.js` posts the address there as a URL-encoded `email`
field. While it is empty the form shows its success state on localhost only and
sends nothing.

## Images

The files in `assets/img` are already optimized. Screenshots come in two widths
(for example `screen-timeline-360.webp` and `screen-timeline-720.webp`), and the
pages pick one with `srcset`. To replace an image, export it as WebP at the same
widths and keep the file names.
