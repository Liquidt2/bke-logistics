# /public — Static Assets

Place your static files in this directory. They will be served at the root URL.

## Required Files

- **logo.png** — BKE Logistics LLC logo (recommended: 200x200px or larger, PNG with transparency)
  - Used in the Header and Footer components
  - If absent, Header falls back to styled text "BKE LOGISTICS LLC."

## Recommended Files

- **favicon.svg** — SVG favicon (can use brand colors #0D2B5C / #1769D4)
- **og-default.jpg** — Default Open Graph image for social sharing (1200x630px)
- **apple-touch-icon.png** — iOS home screen icon (180x180px)

## Usage

Files in /public are copied as-is to the build output. Reference them with root-relative paths:

```astro
<img src="/logo.png" alt="BKE Logistics" />
```
