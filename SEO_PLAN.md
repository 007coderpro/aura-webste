# Aura VPN SEO Plan

Source data: `vpn_broad-match_us_0-30kd_all.csv` — 6,605 US keywords, KD 0–30, total monthly volume ≈ **1.36M**.

## 1. Reality & Strategy

VPN is one of the most competitive commercial niches on Google. Head terms ("best vpn", "vpn") are owned by $100M-budget incumbents (Express, Nord, Surfshark, Proton) with thousands of backlinks and decades of domain authority. A new brand cannot rank those. **But** the dataset shows ~1,560 keywords at KD ≤ 15 representing ~230k monthly volume — this is where AuraVPN plays.

**Core strategy: win the long tail across four pillars, then ladder up.**

### Keyword opportunity by tier (from the CSV)

| KD tier | Keywords | Top volume |
|---|---|---|
| 0–5 | 158 | 1,900 |
| 6–10 | 408 | 3,600 |
| 11–15 | 994 | 2,400 |
| 16–20 | 1,431 | 4,400 |
| 21–25 | 1,734 | 18,100 |
| 26–30 | 1,880 | 4,400 |

Focus the first 6 months on **KD 0–15**. Re-attack KD 16–25 in month 7+ once Domain Rating climbs.

### Brand-safety exclusions (NEVER target)

The dataset contains many piracy-adjacent terms ("tamilyogi vpn", "itop vpn crack", "mod apk", "xnxubd", "nord vpn mod apk"). **Do not write content for these.** They violate Google E-E-A-T for legitimate VPN brands, attract the wrong audience (won't convert), and invite app-store takedown risk. Skip any keyword containing: `crack`, `mod apk`, `modded`, `ipa`, `xnxubd`, `tamilyogi`, piracy-named sites.

## 2. Four Content Pillars

### Pillar A — Country & Region Guides (highest concentration of long-tail volume)

Top low-KD geo terms: turkey (2,900), brasil (3,600), egypt (2,400), ukraine (1,600), peru (1,600), saudi arabia (1,300), uae (1,600), korea (2,400), venezuela, iran.

Article template: **"Best VPN for [Country] in 2026 — Access, Laws & Setup"**
- Legal status of VPNs in-country
- What's blocked (streaming, social apps)
- Server location + speed notes
- Install steps for each platform
- FAQ schema with PAA questions

Target 15 country guides in months 1–2.

### Pillar B — Use-Case Guides (commercial intent + mid-funnel)

Strong low-KD: Roblox (2,900 "vpn for roblox", plus "vpn on roblox ip bans" 1,900), Discord (2,900), Steam (1,900), YouTube Premium (1,900), school VPN (1,900), gaming, streaming specific services.

Article template: **"VPN for [App/Service] — Does It Work & How to Set It Up"**
- Does the service detect VPNs?
- Which server to choose
- Step-by-step setup with Aura VPN
- Troubleshooting (blocked, slow, captcha)

Target 12 use-case guides in months 1–3.

### Pillar C — Competitor Comparison & "Is X Safe" Pages (commercial, high-converting)

Low-KD competitor terms: itop vpn, potato vpn, urban vpn, veee vpn, clash vpn, dragon vpn, caren vpn, x vpn, proton (harder but doable for comparisons).

Article templates:
- **"Is [Competitor] Safe? Full Review & Better Alternatives"** (captures "is x vpn safe" 1,600/mo and similar)
- **"[Competitor] vs Aura VPN — Honest Comparison"**
- **"Best [Competitor] Alternatives in 2026"**

Target 10 comparison posts in months 2–4.

### Pillar D — Privacy Education & Troubleshooting (informational, top-of-funnel, backlink magnet)

Low-KD educational: "why is torrenting without a vpn unsafe" (1,900, KD 15), "vpn not working" variants, "how to use a VPN", privacy explainers, router/DNS guides.

Article template: long-form, 1,500–2,500 words, diagrams via Napkin AI, FAQ schema, canonical source citations.

Target 8 educational cornerstones in months 1–3.

## 3. Technical SEO Foundation (Week 1)

Current state of the repo:
- Next.js 16 App Router, single `/` page
- Metadata is only title + description in `src/app/layout.tsx`
- No `robots.txt`, no `sitemap.xml`, no `llms.txt`, no JSON-LD, no OG image, no per-route metadata
- Suspicious `src/app/pages/` folder (likely legacy — needs audit)
- 6 unused PNG screenshots (1–6.png) at repo root → move or delete

### Week-1 implementation checklist

1. **Per-route metadata** — `export const metadata` (or `generateMetadata`) on every page with canonical, openGraph, twitter, robots fields.
2. **`app/robots.ts`** — generated robots with sitemap reference.
3. **`app/sitemap.ts`** — dynamic sitemap pulling all static routes + blog MDX slugs.
4. **`public/llms.txt`** — signal AI crawlers (GEO win).
5. **JSON-LD** — Organization + WebSite + SoftwareApplication schema on home, Article + FAQPage on each blog post, BreadcrumbList on inner pages.
6. **OG image** — `app/opengraph-image.tsx` dynamic OG generator + static fallback.
7. **`public/favicon.ico` + icons** — full set (192, 512, apple-touch).
8. **Core Web Vitals** — audit with PageSpeed Insights, fix image priorities, eliminate CLS.
9. **Internal linking** — add breadcrumbs + contextual links between pillars.
10. **`next-sitemap` or native `sitemap.ts`** — pick native (Next 16 supports it cleanly).

## 4. Blog Infrastructure (Week 2)

- Add `/blog` route with MDX support (`@next/mdx` or `contentlayer`/`velite`).
- Frontmatter schema: `title`, `description`, `slug`, `publishedAt`, `updatedAt`, `author`, `keywords`, `ogImage`, `faqs` (array for FAQPage schema).
- Auto-generate blog sitemap entries from MDX.
- RSS feed at `/rss.xml` (helps discovery + backlinks).
- Table-of-contents, reading-time, related-posts components.
- Typography tuned for long-form reading (16px body, 1.7 line-height, max-width 72ch).

## 5. Content Production Workflow

**Free tooling stack:** Google Search Console, GA4, Ahrefs Webmaster Tools (free, no card), Bing Webmaster, AlsoAsked (3/day), AnswerThePublic, Google Trends, Claude/ChatGPT free, Perplexity, Frase GEO Score Checker, AIOSEO Analyzer, Screaming Frog (500 URLs), PageSpeed Insights, Napkin AI for infographics.

**Per-article workflow (target 45 min per first draft):**
1. Pull PAA tree for target keyword from AlsoAsked → use as H2/H3 skeleton.
2. Draft outline in Claude with top-5 SERP pages as input.
3. Write 1,500–2,500 words with original examples + Aura-specific setup steps.
4. Create 1 diagram/infographic in Napkin AI.
5. Add FAQ schema (3–6 PAA questions).
6. Run AIOSEO Analyzer + Frase GEO Score Checker before publishing.
7. Internal-link to 2 related posts + relevant product page.

**Cadence:** 2 posts/week for months 1–3 (= 24 posts), 3/week months 4–6 (= 36 more) → 60 posts by month 6.

## 6. Off-Page (Months 2+)

- Claim brand profiles: G2, Trustpilot, Product Hunt, AlternativeTo, VPNRanks directories.
- HARO / Qwoted / Featured.com — respond to privacy/security journalist queries (3–5/week).
- Guest posts on mid-tier tech blogs (DR 40–60) — pitch 2/week.
- Reddit presence in r/VPN, r/privacy, r/selfhosted — genuine participation, no spam. Reddit content ranks on Google now.
- YouTube: one "VPN for [X]" tutorial per blog post → embed in article, earn video SERP feature.

## 7. Tracking & KPIs

**Month 1 targets:** site indexed, 10 posts published, GSC impressions > 0, Core Web Vitals green.

**Month 3 targets:** 24 posts, 5k impressions/mo, 200 clicks/mo, 20+ keywords ranking in top 50.

**Month 6 targets:** 60 posts, 50k impressions/mo, 2k clicks/mo, 5+ keywords ranking top 10, 3+ referring domains/mo from organic coverage.

**Month 12 targets:** 120 posts, 200k impressions/mo, 15k clicks/mo, DR 25+, first Featured Snippet wins.

Dashboards: GSC + GA4 + free Looker Studio template.

## 8. Implementation Order (what I build next)

- [ ] **Step 1** — Per-route metadata on current pages + canonical + OG defaults.
- [ ] **Step 2** — `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt`.
- [ ] **Step 3** — JSON-LD: Organization, WebSite, SoftwareApplication schema on home.
- [ ] **Step 4** — Dynamic OG image generator (`app/opengraph-image.tsx`).
- [ ] **Step 5** — Blog scaffolding: `/blog` route + MDX pipeline + `/blog/[slug]` template.
- [ ] **Step 6** — Article + FAQPage + BreadcrumbList schema on blog posts.
- [ ] **Step 7** — Prioritized keyword sheet (CSV → `content/keywords-shortlist.json`) with the 50 best KD 0–15 targets clustered by pillar.
- [ ] **Step 8** — First 3 cornerstone posts (1 per Pillar A/B/D) as templates.
- [ ] **Step 9** — Core Web Vitals audit + fixes.
- [ ] **Step 10** — GSC/GA4/Bing verification files + analytics wiring.
