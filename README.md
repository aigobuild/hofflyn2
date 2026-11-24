# hoffLyn Chat - Motion

A motion-themed AI chat app built with Next.js, assistant-ui, and immersive video backgrounds.

![hoffLyn screenshot](screenshot.png)

## Features

- Multiple chat layouts (Base, Claude, Gemini, hoffLyn, Perplexity)
- Immersive motion video backgrounds (city, desert, forest, Pexels abstracts, etc.)
- Arthur Best credit fixed at bottom-right
- Markdown, attachments, model picker, and more

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Background Sources

Free motion/abstract background videos:

- Pixabay — https://pixabay.com/videos/search/background/
- Pexels — https://www.pexels.com/search/videos/abstract/
- Mixkit — https://mixkit.co/free-stock-video/abstract/

Download clips as `.mp4`, drop them into `public/motion/`, and add the filename to `components/motion-shell.tsx`.

## Deploy to GitHub Pages (GitHub Actions)

This is the repeatable deployment flow we used.

### 1. Configure Next.js for static export

In `next.config.ts`, set the base path to match the repo name:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/<repo-name>",
  assetPrefix: "/<repo-name>/",
  images: { unoptimized: true },
};

export default nextConfig;
```

If you reference static assets manually (e.g. video/image `src` strings), include the same base path: `/<repo-name>/...`.

### 2. Add a lockfile

GitHub Actions `setup-node` with `cache: npm` and `npm ci` requires a lockfile.

```bash
npm install --package-lock-only
git add package-lock.json
```

### 3. Add the deploy workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 4. Push to GitHub

```bash
git init
git add -A
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/<owner>/<repo>.git
git push -u origin main
```

### 5. Enable GitHub Pages

In the repo: **Settings → Pages → Build and deployment → Source = GitHub Actions**.

### 6. Verify

- Actions: `https://github.com/<owner>/<repo>/actions`
- Live site: `https://<owner>.github.io/<repo>/`

If the site 404s, confirm Pages source is GitHub Actions and the workflow completed successfully. If assets/videos 404, check `basePath`/`assetPrefix` and any hardcoded `/path` URLs.

## Component Library Reference (Aura.build)

| Component | Link |
|-----------|------|
| Hero | https://www.aura.build/components?componentType=free&q=Hero |
| Store | https://www.aura.build/browse/components?q=store&page=1 |
| Code | https://www.aura.build/components?componentType=free&q=code |
| Section | https://www.aura.build/components?componentType=free&q=Section |
| Button | https://www.aura.build/components?componentType=free&q=Button |
| Card | https://www.aura.build/components?componentType=free&q=Card |
| Background | https://www.aura.build/components?componentType=free&q=Background |
| Header | https://www.aura.build/components?componentType=free&q=Header |
| Logo | https://www.aura.build/components?componentType=free&q=Logo |
| Feature | https://www.aura.build/components?componentType=free&q=Feature |
| Pricing | https://www.aura.build/components?componentType=free&q=Pricing |
| Testimonial | https://www.aura.build/components?componentType=free&q=Testimony |
| Footer | https://www.aura.build/components?componentType=free&q=Footer |
| Form | https://www.aura.build/components?componentType=free&q=Form |
| Heading | https://www.aura.build/components?componentType=free&q=Heading |
