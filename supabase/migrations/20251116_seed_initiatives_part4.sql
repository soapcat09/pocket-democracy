-- Seed initiatives - Part 4 (Final part)

INSERT INTO public.initiatives (
  title,
  description,
  town,
  county,
  status,
  created_by,
  created_at,
  updated_at,
  category,
  target_votes
) VALUES
-- Satu Mare
('Centru de turism și cultura', 'Muzeu și galerii pentru artiști locali și turism', 'Satu Mare', 'Satu Mare', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 600),
('Program de agricultură și producție locală', 'Suport pentru agricultori și producători din Satu Mare', 'Satu Mare', 'Satu Mare', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 550),
('Parc natural și piste de biciclete', 'Trasee de biciclete și parc natural în regiune', 'Satu Mare', 'Satu Mare', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 600),
('Centru de educație și formare', 'Cursuri de formare și programe educative', 'Satu Mare', 'Satu Mare', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 500),
('Bibliotecă modernă și centru cultural', 'Bibliotecă cu facilități digitale și activități culturale', 'Satu Mare', 'Satu Mare', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),
('Centru de sănătate și wellness', 'Clinic și centre wellness pentru populație', 'Satu Mare', 'Satu Mare', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 520),

-- Zalău
('Centru de cultură și meșteșuguri tradiționale', 'Muzeu și ateliere pentru meșteșuguri locale', 'Zalău', 'Sălaj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 550),
('Program de turism și agro-turism', 'Promovarea turismului agricol și rural', 'Zalău', 'Sălaj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 580),
('Centru de educație și formare profesională', 'Cursuri de formare în sectoare în creștere', 'Zalău', 'Sălaj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 500),
('Parc și zone verzi', 'Crearea de spații verzi și parc central', 'Zalău', 'Sălaj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 480),
('Bibliotecă publică modernă', 'Bibliotecă cu spații digitale și culturale', 'Zalău', 'Sălaj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 450),
('Program de dezvoltare economică locală', 'Suport pentru antreprenori și micii business-uri', 'Zalău', 'Sălaj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 520),

-- Sibiu
('Hub de turism și cultura', 'Centru dedicat promovării turismului și culturii sibiene', 'Sibiu', 'Sibiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 800),
('Centru de arte și cultură', 'Teatru, cinema și galerie pentru artiști locali', 'Sibiu', 'Sibiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 750),
('Modernizare transport public', 'Autobuze electrice și expansion de rețea', 'Sibiu', 'Sibiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'transport', 700),
('Parc și zone verzi', 'Crearea de spații verzi și parc urban', 'Sibiu', 'Sibiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 650),
('Program de educație și formare', 'Cursuri de formare și programe educative', 'Sibiu', 'Sibiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 700),
('Centru de sănătate și wellness', 'Clinic și centre wellness pentru populație', 'Sibiu', 'Sibiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 650),

-- Suceava
('Centru de turism și cultura bucovinană', 'Muzeu dedicat culturii și tradițiilor bucovinene', 'Suceava', 'Suceava', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 650),
('Program de turism și agro-turism', 'Promovarea turismului tradițional în Bucovina', 'Suceava', 'Suceava', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 700),
('Centru de protecție a mediului', 'Inițiative de protecție a pădurilor și habitatelor', 'Suceava', 'Suceava', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 600),
('Program de suport pentru meșteșuguri tradiționale', 'Ateliere și cursuri de meșteșuguri bucovinene', 'Suceava', 'Suceava', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 580),
('Centru de educație și formare profesională', 'Cursuri de formare în sectoare în creștere', 'Suceava', 'Suceava', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 600),
('Bibliotecă digitală și centru cultural', 'Bibliotecă modernă cu programe culturale', 'Suceava', 'Suceava', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 550),

-- Alexandria
('Centru de sănătate comunitară', 'Clinic cu servicii medicale și preventive', 'Alexandria', 'Teleorman', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 500),
('Program de agricultură și producție locală', 'Suport pentru agricultori și producători din Teleorman', 'Alexandria', 'Teleorman', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 520),
('Parc și zone verzi', 'Crearea de spații verzi și parc central', 'Alexandria', 'Teleorman', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 480),
('Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'Alexandria', 'Teleorman', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 450),
('Centru de educație și formare', 'Cursuri de formare în sectoare noi', 'Alexandria', 'Teleorman', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 470),
('Program de turism și agro-turism', 'Promovarea turismului agricol și rural în regiune', 'Alexandria', 'Teleorman', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 510),

-- Timișoara
('Hub de inovație și startup-uri', 'Incubator pentru startup-uri și companii tech', 'Timișoara', 'Timiș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 900),
('Centru de arte și cultură', 'Teatru, cinema și galerie pentru artiști locali', 'Timișoara', 'Timiș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 850),
('Modernizare transport public', 'Autobuze și tramvaie electrice cu expansion de rețea', 'Timișoara', 'Timiș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'transport', 900),
('Parc și zone verzi', 'Crearea de spații verzi și parc urban', 'Timișoara', 'Timiș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 800),
('Program de educație și formare profesională', 'Cursuri de formare în sectoare în creștere', 'Timișoara', 'Timiș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 850),
('Centru de sănătate și wellness', 'Clinic și centre wellness pentru populație', 'Timișoara', 'Timiș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 750),

-- Tulcea
('Centru de turism și ecoturism pe Danubiu', 'Hub pentru turism și ecoturism în Delta Dunării', 'Tulcea', 'Tulcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 800),
('Muzeu de biodiversitate și ecosistem', 'Muzeu dedicat faunei și florei din Delta Dunării', 'Tulcea', 'Tulcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 700),
('Program de protecție a Deltei Dunării', 'Inițiative de protecție a habitatelor naturale', 'Tulcea', 'Tulcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 850),
('Centru de observare a păsărilor și wildlife', 'Facilități pentru ornitologie și observare a faunei', 'Tulcea', 'Tulcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 700),
('Centru de educație asupra mediului', 'Programe educative asupra protecției mediului', 'Tulcea', 'Tulcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 600),
('Program de turism și pescuit tradițional', 'Promovarea turismului și pescuitului tradițional', 'Tulcea', 'Tulcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 650),

-- Vaslui
('Centru de agricultură și producție locală', 'Suport pentru agricultori și producători din Vaslui', 'Vaslui', 'Vaslui', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 550),
('Parc și zone verzi', 'Crearea de spații verzi și parc central', 'Vaslui', 'Vaslui', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 500),
('Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'Vaslui', 'Vaslui', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),
('Centru de educație și formare', 'Cursuri de formare în sectoare în creștere', 'Vaslui', 'Vaslui', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 500),
('Centru de sănătate comunitară', 'Clinic cu servicii medicale și preventive', 'Vaslui', 'Vaslui', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 520),
('Program de turism și agro-turism', 'Promovarea turismului agricol și rural în regiune', 'Vaslui', 'Vaslui', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 530),

-- Râmnicu Vâlcea
('Centru de turism și stațiuni termale', 'Promovarea turismului și facilitaților termale', 'Râmnicu Vâlcea', 'Vâlcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 700),
('Program de protecție a mediului și pădurilor', 'Inițiative de protecție a pădurilor din Vâlcea', 'Râmnicu Vâlcea', 'Vâlcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 650),
('Centru de educație și formare profesională', 'Cursuri de formare în sectoare în creștere', 'Râmnicu Vâlcea', 'Vâlcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 600),
('Parc și piste de hiking', 'Trasee de trekking și parc natural în muntele Vâlcea', 'Râmnicu Vâlcea', 'Vâlcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 620),
('Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'Râmnicu Vâlcea', 'Vâlcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 550),
('Centru de sănătate și wellness', 'Clinic și centre wellness cu facilități termale', 'Râmnicu Vâlcea', 'Vâlcea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 600),

-- Focșani
('Centru de agricultură și producție vinicol', 'Suport pentru viticultori și producători de vin din Vrancea', 'Focșani', 'Vrancea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 600),
('Festival anual de vin și cultură', 'Eveniment cu degustări și promovarea vinurilor locale', 'Focșani', 'Vrancea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 580),
('Program de turism vinicol', 'Trasee vinicole și promovarea turismului pe ruta vinului', 'Focșani', 'Vrancea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 650),
('Parc și zone verzi', 'Crearea de spații verzi și parc central', 'Focșani', 'Vrancea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 500),
('Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'Focșani', 'Vrancea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),
('Centru de sănătate și educație', 'Clinic și programe educative pentru populație', 'Focșani', 'Vrancea', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 520);
