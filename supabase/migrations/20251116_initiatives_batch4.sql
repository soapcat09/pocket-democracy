-- Batch 4 initiatives

WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'matei.petrescu.2008@gmail.com'
),
ialomita_county AS (
  SELECT id FROM public.counties WHERE name = 'Ialomița'
),
iasi_county AS (
  SELECT id FROM public.counties WHERE name = 'Iași'
),
ilfov_county AS (
  SELECT id FROM public.counties WHERE name = 'Ilfov'
),
maramures_county AS (
  SELECT id FROM public.counties WHERE name = 'Maramureș'
),
mehedinti_county AS (
  SELECT id FROM public.counties WHERE name = 'Mehedinți'
),
mures_county AS (
  SELECT id FROM public.counties WHERE name = 'Mureș'
),
neamt_county AS (
  SELECT id FROM public.counties WHERE name = 'Neamț'
),
olt_county AS (
  SELECT id FROM public.counties WHERE name = 'Olt'
),
prahova_county AS (
  SELECT id FROM public.counties WHERE name = 'Prahova'
)
INSERT INTO public.initiatives (title, description, category, county_id, location, status, created_by, start_date, end_date)

SELECT 'Centru agricultură producție', 'Suport agricultori și producători din Ialomița', 'economie', ialomita_county.id, 'Slobozia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ialomita_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', ialomita_county.id, 'Slobozia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ialomita_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', ialomita_county.id, 'Slobozia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ialomita_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare în sectoare în creștere', 'educatie', ialomita_county.id, 'Slobozia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ialomita_county
UNION ALL SELECT 'Centru sănătate comunitar', 'Clinic cu servicii medicale și preventive', 'sanatate', ialomita_county.id, 'Slobozia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ialomita_county
UNION ALL SELECT 'Program turism agro-turism', 'Promovare turism agricol și rural în regiune', 'turism', ialomita_county.id, 'Slobozia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ialomita_county

UNION ALL SELECT 'Hub inovație startup-uri', 'Incubator pentru startup-uri și companii tech', 'economie', iasi_county.id, 'Iași', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, iasi_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', iasi_county.id, 'Iași', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, iasi_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', iasi_county.id, 'Iași', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, iasi_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', iasi_county.id, 'Iași', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, iasi_county
UNION ALL SELECT 'Program formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', iasi_county.id, 'Iași', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, iasi_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', iasi_county.id, 'Iași', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, iasi_county

UNION ALL SELECT 'Centru turism cultura', 'Muzeu și galerii artiști locali și turism', 'cultura', ilfov_county.id, 'Buftea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ilfov_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Ilfov', 'economie', ilfov_county.id, 'Buftea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ilfov_county
UNION ALL SELECT 'Parc natural piste biciclete', 'Trasee biciclete și parc natural în regiune', 'turism', ilfov_county.id, 'Buftea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ilfov_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', ilfov_county.id, 'Buftea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ilfov_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă cu facilități digitale și activități culturale', 'educatie', ilfov_county.id, 'Buftea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ilfov_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', ilfov_county.id, 'Buftea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, ilfov_county

UNION ALL SELECT 'Hub turism cultură', 'Centru turism dedicat promovării turismului și culturii', 'turism', maramures_county.id, 'Baia Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, maramures_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', maramures_county.id, 'Baia Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, maramures_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', maramures_county.id, 'Baia Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, maramures_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', maramures_county.id, 'Baia Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, maramures_county
UNION ALL SELECT 'Program educație formare', 'Cursuri formare și programe educative', 'educatie', maramures_county.id, 'Baia Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, maramures_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', maramures_county.id, 'Baia Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, maramures_county

UNION ALL SELECT 'Centru turism Dunăre', 'Turism fluvial și promovare rute Dunăre', 'turism', mehedinti_county.id, 'Drobeta-Turnu Severin', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mehedinti_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Mehedinți', 'economie', mehedinti_county.id, 'Drobeta-Turnu Severin', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mehedinti_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', mehedinti_county.id, 'Drobeta-Turnu Severin', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mehedinti_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', mehedinti_county.id, 'Drobeta-Turnu Severin', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mehedinti_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', mehedinti_county.id, 'Drobeta-Turnu Severin', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mehedinti_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', mehedinti_county.id, 'Drobeta-Turnu Severin', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mehedinti_county

UNION ALL SELECT 'Hub inovație startup-uri', 'Incubator pentru startup-uri și companii tech', 'economie', mures_county.id, 'Târgu Mureș', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mures_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', mures_county.id, 'Târgu Mureș', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mures_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', mures_county.id, 'Târgu Mureș', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mures_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', mures_county.id, 'Târgu Mureș', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mures_county
UNION ALL SELECT 'Program formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', mures_county.id, 'Târgu Mureș', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mures_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', mures_county.id, 'Târgu Mureș', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, mures_county

UNION ALL SELECT 'Centru turism cultura', 'Muzeu și galerii artiști locali și turism', 'cultura', neamt_county.id, 'Piatra Neamț', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, neamt_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Neamț', 'economie', neamt_county.id, 'Piatra Neamț', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, neamt_county
UNION ALL SELECT 'Parc natural piste biciclete', 'Trasee biciclete și parc natural în regiune', 'turism', neamt_county.id, 'Piatra Neamț', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, neamt_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', neamt_county.id, 'Piatra Neamț', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, neamt_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă cu facilități digitale și activități culturale', 'educatie', neamt_county.id, 'Piatra Neamț', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, neamt_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', neamt_county.id, 'Piatra Neamț', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, neamt_county

UNION ALL SELECT 'Centru agricultură producție', 'Suport agricultori și producători din Olt', 'economie', olt_county.id, 'Slatina', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, olt_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', olt_county.id, 'Slatina', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, olt_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', olt_county.id, 'Slatina', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, olt_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare în sectoare în creștere', 'educatie', olt_county.id, 'Slatina', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, olt_county
UNION ALL SELECT 'Centru sănătate comunitar', 'Clinic cu servicii medicale și preventive', 'sanatate', olt_county.id, 'Slatina', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, olt_county
UNION ALL SELECT 'Program turism agro-turism', 'Promovare turism agricol și rural în regiune', 'turism', olt_county.id, 'Slatina', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, olt_county

UNION ALL SELECT 'Hub inovație startup-uri', 'Incubator pentru startup-uri și companii tech', 'economie', prahova_county.id, 'Ploiești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, prahova_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', prahova_county.id, 'Ploiești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, prahova_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', prahova_county.id, 'Ploiești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, prahova_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', prahova_county.id, 'Ploiești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, prahova_county
UNION ALL SELECT 'Program formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', prahova_county.id, 'Ploiești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, prahova_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', prahova_county.id, 'Ploiești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, prahova_county;
