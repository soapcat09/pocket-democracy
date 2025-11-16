-- Seed all initiatives for all Romanian cities (Fixed version)

-- București (6 initiatives)
INSERT INTO public.initiatives (title, description, location, county_id, status, created_by, created_at, updated_at, category, end_date) 
SELECT 'Îmbunătățirea sistemului de transport public', 'Modernizarea și extinderea rețelei de metrou și a autobuzelor cu accent pe liniile periferice', 'București', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'transport', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'București'

UNION ALL

SELECT 'Creșterea spațiilor verzi în piețele publice', 'Plantarea de copaci și crearea de parcuri în zone aglomerate din centrul orașului', 'București', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'București'

UNION ALL

SELECT 'Programme de educație digitală pentru seniori', 'Cursuri gratuite de informatică și folosire a internetului în biblioteci și centre civice', 'București', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'București'

UNION ALL

SELECT 'Renovarea și revitalizarea clădirilor istorice', 'Restabilirea aspectului original al unor clădiri din secolul XIX-XX din centrul istoric', 'București', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'București'

UNION ALL

SELECT 'Crearea de piste de biciclete sigure', 'Construirea unei rețele interconectate de piste dedicate pentru bicicliști', 'București', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mobilitate', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'București'

UNION ALL

SELECT 'Program de colectare și reciclare a deșeurilor', 'Implementarea unui sistem modern de separare și reciclare a deșeurilor în toate cartierele', 'București', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'București'

UNION ALL

-- Alba Iulia (6 initiatives)
SELECT 'Reabilitarea fortului medieval', 'Restaurarea și conservarea fortificațiilor istorice din Alba Iulia', 'Alba Iulia', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Alba'

UNION ALL

SELECT 'Dezvoltare turism local', 'Crearea de rute turistice și promovarea atracțiilor locale', 'Alba Iulia', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Alba'

UNION ALL

SELECT 'Modernizare iluminat public', 'Înlocuirea sistemului de iluminat tradițional cu LED-uri eficiente energetic', 'Alba Iulia', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'infrastructura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Alba'

UNION ALL

SELECT 'Curs gratuit de învățare meșteșuguri tradiționale', 'Transmiterea cunoștințelor despre meșteșugurile tradiționale către tineri', 'Alba Iulia', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Alba'

UNION ALL

SELECT 'Amenajare parc comunitar', 'Crearea unui parc destinat activităților comunitare și recreației', 'Alba Iulia', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Alba'

UNION ALL

SELECT 'Program de sprijin pentru antreprenori locali', 'Ateliere de business și acces la microfinanțare pentru micii business-uri', 'Alba Iulia', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Alba'

UNION ALL

-- Arad (6 initiatives)
SELECT 'Construire centru sportiv multifuncțional', 'Edificiu modern pentru activități sportive și recreație cu bazin și sălă de fitness', 'Arad', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sport', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Arad'

UNION ALL

SELECT 'Biblioteca digitală a orașului', 'Colecție online de cărți, documente și resurse educaționale accesibile gratuit', 'Arad', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Arad'

UNION ALL

SELECT 'Proiect verde - păduri urbane', 'Plantarea de copaci în diferite zone ale orașului pentru a crea păduri urbane', 'Arad', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Arad'

UNION ALL

SELECT 'Restaurare edificii cu valoare arhitecturală', 'Conservarea și restaurarea clădirilor cu importanță istorică din Arad', 'Arad', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Arad'

UNION ALL

SELECT 'Program de mentorat pentru tineri', 'Conexiuni între profesioniști experimentați și tineri doritori să invețe', 'Arad', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Arad'

UNION ALL

SELECT 'Centru comunitar multifuncțional', 'Spațiu destinat activităților comunitare, cursuri și programe sociale', 'Arad', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'socializare', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Arad'

UNION ALL

-- Pitești (6 initiatives)
SELECT 'Reabilitare centru istoric', 'Renovarea și modernizarea zonei centrale a orașului cu respectarea arhitecturii tradiționale', 'Pitești', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Argeș'

UNION ALL

SELECT 'Program transport școlar gratuit', 'Asigurarea transportului gratuit pentru elevii care locuiesc departe de instituțiile de învățământ', 'Pitești', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Argeș'

UNION ALL

SELECT 'Parc de aventură pentru copii', 'Crearea unui parc tematic cu activități și jocuri pentru copii de diferite vârste', 'Pitești', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'recreatie', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Argeș'

UNION ALL

SELECT 'Sensibilizare privind accesibilitate pentru persoane cu dizabilități', 'Adaptarea spațiilor publice și instituțiilor pentru a fi accesibile tuturor', 'Pitești', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'social', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Argeș'

UNION ALL

SELECT 'Festival anual de cultură și arte', 'Organizarea unui eveniment anual care promovează artele și tradițiile locale', 'Pitești', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Argeș'

UNION ALL

SELECT 'Stație de încărcare pentru vehicule electrice', 'Instalarea unei rețele de stații de încărcare pentru mașinile electrice', 'Pitești', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mobilitate', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Argeș'

UNION ALL

-- Bacău (6 initiatives)
SELECT 'Centru de inovație și startup-uri', 'Spațiu dedicat inovației, cu birou și suport pentru antreprenori tineri', 'Bacău', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bacău'

UNION ALL

SELECT 'Reabilitare râul Bistrița', 'Curățare și protejare a riului cu recrearea habitatelor naturale', 'Bacău', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bacău'

UNION ALL

SELECT 'Cursuri de prevenție a crizei de sănătate mintală', 'Program educativ asupra sănătății mentale și suport psihologic gratuit', 'Bacău', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bacău'

UNION ALL

SELECT 'Modernizare rețea de apă și canalizare', 'Înlocuirea conductelor vechi cu sistem modern de distribuție a apei', 'Bacău', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'infrastructura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bacău'

UNION ALL

SELECT 'Grădini comunale urbane', 'Crearea de grădini comunitare unde localnicii pot cultiva legume și plante', 'Bacău', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bacău'

UNION ALL

SELECT 'Teatru comunitar și ateliere teatrale', 'Crearea unui teatru comunitar și programe de educație dramatică', 'Bacău', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bacău'

UNION ALL

-- Oradea (6 initiatives)
SELECT 'Dezvoltare turism termal și wellness', 'Promovarea și modernizarea facilitaților termale existente pentru atrage turiști', 'Oradea', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bihor'

UNION ALL

SELECT 'Pista de rulare și ciclism în natură', 'Construirea unor piste dedicate pentru alergare și ciclism în zone verzi', 'Oradea', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sport', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bihor'

UNION ALL

SELECT 'Bibliotecă de reciclare - economy circulară', 'Bibliotecă unde oamenii pot schimba și recicla obiecte vechi', 'Oradea', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bihor'

UNION ALL

SELECT 'Muzeu interactiv al istoriei locale', 'Muzeu cu expozițiilor și activități interactive despre istoria Oradiei', 'Oradea', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bihor'

UNION ALL

SELECT 'Program de integrare a migranților și refugiaților', 'Cursuri de limbă română și orientare pentru migranți în societatea locală', 'Oradea', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'social', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bihor'

UNION ALL

SELECT 'Sistem de iluminat inteligent cu senzori', 'Instalare de sistemul de iluminat care se ajustează automat în funcție de nevoie', 'Oradea', counties.id, 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'infrastructura', NOW() + INTERVAL '180 days' 
FROM public.counties WHERE counties.name = 'Bihor';
