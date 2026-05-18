## Goal

Rebuild the MondVita frontend to match the client's reference UI exactly: clean navy (#0c2340) + white, sans-serif typography, split hero with a clinic interior photo, and all 8 pages from the mockup grid. The existing i18n (NL/EN/AR + RTL), Supabase backend, and admin CMS stay intact.

## Visual system overhaul

Replace the current teal/gold/Cormorant serif look with:

- **Colors** (`src/styles.css`): `--primary` = deep navy `oklch(0.22 0.05 250)` (≈ #0c2340), background pure white, soft gray borders. Drop gold accents and `hero-gradient`.
- **Typography**: switch to a single modern sans (Inter or Plus Jakarta Sans) for both headings and body. Remove Cormorant Garamond. Headings: bold, tight tracking. Arabic still uses Cairo.
- **Logo**: replace the `Sparkle` mark with a tooth icon (`lucide-react` `Stethoscope`/custom tooth SVG) + "MONDVITA" wordmark in uppercase sans, navy.

## Navbar (matches mockup 01)

- White, full-width, subtle bottom border.
- Left: logo. Center: `Home, Behandelingen ▼, Protheses ▼, Spoed, Reviews, Over ons, Contact` (the two with ▼ are dropdowns).
- Right: `LangSwitcher` + filled navy `Afspraak maken` button with calendar icon.

## Home page (mockup 01)

1. **Split hero**: left column (text + 2 CTAs), right column shows clinic interior photo (full-bleed to the right edge, rounded on inner corner). Use a placeholder image stored in `src/assets/` (user can replace via admin).
2. **Feature strip**: 4 icon+title+blurb columns — Persoonlijk, Modern & zorgvuldig, Ervaren team, Tevreden patiënten.
3. **"Waarmee kunnen wij u helpen?"**: section title on the left, 4 photo service cards on the right (Algemene mondzorg, Implantologie, Protheses, Spoed). Each card = image on top, label below, hover lift.
4. Footer with contact summary + social.

## Additional routes (mockups 02–08)

Create real TanStack routes (not hash anchors) so each has its own SEO `head()`:

- `/behandelingen` — intro + 6 treatment cards (Algemene mondzorg, Implantologie, Protheses, Esthetische tandheelkunde, Wortelkanaalbehandeling, Kindertandheelkunde).
- `/protheses` — intro + 6 prothese types in a 2-col list + side CTA card + bottom feature bar.
- `/afspraak` — booking layout: left text/checklist + waiting-room image; right calendar + time slot grid + name/email form (form is non-functional placeholder, no backend).
- `/spoed` — emergency info + "Dental365 Speeddienst 0900-1515" callout card with phone CTA, hand-with-sign photo background.
- `/reviews` — "Ervaringen van onze patiënten" + 3 star-review cards + "Schrijf een review" button.
- `/over-ons` — "Over MondVita" intro + clinic photo.
- `/contact` — left address/phone/email/hours block + right contact form (placeholder, non-functional).

Mobile menu mirrors the desktop nav (mockup 09).

## i18n updates

Extend `src/i18n/locales.ts` with all new copy (page titles, treatment names, hero strings, feature blurbs, emergency text, review samples) in NL/EN/AR. NL is the source of truth from the mockups.

## Assets

Generate two placeholder photos via `imagegen` (fast tier), stored in `src/assets/`:
- `clinic-interior.jpg` — bright dental reception/clinic interior for hero & over-ons.
- `waiting-room.jpg` — for the booking page.

For the 4 service thumbnails on the home grid, generate 4 small images (smile, implant, prothese, spoed) or use existing stock-like prompts.

The admin CMS already supports uploading replacements via `clinic-media` bucket, so the client can swap them.

## Out of scope (this turn)

- Booking and contact forms are visual only (no submit handler / email).
- Dropdown menus on "Behandelingen" / "Protheses" link directly to their route (no mega-menu).
- No new database tables; existing `site_content`, `services`, `gallery_images`, `contact_info` cover editable content.

## Technical notes

- Files touched: `src/styles.css`, `src/i18n/locales.ts`, `src/components/site/Navbar.tsx`, `src/components/site/Hero.tsx`, `src/components/site/Services.tsx` (becomes "home services grid"), `src/components/site/Footer.tsx`. New components per page section.
- New route files: `src/routes/behandelingen.tsx`, `protheses.tsx`, `afspraak.tsx`, `spoed.tsx`, `reviews.tsx`, `over-ons.tsx`, `contact.tsx`. Each with its own `head()` for SEO.
- Remove old `About.tsx`/`Gallery.tsx`/`Contact.tsx` section components on the home page (content moves to dedicated routes); home only renders Hero + Features + ServicesGrid + Footer.
- Keep `useAuth`, `admin.tsx`, Supabase client, and migration schema as-is.

## Open question

Hero image: should I generate a placeholder clinic interior with `imagegen` now (matches the mockup's style), or wait for you to upload your own clinic photo? I'll proceed with a generated placeholder unless you say otherwise.
