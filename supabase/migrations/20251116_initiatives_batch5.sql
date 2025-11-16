-- Batch 5 initiatives

WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'matei.petrescu.2008@gmail.com'
),
satu_mare_county AS (
  SELECT id FROM public.counties WHERE name = 'Satu Mare'
),
salaj_county AS (
  SELECT id FROM public.counties WHERE name = 'Sălaj'
),
sibiu_county AS (
  SELECT id FROM public.counties WHERE name = 'Sibiu'
),
suceava_county AS (
  SELECT id FROM public.counties WHERE name = 'Suceava'
),
teleorman_county AS (
  SELECT id FROM public.counties WHERE name = 'Teleorman'
),
timis_county AS (
  SELECT id FROM public.counties WHERE name = 'Timiș'
),
tulcea_county AS (
  SELECT id FROM public.counties WHERE name = 'Tulcea'
),
vaslui_county AS (
  SELECT id FROM public.counties WHERE name = 'Vaslui'
),
valcea_county AS (
  SELECT id FROM public.counties WHERE name = 'Vâlcea'
),
vrancea_county AS (
  SELECT id FROM public.counties WHERE name = 'Vrancea'
)
INSERT INTO public.initiatives (title, description, category, county_id, location, status, created_by, start_date, end_date)

SELECT 'Hub inovație startup-uri', 'Incubator pentru startup-uri și companii tech', 'economie', satu_mare_county.id, 'Satu Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, satu_mare_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', satu_mare_county.id, 'Satu Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, satu_mare_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', satu_mare_county.id, 'Satu Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, satu_mare_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', satu_mare_county.id, 'Satu Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, satu_mare_county
UNION ALL SELECT 'Program formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', satu_mare_county.id, 'Satu Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, satu_mare_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', satu_mare_county.id, 'Satu Mare', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, satu_mare_county

UNION ALL SELECT 'Centru turism cultura', 'Muzeu și galerii artiști locali și turism', 'cultura', salaj_county.id, 'Zalău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, salaj_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Sălaj', 'economie', salaj_county.id, 'Zalău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, salaj_county
UNION ALL SELECT 'Parc natural piste biciclete', 'Trasee biciclete și parc natural în regiune', 'turism', salaj_county.id, 'Zalău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, salaj_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', salaj_county.id, 'Zalău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, salaj_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă cu facilități digitale și activități culturale', 'educatie', salaj_county.id, 'Zalău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, salaj_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', salaj_county.id, 'Zalău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, salaj_county

UNION ALL SELECT 'Hub turism cultură', 'Centru turism dedicat promovării turismului și culturii', 'turism', sibiu_county.id, 'Sibiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, sibiu_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', sibiu_county.id, 'Sibiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, sibiu_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', sibiu_county.id, 'Sibiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, sibiu_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', sibiu_county.id, 'Sibiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, sibiu_county
UNION ALL SELECT 'Program educație formare', 'Cursuri formare și programe educative', 'educatie', sibiu_county.id, 'Sibiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, sibiu_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', sibiu_county.id, 'Sibiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, sibiu_county

UNION ALL SELECT 'Hub inovație startup-uri', 'Incubator pentru startup-uri și companii tech', 'economie', suceava_county.id, 'Suceava', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, suceava_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', suceava_county.id, 'Suceava', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, suceava_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', suceava_county.id, 'Suceava', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, suceava_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', suceava_county.id, 'Suceava', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, suceava_county
UNION ALL SELECT 'Program formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', suceava_county.id, 'Suceava', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, suceava_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', suceava_county.id, 'Suceava', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, suceava_county

UNION ALL SELECT 'Centru agricultură producție', 'Suport agricultori și producători din Teleorman', 'economie', teleorman_county.id, 'Alexandria', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, teleorman_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', teleorman_county.id, 'Alexandria', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, teleorman_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', teleorman_county.id, 'Alexandria', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, teleorman_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare în sectoare în creștere', 'educatie', teleorman_county.id, 'Alexandria', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, teleorman_county
UNION ALL SELECT 'Centru sănătate comunitar', 'Clinic cu servicii medicale și preventive', 'sanatate', teleorman_county.id, 'Alexandria', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, teleorman_county
UNION ALL SELECT 'Program turism agro-turism', 'Promovare turism agricol și rural în regiune', 'turism', teleorman_county.id, 'Alexandria', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, teleorman_county

UNION ALL SELECT 'Hub inovație startup-uri', 'Incubator pentru startup-uri și companii tech', 'economie', timis_county.id, 'Timișoara', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, timis_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', timis_county.id, 'Timișoara', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, timis_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', timis_county.id, 'Timișoara', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, timis_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', timis_county.id, 'Timișoara', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, timis_county
UNION ALL SELECT 'Program formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', timis_county.id, 'Timișoara', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, timis_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', timis_county.id, 'Timișoara', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, timis_county

UNION ALL SELECT 'Centru turism Dunăre', 'Turism fluvial și promovare rute Dunăre', 'turism', tulcea_county.id, 'Tulcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, tulcea_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Tulcea', 'economie', tulcea_county.id, 'Tulcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, tulcea_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', tulcea_county.id, 'Tulcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, tulcea_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', tulcea_county.id, 'Tulcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, tulcea_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă cu facilități digitale și activități culturale', 'educatie', tulcea_county.id, 'Tulcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, tulcea_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', tulcea_county.id, 'Tulcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, tulcea_county

UNION ALL SELECT 'Centru agricultură producție', 'Suport agricultori și producători din Vaslui', 'economie', vaslui_county.id, 'Vaslui', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vaslui_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', vaslui_county.id, 'Vaslui', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vaslui_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', vaslui_county.id, 'Vaslui', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vaslui_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare în sectoare în creștere', 'educatie', vaslui_county.id, 'Vaslui', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vaslui_county
UNION ALL SELECT 'Centru sănătate comunitar', 'Clinic cu servicii medicale și preventive', 'sanatate', vaslui_county.id, 'Vaslui', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vaslui_county
UNION ALL SELECT 'Program turism agro-turism', 'Promovare turism agricol și rural în regiune', 'turism', vaslui_county.id, 'Vaslui', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vaslui_county

UNION ALL SELECT 'Hub turism cultură', 'Centru turism dedicat promovării turismului și culturii', 'turism', valcea_county.id, 'Râmnicu Vâlcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, valcea_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', valcea_county.id, 'Râmnicu Vâlcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, valcea_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', valcea_county.id, 'Râmnicu Vâlcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, valcea_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', valcea_county.id, 'Râmnicu Vâlcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, valcea_county
UNION ALL SELECT 'Program educație formare', 'Cursuri formare și programe educative', 'educatie', valcea_county.id, 'Râmnicu Vâlcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, valcea_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', valcea_county.id, 'Râmnicu Vâlcea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, valcea_county

UNION ALL SELECT 'Centru turism cultura', 'Muzeu și galerii artiști locali și turism', 'cultura', vrancea_county.id, 'Focșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vrancea_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Vrancea', 'economie', vrancea_county.id, 'Focșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vrancea_county
UNION ALL SELECT 'Parc natural piste biciclete', 'Trasee biciclete și parc natural în regiune', 'turism', vrancea_county.id, 'Focșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vrancea_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', vrancea_county.id, 'Focșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vrancea_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă cu facilități digitale și activități culturale', 'educatie', vrancea_county.id, 'Focșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vrancea_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', vrancea_county.id, 'Focșani', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, vrancea_county;
