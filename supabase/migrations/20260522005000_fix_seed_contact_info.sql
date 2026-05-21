-- Fix the seed data to Rotterdam instead of Amsterdam
UPDATE public.contact_info
SET address = 'Marinus Bolkplein 39, 3067 AK Rotterdam',
    phone = '010-3602998',
    hours = '{"morning":"09:00 - 12:00","lunch":"12:00 - 13:00","afternoon":"13:00 - 17:00"}'::jsonb
WHERE id = 1;
