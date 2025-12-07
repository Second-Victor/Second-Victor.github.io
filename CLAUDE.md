# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for SecondVictor (Allan Davis' independent iOS app development company), hosted via GitHub Pages at secondvictor.com. The site showcases iOS apps and development updates in a minimal, blog-style format inspired by daringfireball.net.

**No build process required** - pure HTML and CSS, no JavaScript.

## Site Structure

```
/
├── index.html          # Homepage (latest blog post only)
├── styles.css          # All styles for the site
├── CNAME               # Custom domain config (secondvictor.com)
└── public/
    ├── archive.html    # All older blog posts
    ├── about.html      # About page
    ├── img/            # Images and SVG assets
    └── projects/
        ├── projects.html           # Projects listing
        └── when/
            ├── when.html           # When.. app page
            ├── when-terms.html     # Terms and conditions
            └── when-policy.html    # Privacy policy
```

## Layout

All pages share a three-part layout using CSS flexbox:

1. **Header** - "Second Victor" logo linking to homepage
2. **Sidebar** - Navigation links (25% width desktop, horizontal on mobile)
3. **Content** - Main content area (70% width, max 600px)

Navigation: Home | Projects | Archive | About | Email

## CSS

### Variables (in `:root`)
- `--background-color`: #dfeeef (light cyan)
- `--link-color`: #ee481c (orange-red)
- `--text-color`: #053220 (dark green)
- `--blockquote`: #053220a6 (semi-transparent)

### Key Classes
- `.date` - Article date styling
- `.archive-link` - "Older posts" link on homepage
- `.policy` - Terms/policy page styling
- `#when-list` - Feature list on When.. page
- `#link-container` - App Store badge and links

### Typography
- Font: Nunito (Google Fonts, weights 400/500/600/700)
- Body: 13px, Headings: 16px, Site title: 20px

### Responsive
Mobile breakpoint at 768px - switches to single column layout.

## Adding a New Blog Post

1. **Move current post to archive**: Cut the `<article>` from `index.html`, paste at top of posts in `public/archive.html`

2. **Add new post** using template in `index.html`:
```html
<article>
    <h2>Title Here</h2>
    <p class="date">1st January 2025</p>
    <p>Content...</p>
    <p>Allan.</p>
</article>
```

3. **Link to project in title**:
```html
<h2><a href="/public/projects/when/when.html">When..</a> title here</h2>
```

## Path Convention

All internal links use absolute paths from root:
- `/styles.css`
- `/public/img/[filename]`
- `/public/[page].html`

This is required for GitHub Pages with custom domain.

## Deployment

1. Edit HTML files directly
2. Commit to main branch
3. GitHub Pages auto-deploys

## App Store

When.. app: https://apps.apple.com/gb/app/when/id6702031839
