-- Batch 1 initiatives - Simplified format

-- Get admin user
WITH admin_user AS (
  SELECT id FROM auth.users WHERE email = 'matei.petrescu.2008@gmail.com'
),
bucuresti_county AS (
  SELECT id FROM public.counties WHERE name = 'București'
),
alba_county AS (
  SELECT id FROM public.counties WHERE name = 'Alba'
),
arad_county AS (
  SELECT id FROM public.counties WHERE name = 'Arad'
),
arges_county AS (
  SELECT id FROM public.counties WHERE name = 'Argeș'
),
bacau_county AS (
  SELECT id FROM public.counties WHERE name = 'Bacău'
),
bihor_county AS (
  SELECT id FROM public.counties WHERE name = 'Bihor'
),
bistrita_county AS (
  SELECT id FROM public.counties WHERE name = 'Bistrița-Năsăud'
)
INSERT INTO public.initiatives (title, description, category, county_id, location, status, created_by, start_date, end_date)

-- București - 6 initiatives
SELECT 'Transport public modernizat', 'Extinderea rețelei de metrou și autobuze electrice în întreaga ciutat', 'transport', bucuresti_county.id, 'București', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bucuresti_county
UNION ALL SELECT 'Parc central cu lac artificial', 'Construire de parc cu facilități sportive și de agrement', 'mediu', bucuresti_county.id, 'București', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bucuresti_county
UNION ALL SELECT 'Educație digitală pentru toți', 'Programe gratuite de IT și programare în biblioteci', 'educatie', bucuresti_county.id, 'București', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bucuresti_county
UNION ALL SELECT 'Restaurare clădiri istorice', 'Conservarea patrimoniului arhitectural din centrul istoric', 'cultura', bucuresti_county.id, 'București', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bucuresti_county
UNION ALL SELECT 'Rețea de piste de biciclete', 'Construire de piste sigure și interconectate pe întreg oraș', 'mobilitate', bucuresti_county.id, 'București', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bucuresti_county
UNION ALL SELECT 'Sistem de reciclare modern', 'Implementare de colectare separată de deșeuri în toate cartierele', 'mediu', bucuresti_county.id, 'București', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bucuresti_county

-- Alba Iulia - 6 initiatives
UNION ALL SELECT 'Fort medieval restaurat', 'Restaurare și deschidere pentru turism a fortificațiilor istorice', 'cultura', alba_county.id, 'Alba Iulia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, alba_county
UNION ALL SELECT 'Rute turistice noi', 'Creare de trasee și promovare a atracțiilor locale', 'turism', alba_county.id, 'Alba Iulia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, alba_county
UNION ALL SELECT 'LED iluminat public', 'Înlocuire sistem de iluminat cu versiune eco-eficientă', 'infrastructura', alba_county.id, 'Alba Iulia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, alba_county
UNION ALL SELECT 'Cursuri meșteșuguri tradiționale', 'Transmitere de cunoștințe și ateliere de meșteșuguri locale', 'educatie', alba_county.id, 'Alba Iulia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, alba_county
UNION ALL SELECT 'Parc comunitar nou', 'Amenajare parc pentru activități comunitare și recreație', 'mediu', alba_county.id, 'Alba Iulia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, alba_county
UNION ALL SELECT 'Program antreprenori', 'Suport și microfinanțare pentru tineri antreprenori', 'economie', alba_county.id, 'Alba Iulia', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, alba_county

-- Arad - 6 initiatives
UNION ALL SELECT 'Centru sportiv modern', 'Construire de centru cu bazin, sală de fitness și arenă', 'sport', arad_county.id, 'Arad', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arad_county
UNION ALL SELECT 'Bibliotecă digitală', 'Colecție online de cărți și resurse educaționale gratuite', 'educatie', arad_county.id, 'Arad', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arad_county
UNION ALL SELECT 'Păduri urbane', 'Plantare de copaci și creere de zone verzi în city', 'mediu', arad_county.id, 'Arad', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arad_county
UNION ALL SELECT 'Restaurare clădiri istorice', 'Conservare și restabilire a clădirilor cu importanță istorică', 'cultura', arad_county.id, 'Arad', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arad_county
UNION ALL SELECT 'Program mentorat tineri', 'Conexiuni între profesioniști și tineri pentru dezvoltare', 'educatie', arad_county.id, 'Arad', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arad_county
UNION ALL SELECT 'Centru comunitar', 'Spațiu pentru activități comunitare, cursuri și programe sociale', 'socializare', arad_county.id, 'Arad', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arad_county

-- Pitești - 6 initiatives
UNION ALL SELECT 'Centru istoric renovate', 'Renovare și modernizare cu respectarea arhitecturii tradiționale', 'cultura', arges_county.id, 'Pitești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arges_county
UNION ALL SELECT 'Transport școlar gratuit', 'Asigurare de transport pentru elevi din zone depărtate', 'educatie', arges_county.id, 'Pitești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arges_county
UNION ALL SELECT 'Parc de aventură copii', 'Parc tematic cu activități și jocuri pentru copii', 'recreatie', arges_county.id, 'Pitești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arges_county
UNION ALL SELECT 'Accesibilitate persoane dizabilități', 'Adaptare spații publice și instituții pentru toți', 'social', arges_county.id, 'Pitești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arges_county
UNION ALL SELECT 'Festival cultură și arte', 'Eveniment anual promovând artele și tradițiile locale', 'cultura', arges_county.id, 'Pitești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arges_county
UNION ALL SELECT 'Stații încărcare auto electric', 'Rețea de stații pentru mașini electrice în tot județul', 'mobilitate', arges_county.id, 'Pitești', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, arges_county

-- Bacău - 6 initiatives
UNION ALL SELECT 'Hub inovație startup-uri', 'Spațiu dedicat inovației cu birou și suport pentru startup-uri', 'economie', bacau_county.id, 'Bacău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bacau_county
UNION ALL SELECT 'Reabilitare râu Bistrița', 'Curățare și protecție râu cu recreere habitatelor', 'mediu', bacau_county.id, 'Bacău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bacau_county
UNION ALL SELECT 'Programe sănătate mintală', 'Cursuri și suport psihologic gratuit pentru toți', 'sanatate', bacau_county.id, 'Bacău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bacau_county
UNION ALL SELECT 'Modernizare apă canalizare', 'Înlocuire conducte vechi cu sistem modern', 'infrastructura', bacau_county.id, 'Bacău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bacau_county
UNION ALL SELECT 'Grădini comunitare urbane', 'Spații unde localnicii cultivă legume și plante', 'mediu', bacau_county.id, 'Bacău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bacau_county
UNION ALL SELECT 'Teatru comunitar', 'Teatru și programe educație dramatică pentru comunitate', 'cultura', bacau_county.id, 'Bacău', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bacau_county

-- Oradea - 6 initiatives
UNION ALL SELECT 'Turism termal wellness', 'Modernizare facilități termale pentru atrage turiști', 'turism', bihor_county.id, 'Oradea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bihor_county
UNION ALL SELECT 'Piste alergare ciclism', 'Construire piste dedicate pentru alergare și ciclism', 'sport', bihor_county.id, 'Oradea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bihor_county
UNION ALL SELECT 'Bibliotecă reciclare', 'Spațiu unde se pot schimba și recicla obiecte vechi', 'mediu', bihor_county.id, 'Oradea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bihor_county
UNION ALL SELECT 'Muzeu interactiv istoric', 'Muzeu cu expoziții și activități interactive', 'cultura', bihor_county.id, 'Oradea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bihor_county
UNION ALL SELECT 'Program integrare migranți', 'Cursuri limbă și orientare pentru migranți', 'social', bihor_county.id, 'Oradea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bihor_county
UNION ALL SELECT 'Iluminat inteligent senzori', 'Sistem de iluminat care se ajustează automat', 'infrastructura', bihor_county.id, 'Oradea', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bihor_county

-- Bistrița - 6 initiatives
UNION ALL SELECT 'Educație abilități digitale', 'Cursuri și workshop IT și online', 'educatie', bistrita_county.id, 'Bistrița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bistrita_county
UNION ALL SELECT 'Fortificații medievale restaurate', 'Restaurare și conservare fortificații din Bistrița', 'cultura', bistrita_county.id, 'Bistrița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bistrita_county
UNION ALL SELECT 'Turism pe bicicletă', 'Trasee în natură și promovare turism activ', 'turism', bistrita_county.id, 'Bistrița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bistrita_county
UNION ALL SELECT 'Centru zi vârstnici', 'Spațiu pentru activități sociale și recreative', 'social', bistrita_county.id, 'Bistrița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bistrita_county
UNION ALL SELECT 'Parc naturist eco-friendly', 'Parc cu facilități eco-friendly și cășuțe din lemn', 'turism', bistrita_county.id, 'Bistrița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bistrita_county
UNION ALL SELECT 'Program apicultura urbană', 'Suport și formare pentru producători miere', 'economie', bistrita_county.id, 'Bistrița', 'active', admin_user.id, NOW(), NOW() + INTERVAL '180 days' FROM admin_user, bistrita_county;
