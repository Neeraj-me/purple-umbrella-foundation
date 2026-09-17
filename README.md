# Purple Umbrella Foundation — Website

A static website for **Purple Umbrella Foundation** (purpleumbrella.foundation), built directly from the Foundation's Website Master Build Brief: the Foundation as the primary entity — with the Purple Umbrella Festival and Climate Promise as its two platforms — organised around four pillars: **Learn · Create · Innovate · Act**.

## What's included

```
purple-umbrella-foundation/
├── index.html              Home
├── about.html               About Us — vision, mission, why "Purple Umbrella", approach
├── what-we-do.html          What We Do — the four pillars in detail
├── festival.html             Purple Umbrella Festival — tracks + 2026 theme
├── climate-promise.html      Climate Promise — Scan→Choose→Pledge→Act→Measure
├── impact.html                Our Impact — Reach vs Change, moments, SDG alignment
├── get-involved.html         Get Involved — participation pathways + sign-up form
├── journey.html               Our Journey — verified milestones timeline
├── schools.html                For Schools
├── partners.html               For Partners
├── young-people.html           For Young People
├── stories.html                 Stories & Resources — now a live "Our Work" feed, edited via /admin
├── contact.html                  Contact details + contact form
├── privacy.html                   Privacy Policy — legal template, see below
├── terms.html                      Terms of Use — legal template, see below
├── css/style.css                   Full design system (colors, type, components)
├── js/main.js                       Mobile nav, active-link highlighting, accordion, demo form handling
├── js/content-loader.js             Renders Team + Work sections from content/*.json (no build step)
├── content/team.json                 Team member list — edited via /admin, shown on About Us
├── content/work.json                 Work-update list — edited via /admin, shown on Stories & Resources
├── admin/index.html, admin/config.yml  The admin panel (Sveltia CMS) — see "Updating content" below
├── assets/logo.png                    Official Purple Umbrella logo (used in header, footer, hero art)
├── assets/favicon.ico, favicon-32.png, favicon-180.png   Favicon set generated from the official logo
├── assets/og-image.png                Social-share preview image (1200×630), built from the official logo
├── assets/uploads/                     Photos uploaded through the admin panel land here
├── robots.txt                          Crawler rules + sitemap reference
├── sitemap.xml                          All 15 pages for search engines
└── README.md                            This file
```

No build step, no framework, no dependencies — plain HTML/CSS/JS. Open `index.html` in a browser to preview it, or serve the folder with any static file server (see **Local preview** below).

## Updating content (Team members and Our Work)

The site has a small admin panel at **`/admin`** (for example `purpleumbrella.foundation/admin`) built with [Sveltia CMS](https://sveltiacms.app), a free open-source tool. Log in with **"Sign In with Token"** using a GitHub personal access token (no password is stored anywhere — GitHub itself issues the token). From there you can:

- **Team** — add, edit, reorder, or remove team members (name, role, short bio, photo). Shown on the About Us page.
- **Our Work** — add, edit, or remove work updates (title, date, category, image, short excerpt). Shown on the Stories & Resources page, newest first.

Saving a change in the admin panel commits it straight to the GitHub repository backing the site, which triggers Netlify to automatically rebuild and publish the update — usually live within a minute or two. This only works once the site's Netlify project is connected to a GitHub repository named `Neeraj-me/purple-umbrella-foundation` (see `admin/config.yml`); if that repo is ever renamed or recreated under a different name, update the `repo:` line in `admin/config.yml` to match.

Both `content/team.json` and `content/work.json` start empty (`{"members": []}` and `{"items": []}`) — the corresponding section on the live site shows a friendly "nothing here yet" message until entries are added through `/admin`.

## Design system

- **Colour palette**: purple, light purple, white and grey only, as specified in the brief — no other hues. All tokens live at the top of `css/style.css` (`--purple-900` through `--purple-50`, plus the `--ink-*`/`--paper-*` greys). Change a token once and it updates everywhere.
- **Typography**: Poppins throughout (headings and body), loaded from Google Fonts.
- **Logo**: the official Purple Umbrella logo (`assets/logo.png`) is used in the header, footer, favicon and social-share image, and as the hero illustration on the Home and About pages. It has a transparent background, so it drops cleanly onto both light sections and the dark purple sections.
- **Iconography**: everywhere else — the four pillars, Festival track cards, and other decorative illustrations — uses original inline SVGs rather than the logo. No stock photography or generic nature clichés (polar bears, glaciers, wind turbines) — the brief asks for real photography once available, or original illustration in the meantime, which is what's used now.
- **Components**: cards, icon badges, a 5-step process "stepper," a vertical "journey" timeline, Reach-vs-Change impact panels, pathway cards, SDG chips, and a sticky sub-navigation for longer pages — all defined in `css/style.css` and reused across pages rather than one-off styling.

## Content-honesty guardrails (please read before publishing)

The brief was explicit that nothing should be fabricated — no invented statistics, partnerships, government affiliations, celebrity involvement, UN endorsements, or awards. This build follows that rule throughout, which means a few things are intentionally left blank rather than guessed:

1. **Impact numbers** (`impact.html`) — the Reach and Change panels carry a visible `Figures: [INSERT VERIFIED NUMBER]` tag instead of any number. Replace it once you have a verified figure to publish.
2. **Climate Promise indicators** (`climate-promise.html`) — "People Participating," "Schools & Communities Engaged," etc. are shown as em-dashes with an explicit note that figures are intentionally left blank until the tracking platform is live, and that any future CO₂/impact estimates must say they're estimates and explain the methodology. Keep that disclaimer even after you add real numbers, unless the figures are fully verified counts rather than estimates.
3. **SDG alignment** (`impact.html`) — the goals (4, 11, 12, 13, 17) are shown with a disclaimer that this reflects alignment with their broader objectives, not a formal UN partnership or endorsement. Don't remove this note.
4. **Our Journey** (`journey.html`) — lists only verified milestones (Foundation established 2025, first Festival 2025, Festival expansion and Climate Promise launch 2026). Its own note says achievements aren't added until confirmed — keep adding entries the same way, one verified milestone at a time.
5. **2026 Festival theme** ("AI & Climate: Reimagining the Future Together") is explicitly labelled as this year's edition theme, not a permanent identity, on both `index.html` and `festival.html`, so future years' themes can swap in without implying the old one was wrong or permanent.
6. **Stories & Resources** (`stories.html`) — currently three clearly-labelled draft/placeholder cards ("Draft," "Post title goes here," "Add date"). Replace with real posts as they're written; don't leave the placeholder labels once real content is added.
7. **Legal pages** (`privacy.html`, `terms.html`) — full legal templates with bracketed placeholders (`[DATE]`, data-collection specifics, governing law, etc.) and an explicit "have this reviewed by a lawyer before publishing" note at the top of each. Both are set to `<meta name="robots" content="noindex">` so they aren't indexed while still templates — remove that tag once the content is finalised and reviewed.

Search the project for `[INSERT` and `[DATE` to find every remaining placeholder quickly.

## Real details already in place (no placeholders needed)

- Address: 149, National Media Center, Sector 24, Gurgaon – 122002, Haryana, India
- Foundation site: purpleumbrella.foundation · Festival site: purplefest.in
- Email: neeraj@purplefest.in
- Verified timeline: Foundation established 2025 → first Festival 2025 → Festival expansion 2026 → Climate Promise launch 2026

Social links (Instagram/YouTube/LinkedIn) in the footer and on `contact.html` still point to `#` — add the real URLs once the accounts are ready.

## Forms

The sign-up form (`get-involved.html`) and the contact form (`contact.html`) validate and show a confirmation message in the browser, but are **not connected to a backend** — submissions currently go nowhere. To receive them for real:

- Use a form service like [Formspree](https://formspree.io) or [Netlify Forms](https://docs.netlify.com/forms/setup/) — point the `<form>` tag's `action` at their endpoint, or
- Wire it to your own backend/CRM.
- Once connected, remove the demo-confirmation logic in `js/main.js` (the `[data-demo-form]` handler).

There is no donation flow in this build — the brief's focus is participation and engagement, not fundraising, so no Donate page or payment integration is included.

## SEO & technical details

- Every page has a unique `<title>`, meta description, canonical link, Open Graph tags and a Twitter card, sharing the branded `assets/og-image.png` for link previews.
- `robots.txt` allows crawling and points to `sitemap.xml`; `sitemap.xml` lists all 15 public pages. `privacy.html` and `terms.html` are excluded from indexing via their own `noindex` meta tag rather than `robots.txt`, so the tag itself is always respected by crawlers.
- Semantic landmarks (`header`, `main`, `footer`), a skip-to-content link, and visible focus states are built in; decorative icons are `aria-hidden`.
- No raster photography is used yet (icons and illustrations are inline SVG), so the site loads fast by default. If you add real photography, compress it first (WebP/AVIF where possible) and give every image real `alt` text.
- Update the `lastmod` dates in `sitemap.xml` whenever a page's content meaningfully changes.

## Customizing the design

- Colours: `css/style.css`, top of the file (`--purple-900` … `--purple-50`, `--ink-*`, `--paper-*`).
- Font: Poppins is loaded via Google Fonts `<link>` tags in each page's `<head>` — change the `family=` parameter there and the `--font-head`/`--font-body` variables in `style.css` to switch typefaces.
- Icons: all inline SVG, no icon font/library — search for `<svg` near the section you want to change.

## Local preview

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploying

This is a static site, so it can be hosted almost anywhere:

- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder, or connect a Git repo. These also make it easy to add Netlify Forms for the sign-up/contact forms.
- **GitHub Pages** — push this folder to a repo and enable Pages.
- **Traditional web hosting** — upload the contents of this folder via FTP/SFTP to your host's public directory (e.g. `public_html`).

### Pointing purpleumbrella.foundation at your host

Once you've picked a host, you'll generally do one of two things in your domain's DNS settings:
- Point an **A record** at your host's IP address, or
- Point a **CNAME record** at the hostname your host gives you (e.g. `your-site.netlify.app`).

Your hosting provider's documentation will tell you exactly which records to add — search "[your host] custom domain DNS setup."
