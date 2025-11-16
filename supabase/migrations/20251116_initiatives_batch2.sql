-- Batch 2 initiatives

WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'matei.petrescu.2008@gmail.com'
),
botosani_county AS (
  SELECT id FROM public.counties WHERE name = 'Botoșani'
),
brasov_county AS (
  SELECT id FROM public.counties WHERE name = 'Brașov'
),
braila_county AS (
  SELECT id FROM public.counties WHERE name = 'Brăila'
),
buzau_county AS (
  SELECT id FROM public.counties WHERE name = 'Buzău'
),
caras_county AS (
  SELECT id FROM public.counties WHERE name = 'Caraș-Severin'
),
cluj_county AS (
  SELECT id FROM public.counties WHERE name = 'Cluj'
),
constanta_county AS (
  SELECT id FROM public.counties WHERE name = 'Constanța'
)
INSERT INTO public.initiatives (title, description, category, county_id, location, status, created_by, start_date, end_date)

-- Botoșani - 6 initiatives
SELECT 'Centru turism cultural', 'Muzeu și expoziții promovând cultura locală', 'cultura', botosani_county.id, 'Botoșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, botosani_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Botoșani', 'economie', botosani_county.id, 'Botoșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, botosani_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', botosani_county.id, 'Botoșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, botosani_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', botosani_county.id, 'Botoșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, botosani_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', botosani_county.id, 'Botoșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, botosani_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', botosani_county.id, 'Botoșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, botosani_county

-- Brașov - 6 initiatives
UNION ALL SELECT 'Hub turism cultură', 'Centru turism dedicat promovării turismului și culturii', 'turism', brasov_county.id, 'Brașov', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, brasov_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', brasov_county.id, 'Brașov', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, brasov_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', brasov_county.id, 'Brașov', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, brasov_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', brasov_county.id, 'Brașov', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, brasov_county
UNION ALL SELECT 'Program educație formare', 'Cursuri formare și programe educative', 'educatie', brasov_county.id, 'Brașov', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, brasov_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', brasov_county.id, 'Brașov', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, brasov_county

-- Brăila - 6 initiatives
UNION ALL SELECT 'Centru turism Dunăre', 'Turism fluvial și promovare rute Dunăre', 'turism', braila_county.id, 'Brăila', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, braila_county
UNION ALL SELECT 'Muzeu istoria portului', 'Muzeu dedicat istoriei portului și comerțului', 'cultura', braila_county.id, 'Brăila', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, braila_county
UNION ALL SELECT 'Program protecție Dunăre', 'Inițiative protecție și curățare Dunării', 'mediu', braila_county.id, 'Brăila', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, braila_county
UNION ALL SELECT 'Centru pescuit tradițional', 'Ateliere și promovare meșeșuguri pescuitului', 'cultura', braila_county.id, 'Brăila', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, braila_county
UNION ALL SELECT 'Centru formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', braila_county.id, 'Brăila', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, braila_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă modernă cu programe culturale', 'educatie', braila_county.id, 'Brăila', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, braila_county

-- Buzău - 6 initiatives
UNION ALL SELECT 'Centru agricultură producție', 'Suport agricultori și producători din Buzău', 'economie', buzau_county.id, 'Buzău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, buzau_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', buzau_county.id, 'Buzău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, buzau_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', buzau_county.id, 'Buzău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, buzau_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare în sectoare în creștere', 'educatie', buzau_county.id, 'Buzău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, buzau_county
UNION ALL SELECT 'Centru sănătate comunitar', 'Clinic cu servicii medicale și preventive', 'sanatate', buzau_county.id, 'Buzău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, buzau_county
UNION ALL SELECT 'Program turism agro-turism', 'Promovare turism agricol și rural în regiune', 'turism', buzau_county.id, 'Buzău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, buzau_county

-- Reșița - 6 initiatives
UNION ALL SELECT 'Centru turism industrial', 'Muzeu industrial și turism patrimonial', 'turism', caras_county.id, 'Reșița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, caras_county
UNION ALL SELECT 'Program protecție mediu', 'Inițiative protecție pădurilor și habitatelor', 'mediu', caras_county.id, 'Reșița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, caras_county
UNION ALL SELECT 'Centru formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', caras_county.id, 'Reșița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, caras_county
UNION ALL SELECT 'Parc piste hiking', 'Trasee hiking și parc natural Reșița', 'turism', caras_county.id, 'Reșița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, caras_county
UNION ALL SELECT 'Biblioteca publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', caras_county.id, 'Reșița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, caras_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', caras_county.id, 'Reșița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, caras_county

-- Cluj-Napoca - 6 initiatives
UNION ALL SELECT 'Hub inovație startup-uri', 'Incubator pentru startup-uri și companii tech', 'economie', cluj_county.id, 'Cluj-Napoca', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, cluj_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', cluj_county.id, 'Cluj-Napoca', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, cluj_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea metrou', 'transport', cluj_county.id, 'Cluj-Napoca', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, cluj_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', cluj_county.id, 'Cluj-Napoca', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, cluj_county
UNION ALL SELECT 'Program formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', cluj_county.id, 'Cluj-Napoca', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, cluj_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', cluj_county.id, 'Cluj-Napoca', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, cluj_county

-- Constanța - 6 initiatives
UNION ALL SELECT 'Centru turism plajă mare', 'Turism maritim și promovare plaje', 'turism', constanta_county.id, 'Constanța', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, constanta_county
UNION ALL SELECT 'Muzeu archeologie și cultură', 'Muzeu dedicat civilizației antice și tradițiilor', 'cultura', constanta_county.id, 'Constanța', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, constanta_county
UNION ALL SELECT 'Program protecție mediu marin', 'Inițiative protecție mării și plajelor', 'mediu', constanta_county.id, 'Constanța', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, constanta_county
UNION ALL SELECT 'Centru pescuit tradițional', 'Ateliere și promovare meșeșuguri pescuitului', 'cultura', constanta_county.id, 'Constanța', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, constanta_county
UNION ALL SELECT 'Centru formare profesională', 'Cursuri formare în sectoare maritime', 'educatie', constanta_county.id, 'Constanța', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, constanta_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă modernă cu programe culturale', 'educatie', constanta_county.id, 'Constanța', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, constanta_county;
