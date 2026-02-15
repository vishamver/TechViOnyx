# TechViOnyx Website

## Overview
TechViOnyx is a multi-page marketing website with a shared design system and common navigation. The site includes marketing pages, service detail pages, pricing pages, and legal pages. Pricing pages use page-specific CSS and JS files. The global header is a shared module, and the footer is injected from an inline template.

## Tech Stack
- HTML (static pages)
- CSS (`css/style.css`, `price/css/*.css`, `module/header.css`, `module/footer.css`)
- JavaScript (`js/main.js`, page scripts, `module/header.js`, `module/footer.js`)

### SEO / Metadata
- Sitemap: `sitemap.xml`
- Robots: `robots.txt`
- Humans: `humans.txt`
- Security: `security.txt`, `.well-known/security.txt`

## Project Structure (Full)
```
.
|-- .vscode/
|   `-- settings.json
|-- README.md
|-- index.html
|-- humans.txt
|-- robots.txt
|-- security.txt
|-- sitemap.xml
|-- .well-known/
|   `-- security.txt
|-- assets/
|   |-- Logo.jpg
|   |-- TechViOnyx Logo.svg
|   |-- logo-techvionyx.webp
|   |-- TechViOnyx.png
|   |-- new-logo-clovia.png
|   |-- favicon_io/
|   |   |-- android-chrome-192x192.png
|   |   |-- android-chrome-512x512.png
|   |   |-- apple-touch-icon.png
|   |   |-- favicon-16x16.png
|   |   |-- favicon-32x32.png
|   |   |-- favicon.ico
|   |   `-- site.webmanifest
|   `-- images/
|       |-- About Page Banner.webp
|       |-- Agency Automation.webp
|       |-- AI & ML Business Automation.webp
|       |-- AI Automation.webp
|       |-- Automation + Ads Systems.webp
|       |-- Blog Page Banner.webp
|       |-- Case Studies Page Banner.webp
|       |-- Contact Page Banner.webp
|       |-- Content Creation.webp
|       |-- Content Marketing.webp
|       |-- D2C Marketing.webp
|       |-- E-commerce Success Story.webp
|       |-- Google Ads Management.webp
|       |-- Google Ads ROI.webp
|       |-- Graphic Design.webp
|       |-- Home Page Banner.webp
|       |-- Home Page Banner-480.webp
|       |-- Home Page Banner-768.webp
|       |-- Home Page Banner-1200.webp
|       |-- Local Business SEO.webp
|       |-- Meta Ads Guide.webp
|       |-- Meta Ads Management.webp
|       |-- Mobile App Development.webp
|       |-- Privacy Policy.webp
|       |-- SaaS Lead Generation.webp
|       |-- SEO Services.webp
|       |-- SEO Strategies.webp
|       |-- Services Page Banner.webp
|       |-- Social Media Management.webp
|       |-- Software Development.webp
|       |-- Techvionyx Team.webp
|       |-- Terms of Service.webp
|       |-- Video Editing.webp
|       `-- Website Development.webp
|-- css/
|   `-- style.css
|-- js/
|   |-- about.js
|   |-- ai-automation.js
|   |-- automation-with-ads.js
|   |-- blog.js
|   |-- case-studies.js
|   |-- contact.js
|   |-- content-creation.js
|   |-- google-ads.js
|   |-- graphic-design.js
|   |-- index.js
|   |-- main.js
|   |-- meta-ads.js
|   |-- mobile-app-development.js
|   |-- privacy-policy.js
|   |-- seo.js
|   |-- services.js
|   |-- social-media-management.js
|   |-- software-development.js
|   |-- terms-of-service.js
|   |-- video-editing.js
|   `-- website-development.js
|-- module/
|   |-- comman-header/
|   |   `-- index.html
|   |-- header.css
|   |-- header.js
|   |-- footer.css
|   `-- footer.js
|-- about/
|   `-- index.html
|-- blog/
|   `-- index.html
|-- case-studies/
|   `-- index.html
|-- contact/
|   `-- index.html
|-- privacy-policy/
|   `-- index.html
|-- terms-of-service/
|   `-- index.html
|-- services/
|   |-- index.html
|   |-- ai-automation/
|   |   `-- index.html
|   |-- automation-with-ads/
|   |   `-- index.html
|   |-- content-creation/
|   |   `-- index.html
|   |-- google-ads/
|   |   `-- index.html
|   |-- graphic-design/
|   |   `-- index.html
|   |-- meta-ads/
|   |   `-- index.html
|   |-- mobile-app-development/
|   |   `-- index.html
|   |-- seo/
|   |   `-- index.html
|   |-- social-media-management/
|   |   `-- index.html
|   |-- software-development/
|   |   `-- index.html
|   |-- video-editing/
|   |   `-- index.html
|   `-- website-development/
|       `-- index.html
|-- price/
|   |-- ai-automation/
|   |   `-- index.html
|   |-- automation-with-ads/
|   |   `-- index.html
|   |-- content-creation/
|   |   `-- index.html
|   |-- google-ads/
|   |   `-- index.html
|   |-- graphic-design/
|   |   `-- index.html
|   |-- meta-ads/
|   |   `-- index.html
|   |-- mobile-app-development/
|   |   `-- index.html
|   |-- seo/
|   |   `-- index.html
|   |-- social-media-management/
|   |   `-- index.html
|   |-- software-development/
|   |   `-- index.html
|   |-- video-editing/
|   |   `-- index.html
|   `-- website-development/
|       `-- index.html
|-- price/css/
|   |-- ai-automation.css
|   |-- automation-with-ads.css
|   |-- content-creation.css
|   |-- google-ads.css
|   |-- graphic-design.css
|   |-- meta-ads.css
|   |-- mobile-app-development.css
|   |-- seo.css
|   |-- social-media-management.css
|   |-- software-development.css
|   |-- video-editing.css
|   `-- website-development.css
|-- price/js/
|   |-- ai-automation.js
|   |-- automation-with-ads.js
|   |-- content-creation.js
|   |-- google-ads.js
|   |-- graphic-design.js
|   |-- meta-ads.js
|   |-- mobile-app-development.js
|   |-- price-currency.js
|   |-- seo.js
|   |-- social-media-management.js
|   |-- software-development.js
|   |-- video-editing.js
|   `-- website-development.js
```

## Key Pages
Main pages:
- `/` - Home
- `/about/` - About
- `/services/` - Services overview
- `/case-studies/` - Case studies
- `/blog/` - Blog index
- `/contact/` - Contact form
- `/privacy-policy/` - Privacy policy
- `/terms-of-service/` - Terms of service

Service detail pages (`/services/`):
- `/services/ai-automation/`
- `/services/automation-with-ads/`
- `/services/content-creation/`
- `/services/google-ads/`
- `/services/graphic-design/`
- `/services/meta-ads/`
- `/services/mobile-app-development/`
- `/services/seo/`
- `/services/social-media-management/`
- `/services/software-development/`
- `/services/video-editing/`
- `/services/website-development/`

Pricing pages (`/price/`):
- `/price/ai-automation/`
- `/price/automation-with-ads/`
- `/price/content-creation/`
- `/price/google-ads/`
- `/price/graphic-design/`
- `/price/meta-ads/`
- `/price/mobile-app-development/`
- `/price/seo/`
- `/price/social-media-management/`
- `/price/software-development/`
- `/price/video-editing/`
- `/price/website-development/`

## Styling
- Global styles live in `css/style.css`.
- Header styles are in `module/header.css`.
- Footer styles are in `module/footer.css`.
- Pricing pages use page-specific styles in `price/css/<plan>.css`.
- Theme uses CSS variables under `:root` for colors, typography, spacing, and shadows.
- Responsive behavior is handled via media queries.

## JavaScript Behavior
Global interactions are handled in `js/main.js`:
- Smooth scrolling for anchor links
- Scroll reveal animations
- Form validation (contact form)
- Button ripple effects
- WhatsApp quick link integration
- Lazy loading for images with `data-src`
- Back-to-top button
- Custom cursor (>= 1024px)
- Auto-updating copyright year
- PJAX navigation (no full refresh)

Header behavior is handled in `module/header.js`:
- Loads shared header markup from `module/comman-header/index.html`
- Navigation menu toggle and active link

Footer behavior is handled in `module/footer.js`:
- Injects the shared footer markup (inline template)
- Updates footer year

Page-specific scripts:
- Root pages load `js/<page>.js`
- Service detail pages load `../js/<service>.js`
- Pricing pages load `price/js/<plan>.js`
- Pricing pages also load `price/js/price-currency.js` for auto currency conversion and a switcher.
- Pricing pages also load `../js/index.js` for the WhatsApp assistant.

## Assets
- Images, logos, and icons are stored under `assets/`.
- Most images are `.webp`, with a few `.jpg`.

## Notes
- Common layout elements (header, footer, nav dropdowns) are loaded from `module/`.
- Clean, folder-based URLs are used throughout (trailing slash).
- `_redirects` is no longer required after the restructure.

## Local Use
Open `index.html` in a browser to view the site. No build step is required.

