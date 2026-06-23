# SEO & Meta Configuration

This document covers all SEO settings and how to customize them for your telecom website.

## 🎯 SEO Overview

The project includes comprehensive SEO setup with:
- Meta tags & Open Graph configuration
- Favicon & PWA icons
- Robots.txt & sitemap configuration
- Structured data support
- Mobile optimization

## 🔧 Configuration Files

### 1. Layout Metadata (`app/layout.tsx`)

**Global SEO settings applied to all pages:**

```tsx
export const metadata: Metadata = {
  title: 'Telecom Website | Premium 5G Mobile Services & Plans',
  description: '...',
  keywords: ['telecom', '5G', 'mobile services', ...],
  openGraph: { ... },
  twitter: { ... },
  robots: { ... },
}
```

**Update these fields:**
- `title` - Page title (50-60 characters)
- `description` - Meta description (150-160 characters)
- `keywords` - Target keywords (comma-separated)
- `openGraph.url` - Replace `yourdomain.com` with your domain
- `twitter.site` - Your Twitter handle

### 2. Page-Level Metadata (`app/page.tsx`)

**Home page specific settings:**

```tsx
export const metadata: Metadata = {
  title: 'Home | Telecom Website - Premium 5G Mobile Services',
  description: 'Experience ultra-fast 5G connectivity...',
  openGraph: { ... },
}
```

**Customize for each page:**
- Use unique titles (include page name + brand)
- Write compelling descriptions
- Use relevant keywords per page

## 🖼️ Icons & Favicon

### Favicon Files
Located in `public/`:

| File | Purpose | Size |
|------|---------|------|
| `favicon.svg` | Primary favicon | Scalable |
| `favicon.ico` | Fallback favicon | 16x16, 32x32 |
| `icon-192.png` | Android home screen | 192x192 |
| `icon-512.png` | App icon | 512x512 |
| `apple-icon.png` | iOS home screen | 180x180 |

**To replace:**
1. Create new favicon using [favicon.io](https://favicon.io)
2. Export all formats
3. Replace files in `public/`
4. Update file references in `app/layout.tsx`

### Example Favicon Setup
```html
<!-- SVG (recommended) -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />

<!-- Fallback -->
<link rel="icon" href="/favicon.ico" sizes="any" />

<!-- Apple -->
<link rel="apple-touch-icon" href="/apple-icon.png" />
```

## 📱 PWA & Web App Manifest

### Manifest (`public/manifest.json`)

Enables:
- Install as app on mobile devices
- Offline support setup
- App launcher shortcuts
- Custom theme colors

**Update these fields:**
```json
{
  "name": "Telecom Website - Premium Mobile Services",
  "short_name": "TelecomHub",
  "description": "Leading telecom provider...",
  "theme_color": "#0066ff",
  "background_color": "#ffffff"
}
```

**Add shortcuts for quick actions:**
```json
"shortcuts": [
  {
    "name": "View Plans",
    "url": "/#plans",
    "icons": [{ "src": "/icon-192.png" }]
  }
]
```

## 🤖 Search Engine Configuration

### Robots.txt (`public/robots.txt`)

Controls search engine crawling:

```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://yourdomain.com/sitemap.xml
```

**Customize:**
1. Replace `yourdomain.com` with your domain
2. Add any private paths to `Disallow`
3. Update crawl-delay if needed

### Sitemap

Generate a sitemap at [XML Sitemap Generator](https://www.xml-sitemaps.com/):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-06-24</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

Place in `public/sitemap.xml`

## 🔍 Meta Tags Breakdown

### Title Tag
- **Length:** 50-60 characters
- **Format:** `Primary Keyword | Brand Name`
- **Example:** `5G Mobile Plans | Telecom Website`

### Meta Description
- **Length:** 150-160 characters
- **Include:** Keywords, CTA, unique value
- **Example:** `Unlimited 5G plans from $49/month. Fast speeds, reliable coverage, 24/7 support.`

### Open Graph (Social Media)

Used by Facebook, LinkedIn, WhatsApp:

```tsx
openGraph: {
  title: '...',
  description: '...',
  images: [
    {
      url: 'https://yourdomain.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Description'
    }
  ]
}
```

**Image specs:**
- Ratio: 1.2:1 (1200x630px recommended)
- Format: JPG, PNG, GIF
- Size: < 5MB

### Twitter Card

Used on Twitter/X:

```tsx
twitter: {
  card: 'summary_large_image',
  site: '@youraccount',
  title: '...',
  description: '...',
  images: ['https://yourdomain.com/twitter-image.jpg']
}
```

**Image specs:**
- Ratio: 2:1 (1200x600px recommended)
- Minimum: 506x506px

## 📊 Schema Structured Data

Add JSON-LD structured data for rich snippets:

```tsx
// Add to layout or page components
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Telecom Website",
      "url": "https://yourdomain.com",
      "logo": "https://yourdomain.com/logo.png",
      "sameAs": [
        "https://facebook.com/yourpage",
        "https://twitter.com/yourhandle"
      ]
    })
  }}
/>
```

**Useful schemas:**
- Organization
- LocalBusiness
- Product
- MobileApplication
- BreadcrumbList

## 🔗 Verification & Tools

### Google Search Console
1. Add property: [search.google.com/search-console](https://search.google.com/search-console)
2. Verify ownership
3. Submit sitemap
4. Monitor crawl stats

**Add verification code to layout:**
```html
<meta name="google-site-verification" content="YOUR_CODE" />
```

### Bing Webmaster Tools
1. Verify at [www.bing.com/webmaster](https://www.bing.com/webmaster)
2. Submit sitemap
3. Monitor search performance

### SEO Testing Tools
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Meta Tags Inspector](https://www.seobility.net/en/seocheck/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Schema Validator](https://validator.schema.org/)

## 🎯 SEO Checklist

### On-Page
- [ ] Unique title tags (50-60 chars)
- [ ] Compelling meta descriptions (150-160 chars)
- [ ] Header hierarchy (H1, H2, H3)
- [ ] Internal linking strategy
- [ ] Image alt text
- [ ] Mobile responsive design

### Technical
- [ ] Favicon configured
- [ ] Manifest.json set up
- [ ] Robots.txt created
- [ ] Sitemap.xml submitted
- [ ] HTTPS enabled
- [ ] Fast loading (< 3 seconds)

### Social & Links
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] JSON-LD schema
- [ ] Social media links
- [ ] Internal linking

### Analytics
- [ ] Google Analytics configured
- [ ] Search Console verified
- [ ] Tracking conversions
- [ ] Monitor rankings

## 📚 Additional Resources

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Next.js SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org Documentation](https://schema.org/)
- [Yoast SEO Guide](https://yoast.com/seo/)

## 🔄 Maintenance

### Regular Tasks
- Monitor Search Console for errors
- Update keywords based on analytics
- Refresh old content
- Fix broken links
- Update meta descriptions

### Monthly Review
- Check Core Web Vitals
- Review search performance
- Analyze competitor keywords
- Update high-performing pages
