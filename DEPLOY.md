# BKE Logistics — Deployment Guide

Complete step-by-step instructions for deploying BKE Logistics to your VPS with Nginx Proxy Manager.

---

## Prerequisites

- VPS with Docker and Docker Compose installed
- Nginx Proxy Manager already running on the VPS
- Domain `bkelogistics.com` pointed to your VPS IP (DNS A record)
- SSH access to your VPS

---

## Step 1 — Set Up Sanity CMS

1. Create a free account at [sanity.io](https://sanity.io)
2. Install the Sanity CLI globally:
   ```bash
   npm install -g @sanity/cli
   ```
3. Navigate to the `/studio` directory and initialize the project:
   ```bash
   cd studio
   npm create sanity@latest
   ```
   Or if a project exists in sanity.io, just run:
   ```bash
   npm install
   ```
4. Get your **Project ID** from [sanity.io/manage](https://sanity.io/manage)
5. Update `studio/sanity.config.ts`:
   ```ts
   projectId: 'your-actual-project-id',
   dataset: 'production',
   ```
6. Deploy the Studio (optional — hosts the CMS dashboard):
   ```bash
   cd studio
   npx sanity deploy
   ```

---

## Step 2 — Configure Environment Variables

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` with your actual values:
   ```env
   SANITY_PROJECT_ID=your_actual_project_id
   SANITY_DATASET=production
   PUBLIC_SITE_URL=https://bkelogistics.com
   ```

---

## Step 3 — Set Up Zoho Forms

1. Log in to [zoho.com/forms](https://www.zoho.com/forms/)
2. Create your "Freight Quote Request" form with fields:
   - Full Name
   - Email
   - Phone
   - Origin City/State
   - Destination City/State
   - Freight Type (Flatbed / Dry Van)
   - Cargo Description
   - Estimated Weight
   - Dimensions (optional)
   - Desired Pickup Date
   - Additional Notes
3. Go to **Share → Embed** and copy the iframe code
4. Open `src/pages/request-quote.astro`
5. Find the `<!-- ZOHO FORM EMBED -->` comment block and replace the placeholder `<div>` with your Zoho iframe embed code

---

## Step 4 — Add Your Logo

1. Place your logo file at `public/logo.png`
   - Recommended: 200x200px or larger, PNG with transparent background
   - The Header component will use this automatically
   - If no logo.png exists, the Header falls back to stylized text

---

## Step 5 — Build and Deploy with Docker

### On your local machine, copy the project to your VPS:
```bash
scp -r /path/to/bke-logistics user@your-vps-ip:~/bke-logistics
```

Or use git:
```bash
git push origin main
# Then on the VPS:
git clone https://github.com/yourorg/bke-logistics.git
cd bke-logistics
```

### On the VPS, build and start the container:
```bash
cd ~/bke-logistics

# Copy and configure .env
cp .env.example .env
nano .env  # fill in your values

# Build and start
docker-compose up -d --build
```

### Verify it's running:
```bash
docker-compose ps
docker logs bke-logistics-web
```

The site should now be accessible at `http://your-vps-ip:80`

---

## Step 6 — Configure Nginx Proxy Manager

1. Log in to Nginx Proxy Manager (typically at `http://your-vps-ip:81`)
2. Click **Proxy Hosts → Add Proxy Host**
3. Fill in:
   - **Domain Names**: `bkelogistics.com`, `www.bkelogistics.com`
   - **Scheme**: `http`
   - **Forward Hostname/IP**: `your-vps-ip` (or `127.0.0.1` if NPM is on the same machine)
   - **Forward Port**: `80`
   - Enable: **Block Common Exploits**, **Websockets Support**
4. Under the **SSL** tab:
   - SSL Certificate: **Request a new SSL Certificate**
   - Check **Force SSL** and **HTTP/2 Support**
   - Enter your email for Let's Encrypt
   - Check **I Agree to the Let's Encrypt Terms of Service**
   - Click **Save**

NPM will automatically obtain and renew SSL certificates via Let's Encrypt.

---

## Step 7 — Verify Deployment

1. Visit `https://bkelogistics.com` — you should see the site with a valid SSL certificate
2. Test all pages: Home, Services, Flatbed, Dry Van, Industries, About, Blog, Request Quote, Contact
3. Verify the quote form placeholder displays correctly
4. Check mobile responsiveness

---

## Maintenance

### Update the site:
```bash
cd ~/bke-logistics
git pull origin main
docker-compose up -d --build
```

### View logs:
```bash
docker logs bke-logistics-web -f
```

### Stop the container:
```bash
docker-compose down
```

### Rebuild without cache:
```bash
docker-compose build --no-cache
docker-compose up -d
```

---

## Optional: Connect Sanity to Astro (for live blog posts)

1. Install the Sanity client in the Astro project:
   ```bash
   npm install @sanity/client
   ```
2. Create `src/lib/sanity.ts`:
   ```ts
   import { createClient } from '@sanity/client';

   export const sanityClient = createClient({
     projectId: import.meta.env.SANITY_PROJECT_ID,
     dataset: import.meta.env.SANITY_DATASET || 'production',
     apiVersion: '2024-01-01',
     useCdn: true,
   });
   ```
3. Use in Astro pages (`.astro` frontmatter):
   ```ts
   import { sanityClient } from '../lib/sanity';
   const posts = await sanityClient.fetch(`*[_type == "blogPost"] | order(publishedAt desc)`);
   ```

---

## Support

For deployment questions or technical issues, contact the development team or refer to:
- [Astro Docs](https://docs.astro.build)
- [Sanity Docs](https://www.sanity.io/docs)
- [Nginx Proxy Manager Docs](https://nginxproxymanager.com/guide/)
