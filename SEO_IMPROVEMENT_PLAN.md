# Lovebae SEO Improvement Plan
## Targeting: USA, UK, Australia & Global English Markets

---

## Current State: What's Already Done Well

- Canonical URLs on all pages
- OpenGraph & Twitter Card tags on every page
- JSON-LD structured data (BlogPosting, BreadcrumbList, FAQPage, ItemList, Organization, MobileApplication, WebSite)
- robots.txt with bot-specific rules
- sitemap.xml with priorities and lastModified dates
- Dynamic OG image generation per page
- Google Analytics integration
- Proper heading hierarchy (h1 > h2 > h3)
- Internal linking via topic hubs and related posts
- Site verification (Google, Yandex, Bing)

---

## Priority 1: Critical SEO Fixes

### 1.1 International Targeting (hreflang for USA/UK/AU)

**Problem:** `<html lang="en">` is generic. No hreflang tags. Google can't differentiate which English-speaking market you're targeting.

**Fix:**
- Add `alternates.languages` to root layout metadata for `en-US`, `en-GB`, `en-AU`, and `x-default`
- Since the site serves the same content to all regions, use self-referencing hreflang with `x-default`
- This tells Google the site is relevant to all English markets, not just one

```js
// In layout.js metadata
alternates: {
  languages: {
    'en-US': 'https://lovebae.app',
    'en-GB': 'https://lovebae.app',
    'en-AU': 'https://lovebae.app',
    'x-default': 'https://lovebae.app',
  },
},
```

### 1.2 Fix JSON-LD Script Strategy

**Problem:** JSON-LD scripts in `layout.js` use `strategy="afterInteractive"` which delays loading. Google's crawler may not execute JavaScript, so structured data could be missed.

**Fix:** Change JSON-LD `<Script>` tags to use `strategy="beforeInteractive"` or render as plain `<script>` tags in `<head>` so crawlers see them immediately.

### 1.3 Homepage SEO is Critically Weak

**Problem:**
- H1 is "Make your relationship 10x better" — not keyword-rich, generic
- No homepage-specific keywords in metadata
- `BlogSection` is imported but never rendered
- No FAQ schema on homepage
- Missing `description` override (relies on root layout default)

**Fix:**
- Add keyword-rich content section below hero (e.g., "The Best Couples App for Long Distance & Everyday Love")
- Render the `BlogSection` component (already imported)
- Add homepage FAQ schema for common queries ("What is Lovebae?", "Is Lovebae free?", "Does Lovebae work for long distance?")

### 1.4 Add `inLanguage` to All Structured Data

**Problem:** No `inLanguage` property in any JSON-LD schema. Google uses this to understand content language targeting.

**Fix:** Add `"inLanguage": "en"` to Organization, BlogPosting, WebSite, FAQPage, and all other schemas.

---

## Priority 2: Missing Structured Data

### 2.1 Support Page — Add FAQPage Schema

**Problem:** Support page has 4 FAQs rendered as `<details>` elements but no FAQPage JSON-LD.

**Fix:** Add FAQPage schema matching the games page pattern.

### 2.2 Creators Page — Add FAQPage Schema

**Problem:** Creators page has 6 FAQs but no FAQPage JSON-LD.

**Fix:** Same pattern as games page FAQs.

### 2.3 Success Stories — Add Review/Testimonial Schema

**Problem:** No structured data for user testimonials/success stories.

**Fix:** Add `Review` or `Testimonial` schema for seed stories.

### 2.4 Homepage — Add SoftwareApplication Schema

**Problem:** The MobileApplication schema exists in root layout, but homepage could benefit from a more detailed SoftwareApplication schema with feature highlights.

**Fix:** Already partially done via root layout, but add `HowTo` or `SoftwareApplication` with detailed features.

---

## Priority 3: Blog SEO Improvements

### 3.1 Fix BlogPosting Schema Issues

**Problems:**
- `dateModified` always equals `datePublished` — Google prefers accurate modified dates
- Author `@type` is `"Organization"` — should be `"Person"` when individual author names are used
- Missing `wordCount` property
- Missing `inLanguage` property

**Fix:**
- Add `lastUpdated` field to blog frontmatter for posts that have been updated
- Change author type to `"Person"` when a specific author name is given
- Calculate and add `wordCount` from content
- Add `inLanguage: "en"`

### 3.2 Add Table of Contents for Long Posts

**Problem:** Long blog posts (2000+ words) have no table of contents. This hurts UX and reduces chances of winning featured snippets.

**Fix:** Auto-generate TOC from h2/h3 headings with anchor links. Google often uses TOC links for sitelinks in search results.

### 3.3 Add Article Schema `speakable` Property

**Problem:** No `speakable` property in BlogPosting schema.

**Fix:** Add `speakable` with CSS selectors pointing to headline and description for Google Assistant / voice search optimization.

### 3.4 Make Tags Linkable

**Problem:** Blog tags are displayed as badges but don't link anywhere. Dead-end content.

**Fix:** Create tag archive pages at `/blog/tag/[tag]` or link tags to blog search (`/blog?q=tag`).

---

## Priority 4: Technical SEO

### 4.1 Add Web App Manifest

**Problem:** No `manifest.json` / web app manifest. Missing PWA signals.

**Fix:** Create `/public/manifest.json` with app name, icons, theme color, and add to metadata.

### 4.2 Add `dns-prefetch` and `preconnect`

**Problem:** No resource hints for external domains (Google Analytics, fonts).

**Fix:**
```html
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://www.googletagmanager.com" crossorigin />
```

### 4.3 Optimize Font Loading

**Problem:** No `next/font` usage detected. Custom fonts may cause layout shift (CLS).

**Fix:** Use `next/font/google` or `next/font/local` for font optimization with `display: swap`.

### 4.4 Add Breadcrumb UI (Not Just JSON-LD)

**Problem:** Breadcrumbs exist as JSON-LD only. Users and search engines benefit from visible breadcrumbs.

**Fix:** Add a lightweight `<Breadcrumb>` component rendered on blog posts, topic pages, and game pages.

### 4.5 Add `<time>` Elements for Dates

**Problem:** Blog post dates rendered as plain `<span>` text. No `<time datetime="">` elements.

**Fix:** Wrap dates in `<time datetime="YYYY-MM-DD">` for semantic HTML + SEO benefit.

---

## Priority 5: Content Strategy for Target Markets

### 5.1 Geo-Targeted Blog Content

**Problem:** No content specifically targeting UK, AU, or regional audiences.

**Recommended new blog posts:**
- "Best Date Night Ideas in London" / "Sydney Date Ideas for Couples"
- "Long Distance Relationship Tips: UK to US"
- "Valentine's Day Ideas 2026 UK" / "Valentine's Day Ideas Australia"
- "Couples Activities in Melbourne / Manchester / New York"
- "Best Relationship Apps in Australia 2026"
- "LDR Tips for International Couples (US, UK, AU)"

### 5.2 Regional Keyword Optimization

**Problem:** Keywords are US-centric. UK/AU users search differently.

**Examples:**
- US: "dating app" → UK: "dating app UK", AU: "best couple app Australia"
- US: "date night ideas" → UK: "date night ideas UK", AU: "date ideas Australia"
- US: "long distance relationship" → UK: "long distance relationship UK to US"

**Fix:** Add geo-modified keywords to metadata where relevant. Blog descriptions can include "UK, US, Australia" variants.

### 5.3 Add Location-Aware Content Sections

**Fix:** Add a "Works Worldwide" section on the homepage mentioning specific countries: "Trusted by couples in the United States, United Kingdom, Australia, Canada, and 50+ countries."

---

## Priority 6: Additional Optimizations

### 6.1 Add `og:locale:alternate` for International OG

**Fix:** Add alternate locales to OpenGraph:
```js
openGraph: {
  locale: 'en_US',
  alternateLocale: ['en_GB', 'en_AU'],
}
```

### 6.2 Improve Topic Hub Pages

**Problem:** Topic pages have thin, generic content and descriptions.

**Fix:**
- Write unique 150-200 word intro paragraphs per topic
- Add topic-specific FAQ sections
- Improve meta descriptions with keyword-rich, unique text per topic
- Add internal cross-links between related topics

### 6.3 Add `lastModified` to Blog Posts That Need It

**Problem:** Blog sitemap `lastModified` uses `date` (publish date) for all posts.

**Fix:** Add `lastUpdated` frontmatter field. Use it when available, fall back to `date`.

### 6.4 Add Structured Data Testing

**Fix:** Add a dev script that validates JSON-LD against schema.org using Google's Rich Results Test API or structured-data-testing-tool.

---

## Implementation Order (Recommended)

| Phase | Items | Impact | Effort |
|-------|-------|--------|--------|
| **Phase 1** | 1.1 hreflang, 1.2 JSON-LD fix, 1.3 Homepage, 1.4 inLanguage | High | Medium |
| **Phase 2** | 2.1-2.4 Missing structured data, 3.1 Blog schema fixes | High | Low |
| **Phase 3** | 4.1 Manifest, 4.2 Resource hints, 4.5 Time elements | Medium | Low |
| **Phase 4** | 3.2 TOC, 4.4 Breadcrumb UI, 6.1 OG locale | Medium | Medium |
| **Phase 5** | 5.1-5.3 Geo content, 6.2 Topic hubs, 3.4 Tag pages | High | High |

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/app/layout.js` | hreflang, JSON-LD strategy fix, inLanguage, manifest link, resource hints, og:locale:alternate |
| `src/app/page.js` | Render BlogSection, add FAQ schema, improve homepage SEO |
| `src/app/blog/[slug]/page.js` | Fix BlogPosting schema, add time elements, breadcrumb UI |
| `src/app/blog/page.js` | Add locale to OG |
| `src/app/topics/[slug]/page.js` | Improve descriptions, add FAQ sections |
| `src/app/support/page.js` | Add FAQPage JSON-LD |
| `src/app/creators/page.js` | Add FAQPage JSON-LD |
| `src/app/success-stories/page.js` | Add Review schema |
| `src/app/games/page.js` | Add inLanguage to schemas |
| `src/app/sitemap.js` | Support lastUpdated dates |
| `next.config.mjs` | Add preconnect headers |
| `public/manifest.json` | New file — web app manifest |
| `src/components/blog/Breadcrumb.js` | New component — visual breadcrumbs |
| Various blog `.mdx` files | Add lastUpdated frontmatter |
