# ELIX BY IR — Parks of Ideas

A premium perfume e-commerce storefront built with **Next.js 16**, **React 19**, and **TypeScript**. The site showcases the ELIX fragrance collection with a blue-and-gold brand theme, animated hero sections, a full shop experience, and client-side cart and wishlist flows.

**Live dev URL:** [http://localhost:3000](http://localhost:3000)

---

## Features

| Area | Description |
|------|-------------|
| **Homepage** | Video hero with bottle animation, category grids, product tabs, dual image sliders, trust badges, ticker |
| **Shop** | 31 perfumes, grid/list/cinematic layouts, search, sort, quick view, add to cart & wishlist |
| **Product detail** | Gallery, tabs, related products, animated geometric background |
| **Blog** | Pinterest-style masonry grid, category filters, individual post pages |
| **Contact** | Info cards, contact form, FAQ, social links, blue/gold themed layout |
| **Cart** | localStorage-backed cart, quantity controls, order summary, free shipping threshold |
| **Wishlist** | Save fragrances, add to cart from wishlist |
| **Auth UI** | Login modal (Google + email form) — UI only, no backend yet |
| **Legal** | Privacy, Terms, Cookies modals from footer |

---

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Turbopack in dev)
- **UI:** React 19, Tailwind CSS 4, CSS Modules
- **Animation:** Framer Motion, Swiper
- **3D:** Three.js, React Three Fiber (product visuals)
- **Icons:** Lucide React, React Icons
- **Fonts:** Inter, Marcellus (Google Fonts)
- **Language:** TypeScript

---

## Getting started

### Prerequisites

- **Node.js** 20+
- **npm** (or yarn/pnpm)

### Install & run

```bash
# Clone the repository
git clone https://github.com/ayeshanaveed2526/parksofideas.git
cd parksofideas

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Homepage |
| `/shop` | Shop catalog |
| `/product/[id]` | Product detail |
| `/blog` | Blog listing (masonry grid) |
| `/blog/[slug]` | Blog post |
| `/contact` | Contact |
| `/cart` | Shopping cart |
| `/wishlist` | Saved items |

---

## Project structure

```
parksofideas/
├── public/
│   ├── perfumes/          # Product bottle images (31 PNGs)
│   ├── images/            # Hero, banners, legacy assets
│   └── *.mp4              # Homepage video assets
├── src/app/
│   ├── layout.tsx         # Root layout + global providers
│   ├── globals.css        # Design tokens + shared styles
│   ├── page.tsx           # Homepage
│   ├── shop/              # Shop route
│   ├── product/[id]/      # Product detail route
│   ├── blog/              # Blog routes
│   ├── contact/           # Contact route
│   ├── cart/              # Cart route
│   ├── wishlist/          # Wishlist route
│   ├── data/
│   │   ├── perfumeCatalog.ts   # 31 products (source of truth)
│   │   └── blogPosts.ts        # Blog content
│   ├── lib/
│   │   ├── cartStorage.ts      # localStorage: elix-cart
│   │   └── wishlistStorage.ts  # localStorage: elix-wishlist
│   └── components/
│       ├── auth/          # Login modal + profile avatar
│       ├── cart/          # Cart page + CartProvider
│       ├── wishlist/      # Wishlist page + WishlistProvider
│       ├── shop/          # Grid, toolbar, product cards, quick view
│       ├── blog/          # Masonry grid, blog layout
│       ├── contact/       # Contact page content
│       ├── product/       # PDP components
│       ├── legal/         # Legal modals
│       ├── Header.tsx     # TopBar + MainNavbar
│       ├── Footer.tsx
│       ├── VideoHero.tsx  # Homepage video + bottle animation
│       └── ...
├── AGENTS.md              # Next.js agent rules for AI tooling
└── package.json
```

---

## Brand & design system

Theme tokens live in `src/app/globals.css` under `:root`. Use these instead of hardcoded colors in new components.

| Token | Value | Usage |
|-------|-------|-------|
| `--poi-primary` | `#00089d` | Primary blue |
| `--poi-gold` | `#c8a14b` | Accent gold |
| `--poi-text` | `#0a0a0a` | Body text |
| `--poi-font-sans` | Inter | UI copy |
| `--poi-font-display` | Marcellus | Headings |
| `--poi-bg-page` | Blue-gray gradient | Page backgrounds |
| `--poi-btn-*` | Black/gray → blue hover | `.poi-btn` buttons |

Shared layout classes (cart, wishlist, contact, blog):

- `.poi-page`, `.poi-page-hero`, `.poi-page-main`
- `.poi-empty-state`, `.poi-cta-banner`, `.poi-trust-grid`

Global button class: **`.poi-btn`** — used site-wide for primary actions.

---

## State & data

| Feature | Storage key | Provider |
|---------|-------------|----------|
| Cart | `elix-cart` (localStorage) | `CartProvider` in `layout.tsx` |
| Wishlist | `elix-wishlist` (localStorage) | `WishlistProvider` in `layout.tsx` |
| Products | `src/app/data/perfumeCatalog.ts` | Static catalog (31 items) |
| Blog | `src/app/data/blogPosts.ts` | Static posts |

There is **no backend API** yet. Cart, wishlist, login, checkout, and contact form are client-side UI only.

---

## Key components

- **`VideoHero`** — Full-width video background with animated perfume bottle merge effect and mute toggle.
- **`ShopGrid` + `ShopProductCard`** — Filterable catalog with layout modes and hover image swap.
- **`PinterestMasonry`** — Dynamic aspect-ratio masonry for the blog page.
- **`LoginModal`** — Welcome-back card with Google sign-in UI and email/password form.
- **`MainNavbar`** — Sticky nav, mega menus, cart badge, login trigger, mobile drawer.

---

## Performance rules — do not break

These rules exist because an earlier version caused severe CPU/GPU lag. **Do not revert them.**

### Never animate these properties on large elements

| Property | Why it lags |
|----------|-------------|
| `filter: blur()` on animated elements | Forces GPU to re-rasterize every frame |
| `mix-blend-multiply` on animated elements | Breaks GPU layer isolation |
| `scale` on blurred elements | Busts GPU texture cache |
| `repeat: Infinity` on large/blurred elements | Pins a CPU/GPU core while idle |

### Safe animation properties

- `transform: translate(x, y)` — cheap, composited
- `opacity` on **small** elements only
- CSS `@keyframes` using only `transform` and `opacity`

### Background rules (`AnimatedBackground.tsx`)

- Background must stay **static or CSS-only**
- No Framer Motion on background orbs/blobs
- No `filter: blur()` on animated elements
- Limit `will-change: transform` to 2–3 elements max

### What caused the original lag

`AnimatedBackground.tsx` had full-screen orbs with `blur-[100px]` + `mix-blend-multiply` on infinite loops — re-rasterizing blur ~60fps even when idle. **Fix:** static CSS gradients, no blur/blend on animated layers.

---

## Environment variables

No `.env` file is required for local development. If you add API keys or auth later, create `.env.local` (already gitignored):

```env
# Example — not used yet
# NEXT_PUBLIC_API_URL=
```

---

## Deployment

Build and run as a standard Next.js app:

```bash
npm run build
npm run start
```

Compatible with [Vercel](https://vercel.com), Netlify, or any Node.js host. Large video files in `public/` may affect deploy size — consider CDN hosting for production.

---

## Contributing

1. Create a feature branch from `main`
2. Follow existing patterns: CSS Modules + `--poi-*` tokens, `.poi-btn` for buttons
3. Run `npm run lint` before opening a PR
4. Respect the performance rules above

---

## License

Private project. All rights reserved.
#   e l i x b y i r - f r o n t e n d  
 