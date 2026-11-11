.PHONY: serve build install new cover clean

# jekyll-sass needs a UTF-8 locale; some shells (and CI) don't set one
export LANG ?= en_US.UTF-8
export LC_ALL ?= en_US.UTF-8

# Run the dev server with live reload at http://localhost:4000
serve:
	bundle exec jekyll serve --livereload --future

# One-off build into _site/ (what GitHub Pages does on push)
build:
	bundle exec jekyll build

# Install Ruby gems (first time, or after Gemfile changes)
install:
	bundle install

# Create a new post folder. Title is optional:
#   make new                     -> _blog/YYYY-MM-DD/index.md, titled with the date
#   make new title="my post"     -> _blog/my-post/index.md
# Drop images in the same folder and reference them by filename.
new:
	@today=$$(date +%Y-%m-%d); \
	if [ -n "$$title" ]; then \
	  slug=$$(printf '%s' "$$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$$//g'); \
	  t=$$(printf '%s' "$$title" | sed 's/"/\\"/g'); \
	else \
	  slug=$$today; \
	  t=$$(date "+%B %-d, %Y"); \
	fi; \
	dir="_blog/$$slug"; \
	if [ -e "$$dir" ]; then echo "already exists: $$dir"; exit 1; fi; \
	mkdir -p "$$dir"; \
	printf -- '---\ntitle: "%s"\ndate: %s\ndescription: ""\nimage: ""\n---\n\n' "$$t" "$$today" > "$$dir/index.md"; \
	echo "created $$dir/index.md"

# Render a 1600x1000 cover.jpg for a post from three of its phone screenshots,
# using _tools/cover/cover.html and headless Chrome:
#   make cover post=my-post left=a.webp center=b.webp right=c.webp version=v1.2.3
# `version` and `label` (default "SkinTheory app update") are optional. Then set
# `image: cover.jpg` in the post's front matter.
CHROME ?= /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
cover:
	@if [ -z "$$post" ] || [ ! -d "_blog/$$post" ]; then \
	  echo 'usage: make cover post=<folder in _blog> left=a.webp center=b.webp right=c.webp [version=v1.2.3] [label="..."]'; exit 1; \
	fi; \
	query=$$(python3 -c 'import sys, urllib.parse; print(urllib.parse.urlencode({k: v for k, v in zip(sys.argv[1::2], sys.argv[2::2]) if v}))' \
	  post "$$post" left "$$left" center "$$center" right "$$right" version "$$version" label "$$label"); \
	tmp=$$(mktemp -d); \
	"$(CHROME)" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
	  --user-data-dir="$$tmp" --window-size=1600,1000 --virtual-time-budget=3000 \
	  --screenshot="$$tmp/cover.png" "file://$(CURDIR)/_tools/cover/cover.html?$$query" >/dev/null 2>&1; \
	sips -s format jpeg -s formatOptions 82 "$$tmp/cover.png" --out "_blog/$$post/cover.jpg" >/dev/null && \
	rm -rf "$$tmp" && echo "created _blog/$$post/cover.jpg"

clean:
	rm -rf _site .jekyll-cache .jekyll-metadata
