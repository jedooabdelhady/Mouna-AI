# Mouna AI · website + prototypes

A static, multi-page build of the Mouna AI design (Alexandria University data science graduation project, 2026–27).

## Open it

Double-click `index.html`, or serve the folder:

```
python -m http.server 8797 --directory mouna-site
```

Then open http://localhost:8797. There are no build steps. Everything is plain HTML, CSS and JS.

## Pages

| File | What it is |
|---|---|
| `index.html` | Public landing page, English + Arabic (toggle in the header) |
| `app.html` | Household web app, full window and responsive (bottom tabs on phones, side nav on desktop): onboarding, home, pantry, store, orders, more (EN + AR) |
| `store.html` | Partner store dashboard (El Nour Market): stats, order queue, QR labels |
| `admin.html` | Admin panel: the 21 AI models, filter, search, detail drawer |
| `design-system.html` | Tokens, type, components and motion reference |

Deep links into the app: `app.html#home`, `#pantry`, `#shop`, `#orders`, `#more`. Add `?lang=ar` to any page for Arabic.

## Stack

- **Motion:** anime.js 4.4.1 (MIT), vendored in `vendor/`. Scroll reveals, word-split headlines, SVG line drawing, springs, count-ups.
- **Interaction patterns** follow kokonutui components (notification stack, cart button, smooth drawer, AI state loading, magnet button, background paths, dot field, swipe tabs), rebuilt in vanilla JS because kokonutui itself is React + Tailwind.
- **Fonts:** Bricolage Grotesque (display) + Figtree (interface) from Google Fonts; Thmanyah Sans (Arabic) self-hosted in `fonts/`.
- Respects `prefers-reduced-motion`: animations are skipped and content shows in its final state.

## Households

- Two kinds of home: **Just me** and **Shared home** (a family, friends or students under one roof).
- Every member has a sex (male / female) and an age group (child, teen, adult, older adult). The person signing up is always an adult or older adult.
- Others join with an invite code (`MNA-48C2` in the prototype) and pick themselves from the members already listed, or add themselves.

## Deploy

A static site with no build step: publish the folder root as it is.

- **Netlify:** Add new site → Import from GitHub → leave the build command empty, publish directory `.`. Or drag the folder onto app.netlify.com/drop.
- **Vercel:** Add New Project → import the repo → Framework preset *Other*, no build command, output directory `.`.
- **Cloudflare Pages:** no build command, build output directory `/`.
- **GitHub Pages:** Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`. On a free plan the repository must be public.

All links are relative, so the site also works from a sub-path (for example `username.github.io/repo/`). `start.bat` is only for running it locally on Windows.

## Changing the look

Colours, radii, shadows and fonts are tokens in `css/base.css` (`:root`). Change them there and every page follows. The logo mark and favicon are small inline SVGs (`favicon.svg` and the `brand-mark` SVG in each page).

## Notes

- Prototype data is local (no backend). The app keeps its state while the page is open; a reload resets it.
- Accuracy and training dates for live models are left as `[MAE after testing]` and `[training date]` placeholders until the models are evaluated.
