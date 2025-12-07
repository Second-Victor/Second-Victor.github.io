# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for SecondVictor (Allan Davis' independent iOS app development company), hosted via GitHub Pages at secondvictor.com. The site showcases iOS apps and development updates in a minimal, blog-style format inspired by daringfireball.net.

## Architecture

### Site Structure

The site uses a simple static HTML/CSS architecture with no build process:

- **Root files**: Main homepage (`index.html`) with blog-style updates
- **Shared styles**: Single `styles.css` file used across all pages via absolute path `/styles.css`
- **Public directory**: Contains all sub-pages and assets
  - `public/about.html` - About page with company/developer background
  - `public/projects/projects.html` - Projects listing page
  - `public/projects/when/` - Project-specific directory for the "When.." iOS app
  - `public/img/` - All images and SVG assets
  - `public/js/script.js` - ScrollReveal animation configuration

### Layout System

All pages share a consistent three-part layout structure:

1. **Header**: Top-aligned logo/title ("Second Victor") linking to homepage
2. **Sidebar**: Left-aligned navigation (25% width) with links to Home, Projects, About, and email contact
3. **Content**: Main content area (70% width, max 600px) using `<article>` tags

The layout uses CSS flexbox (`.container` with `.sidebar` and `.content`).

### Navigation Paths

All internal links use absolute paths from root:
- Stylesheet: `/styles.css`
- JavaScript: `/public/js/script.js`
- Images: `/public/img/[filename]`
- Pages: `/public/[page].html` or `/public/projects/[project]/[page].html`

This is critical for GitHub Pages hosting with the CNAME domain setup.

## Styling Conventions

### CSS Variables

The site uses CSS custom properties in `styles.css`:
- `--background-color`: #dfeeef (light cyan)
- `--link-color`: #ee481c (orange-red)
- `--text-color`: #053220 (dark green)
- `--blockquote`: #053220a6 (dark green with transparency)

### Component-Specific Styles

- **When app styles**: ID selectors `#when-list`, `#wrap-image`, `#link-container`
- **Terms/Policy pages**: `.policy` class with nested styling
- **Date stamps**: `.date` class for article dates

### Typography

- Font: 'Nunito' (Google Fonts, weights 200-1000)
- Font sizes are small and consistent: 13px for body text, 16px for headings, 20px for site title
- Font weights: 400 (normal), 500 (medium), 600 (semi-bold), 700 (bold for header)

## JavaScript

The site uses ScrollReveal library (loaded via CDN) for entrance animations configured in `public/js/script.js`:
- Logo reveals from top with 200ms delay
- Sidebar reveals from left with 400ms delay
- 90px distance, 2000ms duration, 450ms base delay, with reset enabled

## Deployment

The site is deployed to GitHub Pages with a custom domain (secondvictor.com) configured via the CNAME file. Content updates are made by:
1. Editing HTML files directly
2. Committing changes to the main branch
3. GitHub Pages automatically serves the updated content

New blog posts are added as `<article>` elements in `index.html` with this structure:
```html
<article>
    <h2>Article Title</h2>
    <p class="date">Date</p>
    <p>Content paragraphs...</p>
</article>
```

## Adding New Projects

To add a new project page:
1. Create directory under `public/projects/[project-name]/`
2. Add main project page as `[project-name].html`
3. Include terms and policy pages if needed (see `when-terms.html` and `when-policy.html` as templates)
4. Add project icon to `public/img/`
5. Update `public/projects/projects.html` with new project listing
6. Use the standard header/sidebar/content layout structure
7. Link to the project from homepage articles as updates occur
