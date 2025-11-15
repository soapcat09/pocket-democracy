-- Update initiatives with empty categories to assign them categories based on UUID distribution
-- Using Romanian category names to match the database

UPDATE public.initiatives
SET category = CASE 
  WHEN (md5(id::text)::bit(32)::bigint % 8) = 0 THEN 'infrastructură'
  WHEN (md5(id::text)::bit(32)::bigint % 8) = 1 THEN 'mediu'
  WHEN (md5(id::text)::bit(32)::bigint % 8) = 2 THEN 'educație'
  WHEN (md5(id::text)::bit(32)::bigint % 8) = 3 THEN 'sănătate'
  WHEN (md5(id::text)::bit(32)::bigint % 8) = 4 THEN 'cultură'
  WHEN (md5(id::text)::bit(32)::bigint % 8) = 5 THEN 'sport'
  WHEN (md5(id::text)::bit(32)::bigint % 8) = 6 THEN 'social'
  ELSE 'altele'
END
WHERE category = '' OR category IS NULL;

