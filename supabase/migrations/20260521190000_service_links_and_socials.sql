ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS image_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS link_path text NOT NULL DEFAULT '/behandelingen';

ALTER TABLE public.contact_info
  ADD COLUMN IF NOT EXISTS socials jsonb NOT NULL DEFAULT '{}'::jsonb;

UPDATE public.contact_info
SET hours = '{"morning":"09:00 - 12:00","lunch":"12:00 - 13:00","afternoon":"13:00 - 17:00"}'::jsonb,
    socials = COALESCE(socials, '{}'::jsonb)
WHERE id = 1;

UPDATE public.services
SET link_path = '/general-dental-care'
WHERE id IN (
  SELECT id
  FROM public.services
  WHERE icon = 'Stethoscope' OR sort_order = 2
  ORDER BY created_at
  LIMIT 1
);