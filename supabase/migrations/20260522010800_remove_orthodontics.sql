-- Remove Orthodontics service
DELETE FROM public.services 
WHERE translations->'en'->>'title' = 'Orthodontics' 
   OR translations->'nl'->>'title' = 'Orthodontie';
