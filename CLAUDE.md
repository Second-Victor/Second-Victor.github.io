# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for SecondVictor (Allan Davis' independent iOS app development company), hosted via GitHub Pages at secondvictor.com. The site showcases iOS apps and development updates in a minimal, blog-style format inspired by daringfireball.net.

## Architecture

### Site Structure

The site uses a simple static HTML/CSS architecture with no build process:

- **Root files**: Main homepage (`index.html`) displays only the latest blog post
- **Shared styles**: Single `styles.css` file used across all pages via absolute path `/styles.css`
- **Public directory**: Contains all sub-pages and assets
  - `public/archive.html` - Archive of all older blog posts
  - `public/about.html` - About page with company/developer background
  - `public/projects/projects.html` - Projects listing page
  - `public/projects/when/` - Project-specific directory for the "When.." iOS app
  - `public/img/` - All images and SVG assets

### Layout System

All pages share a consistent three-part layout structure:

1. **Header**: Top-aligned logo/title ("Second Victor") linking to homepage
2. **Sidebar**: Left-aligned navigation (25% width on desktop, horizontal on mobile) with links to Home, Projects, Archive, About, and email contact
3. **Content**: Main content area (70% width, max 600px) using `<article>` tags

The layout uses CSS flexbox (`.container` with `.sidebar` and `.content`) and is fully responsive.

### Navigation

All pages include these navigation links:
- Home (`/`)
- Projects (`/public/projects/projects.html`)
- Archive (`/public/archive.html`)
- About (`/public/about.html`)
- Email (mailto link with envelope icon)

### Navigation Paths

All internal links use absolute paths from root:
- Stylesheet: `/styles.css`
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
- **Archive link**: `.archive-link` class for "Older posts" link on homepage

### Typography

- Font: 'Nunito' (Google Fonts, weights 400, 500, 600, 700 only)
- Font sizes are small and consistent: 13px for body text, 16px for headings, 20px for site title
- Font weights: 400 (normal), 500 (medium), 600 (semi-bold), 700 (bold for header)

### Responsive Design

Mobile breakpoint at 768px:
- Layout switches to single column (header, then horizontal nav, then content)
- Navigation items display horizontally with flexbox
- Content area gets full width with 25px/35px padding

### Accessibility

- Skip links on all pages (`.skip-link`)
- Focus indicators for keyboard navigation
- Aria-labels on icon links
- Images have appropriate alt text

## Adding a New Blog Post

The homepage shows only the latest post. To add a new post:

1. **Move the current post to archive**: Cut the `<article>` from `index.html` and paste it at the top of the posts in `public/archive.html` (after the "Archive" header article)

2. **Add new post to homepage**: Use the template in `index.html`:
```html
<article>
    <h2>Title Here</h2>
    <p class="date">1st January 2025</p>
    <p>First paragraph...</p>
    <p>More paragraphs as needed...</p>
    <p>Allan.</p>
</article>
```

3. **To link to a project in the title**:
```html
<h2><a href="/public/projects/when/when.html">When..</a> title here</h2>
```

4. **For feature lists**:
```html
<ul>
    <li>Feature one</li>
    <li>Feature two</li>
</ul>
```

## Deployment

The site is deployed to GitHub Pages with a custom domain (secondvictor.com) configured via the CNAME file. Content updates are made by:
1. Editing HTML files directly
2. Committing changes to the main branch
3. GitHub Pages automatically serves the updated content

## Adding New Projects

To add a new project page:
1. Create directory under `public/projects/[project-name]/`
2. Add main project page as `[project-name].html`
3. Include terms and policy pages if needed (see `when-terms.html` and `when-policy.html` as templates)
4. Add project icon to `public/img/`
5. Update `public/projects/projects.html` with new project listing
6. Add Archive link to the new page's sidebar navigation
7. Use the standard header/sidebar/content layout structure
8. Link to the project from homepage articles as updates occur

## App Store Links

The When.. app is available at: https://apps.apple.com/gb/app/when/id6702031839
