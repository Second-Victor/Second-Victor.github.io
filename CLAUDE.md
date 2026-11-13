# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for SecondVictor (Allan Davis' independent iOS app development company), hosted via GitHub Pages at secondvictor.com. The design is a "todo.txt" theme: monospace system fonts, markdown-style headings, and a homepage that shows the post history as a todo.txt file.

**No build process required** - pure HTML and CSS, plus one small optional script. No web fonts (system fonts only), so pages load fast.

## Site Structure

```
/
├── index.html          # Homepage: intro, "(A) next up" line, todo.txt post log, apps list
├── styles.css          # All styles for the site
├── CNAME               # Custom domain config (secondvictor.com)
└── public/
    ├── archive.html    # Every post in full, newest first, each with id="post-YYYY-MM-DD"
    ├── about.html      # About page
    ├── js/sv.js        # Optional extras (see JavaScript below)
    ├── img/            # Images and SVG assets
    └── projects/
        ├── projects.html           # Projects listing
        ├── when/                   # When.. app page, terms and policy
        ├── downward/               # Downward app page, terms and policy
        ├── done/                   # Done.. app page, terms and policy (linked from the app's About screen)
        └── dinkus/                 # Dinkus app page, terms and policy
```

URLs must never change: the apps link to the project, terms and policy pages.

## Layout

Every page keeps the same markup: `header .logo h1`, then `.container` holding `aside.sidebar nav` and `main.content`. The CSS flattens `.container` (`display: contents`) and puts the logo and nav on one top row with the content below, so the HTML of the inner pages didn't need to change.

Navigation: Home | Projects | Archive | About | Email. The current section is marked with `aria-current="page"` (project pages mark Projects). The envelope icon is hidden by CSS and shown as the word "email". On phones the "home" link is hidden (the logo goes home).

A footer line comes from `body::after` in styles.css (update the year there).

## CSS

### Variables (in `:root`, with a dark set)
- `--bg`, `--paper`, `--panel`: page, card and bar backgrounds
- `--fg`, `--dim`, `--faint`: text colours (all pass 4.5:1 contrast)
- `--line`: borders
- `--pri`: orange, for the cursor and the (A) priority
- `--proj` (blue, +projects and links), `--ctx` (purple, @contexts)
- `--mono`: the system monospace stack

Dark mode follows the system (`prefers-color-scheme`), unless the visitor picks one with the toggle, which sets `data-theme="light|dark"` on `<html>` and saves it in localStorage. A one-line script in each page's `<head>` applies the saved choice before paint.

### Content styling
Inner pages read like markdown: `h2` gets a "# " prefix, policy `h3` gets "## ", list items get "- ", and `.date` gets "x " (a done todo.txt line).

### Key Classes
- `.date` - Article date styling
- `.archive-link` - "Older posts" link
- `.policy` - Terms/policy page styling
- `.wrap-image` - App icon floated beside text on project pages
- `#link-container` - App Store badge and links
- Homepage: `.hero`, `.next`, `.log`, `.file`, `.lines`, `.tag`, `.apps`

## JavaScript (`/public/js/sv.js`, optional)

Loaded with `defer` on every page. The site works fully without it. It adds:
- the light/dark toggle button at the end of the nav (every page)
- on the homepage: tag filter chips with counts, the grep search box with highlighting, hide done, and the pretty/raw view

Elements that only make sense with the script have `hidden` and `data-js`; the script reveals them.

## Adding a New Blog Post

1. **Write the post at the top of `public/archive.html`** (below the Archive intro), with an id:
```html
<article id="post-2027-01-31">
    <h2><a href="/public/projects/when/when.html">When..</a> title here</h2>
    <p class="date">31st January 2027</p>
    <p>Content...</p>
    <p>Allan.</p>
</article>
```

2. **Add a line to the homepage log** in `index.html`, just under the (A) line, and renumber the `.n` spans:
```html
<li class="done">
    <span class="n" aria-hidden="true">2</span>
    <span class="mark">x</span>
    <span class="body">
        <time datetime="2027-01-31">2027-01-31</time>
        <a class="title" href="/public/archive.html#post-2027-01-31">When.. title here</a>
        <span class="line-tags"><span class="tag proj">+When</span> <span class="tag ctx">@AppStore</span></span>
    </span>
</li>
```
Use `tag proj` for +Project tags and `tag ctx` for @context tags. The script builds the filter chips and counts from these automatically.

3. **Update "next up"**: the `.next` link in the hero and the `(A)` line at the top of the log (class `open`).

## Path Convention

All internal links use absolute paths from root:
- `/styles.css`
- `/public/js/sv.js`
- `/public/img/[filename]`
- `/public/[page].html`

This is required for GitHub Pages with custom domain.

## Deployment

1. Edit HTML files directly
2. Commit to main branch
3. GitHub Pages auto-deploys

## App Store

When.. app: https://apps.apple.com/gb/app/when/id6702031839
