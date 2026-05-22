-- Seed the map background image key so the contact page map section
-- shows the address image (Google Maps screenshot) by default.
-- The path is relative to the Vite asset import; the fallback in
-- useSiteImage will serve the bundled address image.png automatically
-- when no DB row is present, so this migration just documents intent.

-- No DB row needed: useSiteImage falls back to the local asset when
-- the key is missing from site_content. The address image.png is the
-- correct default and will show automatically.
SELECT 1; -- no-op placeholder
