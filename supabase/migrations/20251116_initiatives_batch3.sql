-- Batch 3 initiatives

WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'matei.petrescu.2008@gmail.com'
),
covasna_county AS (
  SELECT id FROM public.counties WHERE name = 'Covasna'
),
dambovita_county AS (
  SELECT id FROM public.counties WHERE name = 'Dâmbovița'
),
dolj_county AS (
  SELECT id FROM public.counties WHERE name = 'Dolj'
),
galati_county AS (
  SELECT id FROM public.counties WHERE name = 'Galați'
),
giurgiu_county AS (
  SELECT id FROM public.counties WHERE name = 'Giurgiu'
),
gorj_county AS (
  SELECT id FROM public.counties WHERE name = 'Gorj'
),
harghita_county AS (
  SELECT id FROM public.counties WHERE name = 'Harghita'
),
hunedoara_county AS (
  SELECT id FROM public.counties WHERE name = 'Hunedoara'
)
INSERT INTO public.initiatives (title, description, category, county_id, location, status, created_by, start_date, end_date)

SELECT 'Centru turism cultura', 'Muzeu și galerii artiști locali și turism', 'cultura', covasna_county.id, 'Sfântu Gheorghe', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, covasna_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Covasna', 'economie', covasna_county.id, 'Sfântu Gheorghe', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, covasna_county
UNION ALL SELECT 'Parc natural piste biciclete', 'Trasee biciclete și parc natural în regiune', 'turism', covasna_county.id, 'Sfântu Gheorghe', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, covasna_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', covasna_county.id, 'Sfântu Gheorghe', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, covasna_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă cu facilități digitale și activități culturale', 'educatie', covasna_county.id, 'Sfântu Gheorghe', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, covasna_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', covasna_county.id, 'Sfântu Gheorghe', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, covasna_county

UNION ALL SELECT 'Centru arts cultură', 'Teatru și galerie artiști locali', 'cultura', dambovita_county.id, 'Târgoviște', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dambovita_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', dambovita_county.id, 'Târgoviște', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dambovita_county
UNION ALL SELECT 'Transport public modern', 'Autobuze electrice și expansion rețea', 'transport', dambovita_county.id, 'Târgoviște', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dambovita_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', dambovita_county.id, 'Târgoviște', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dambovita_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', dambovita_county.id, 'Târgoviște', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dambovita_county
UNION ALL SELECT 'Centru sănătate comunitar', 'Clinic cu servicii medicale și preventive', 'sanatate', dambovita_county.id, 'Târgoviște', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dambovita_county

UNION ALL SELECT 'Hub inovație startup-uri', 'Incubator pentru startup-uri și companii tech', 'economie', dolj_county.id, 'Craiova', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dolj_county
UNION ALL SELECT 'Centru arte cultură', 'Teatru cinema și galerie artiști locali', 'cultura', dolj_county.id, 'Craiova', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dolj_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc urban', 'mediu', dolj_county.id, 'Craiova', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dolj_county
UNION ALL SELECT 'Program formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', dolj_county.id, 'Craiova', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dolj_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă modernă cu programe culturale', 'educatie', dolj_county.id, 'Craiova', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dolj_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', dolj_county.id, 'Craiova', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, dolj_county

UNION ALL SELECT 'Centru turism Danubil', 'Turism fluvial și promovare rute Dunăre', 'turism', galati_county.id, 'Galați', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, galati_county
UNION ALL SELECT 'Muzeu industrie naval', 'Muzeu dedicat industriei navale și portuare', 'cultura', galati_county.id, 'Galați', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, galati_county
UNION ALL SELECT 'Program protecție Dunăre', 'Inițiative protecție și curățare Dunării', 'mediu', galati_county.id, 'Galați', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, galati_county
UNION ALL SELECT 'Centru formare profesională', 'Cursuri formare în sectoare maritime', 'educatie', galati_county.id, 'Galați', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, galati_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', galati_county.id, 'Galați', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, galati_county
UNION ALL SELECT 'Centru sănătate comunitar', 'Clinic cu servicii medicale și preventive', 'sanatate', galati_county.id, 'Galați', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, galati_county

UNION ALL SELECT 'Centru turism Dunăre', 'Turism fluvial și promovare rute Dunăre', 'turism', giurgiu_county.id, 'Giurgiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, giurgiu_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Giurgiu', 'economie', giurgiu_county.id, 'Giurgiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, giurgiu_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', giurgiu_county.id, 'Giurgiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, giurgiu_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', giurgiu_county.id, 'Giurgiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, giurgiu_county
UNION ALL SELECT 'Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', giurgiu_county.id, 'Giurgiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, giurgiu_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', giurgiu_county.id, 'Giurgiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, giurgiu_county

UNION ALL SELECT 'Centru cultură meșteșuguri', 'Muzeu și ateliere meșteșuguri locale', 'cultura', gorj_county.id, 'Târgu Jiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, gorj_county
UNION ALL SELECT 'Program turism agro-turism', 'Promovare turism agricol și rural', 'turism', gorj_county.id, 'Târgu Jiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, gorj_county
UNION ALL SELECT 'Centru formare profesională', 'Cursuri formare în sectoare în creștere', 'educatie', gorj_county.id, 'Târgu Jiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, gorj_county
UNION ALL SELECT 'Parc zone verzi', 'Creere spații verzi și parc central', 'mediu', gorj_county.id, 'Târgu Jiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, gorj_county
UNION ALL SELECT 'Biblioteca publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'educatie', gorj_county.id, 'Târgu Jiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, gorj_county
UNION ALL SELECT 'Program dezvoltare economică', 'Suport antreprenori și micii business-uri', 'economie', gorj_county.id, 'Târgu Jiu', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, gorj_county

UNION ALL SELECT 'Centru turism cultura', 'Muzeu și galerii artiști locali și turism', 'cultura', harghita_county.id, 'Miercurea Ciuc', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, harghita_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Harghita', 'economie', harghita_county.id, 'Miercurea Ciuc', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, harghita_county
UNION ALL SELECT 'Parc natural piste biciclete', 'Trasee biciclete și parc natural în regiune', 'turism', harghita_county.id, 'Miercurea Ciuc', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, harghita_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', harghita_county.id, 'Miercurea Ciuc', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, harghita_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă cu facilități digitale și activități culturale', 'educatie', harghita_county.id, 'Miercurea Ciuc', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, harghita_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', harghita_county.id, 'Miercurea Ciuc', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, harghita_county

UNION ALL SELECT 'Centru turism cultura', 'Muzeu și galerii artiști locali și turism', 'cultura', hunedoara_county.id, 'Deva', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, hunedoara_county
UNION ALL SELECT 'Program agricultură producție', 'Suport agricultori și producători din Hunedoara', 'economie', hunedoara_county.id, 'Deva', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, hunedoara_county
UNION ALL SELECT 'Parc natural piste biciclete', 'Trasee biciclete și parc natural în regiune', 'turism', hunedoara_county.id, 'Deva', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, hunedoara_county
UNION ALL SELECT 'Centru educație formare', 'Cursuri formare și programe educative', 'educatie', hunedoara_county.id, 'Deva', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, hunedoara_county
UNION ALL SELECT 'Bibliotecă centru cultural', 'Bibliotecă cu facilități digitale și activități culturale', 'educatie', hunedoara_county.id, 'Deva', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, hunedoara_county
UNION ALL SELECT 'Centru sănătate wellness', 'Clinic și centre wellness pentru populație', 'sanatate', hunedoara_county.id, 'Deva', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, hunedoara_county;
