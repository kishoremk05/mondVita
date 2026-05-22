-- Update service links to their dedicated pages
UPDATE public.services
SET link_path = '/esthetische-tandheelkunde'
WHERE icon = 'Sparkles' OR translations->'nl'->>'title' = 'Esthetische Tandheelkunde';

UPDATE public.services
SET link_path = '/general-dental-care'
WHERE icon = 'Stethoscope' OR translations->'nl'->>'title' = 'Algemene Tandheelkunde';

UPDATE public.services
SET link_path = '/implantologie'
WHERE icon = 'Shield' OR translations->'nl'->>'title' = 'Implantologie';

UPDATE public.services
SET link_path = '/kindertandheelkunde'
WHERE icon = 'Heart' OR translations->'nl'->>'title' = 'Kindertandheelkunde';

UPDATE public.services
SET link_path = '/spoed'
WHERE icon = 'Zap' OR translations->'nl'->>'title' = 'Spoedhulp';
