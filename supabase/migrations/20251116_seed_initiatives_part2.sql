-- Seed initiatives - Part 2 (continuare cu restul orașelor)

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
-- Călărași
('Centru de educație ecologică', 'Program educativ asupra protecției mediului și trăirii sustenabile', 'Călărași', 'Călărași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),
('Dezvoltare turism pe Dunăru', 'Trasee de croazieră și activități pe Dunăru', 'Călărași', 'Călărași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 550),
('Program agricol și gestionarea resurselor apei', 'Suport pentru agricultori în utilizare eficientă a apei', 'Călărași', 'Călărași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 500),
('Centru de sănătate și wellness', 'Facilități de fitness, sănătate și wellness accesibile pentru toți', 'Călărași', 'Călărași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 520),
('Biblioteca digitală și centru IT', 'Bibliotecă cu sală de calculatoare și cursuri de IT', 'Călărași', 'Călărași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),
('Parc central cu zone recreative', 'Renovare și modernizare a parcului central al orașului', 'Călărași', 'Călărași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'recreatie', 560),

-- Cluj-Napoca
('Hub de inovație și startup-uri tech', 'Spațiu de lucru parțial și incubator pentru startup-uri tech', 'Cluj-Napoca', 'Cluj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 900),
('Extindere rețea de transport public', 'Adăugarea de noi linii de autobuz și tramvai', 'Cluj-Napoca', 'Cluj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'transport', 850),
('Muzeu de arta contemporană', 'Galerie pentru artiști contemporani locali și internaționali', 'Cluj-Napoca', 'Cluj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 750),
('Program de inclusiune pentru persoane cu dizabilități', 'Inițiative de asigurare a accesibilității pentru toți', 'Cluj-Napoca', 'Cluj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'social', 700),
('Centru de cercetare și inovație în medicină', 'Laborator de cercetare medicală și biotehnologie', 'Cluj-Napoca', 'Cluj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 800),
('Parc subacvatic și centru de scufundări', 'Atracție turistică subacvatică și centru de scufundări', 'Cluj-Napoca', 'Cluj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 650),

-- Constanța
('Dezvoltare litoralului și plajelor', 'Modernizare și curățarea plajelor, facilitați de recreație', 'Constanța', 'Constanța', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 900),
('Centru de înot și water sports', 'Facilități pentru înot, scufundări și alte sporturi pe apă', 'Constanța', 'Constanța', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sport', 800),
('Protecție și conservare a dunelor de nisip', 'Program de protecție a dunelor și prevenire a eroziunii', 'Constanța', 'Constanța', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 750),
('Muzeu maritim și patrimoniu naval', 'Muzeu dedicat istoriei maritime și culturii litoralului', 'Constanța', 'Constanța', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 700),
('Program de combatere a poluării marine', 'Inițiative de curățare și protecție a mării', 'Constanța', 'Constanța', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 850),
('Festival anual de cultură și muzică', 'Eveniment cu artiști locali și internaționali', 'Constanța', 'Constanța', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 650),

-- Sfântu Gheorghe
('Centru de sănătate și medicina tradițională', 'Clinică integrativă cu medicină occidentală și tradițională', 'Sfântu Gheorghe', 'Covasna', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 500),
('Turism de wellness și relaxare', 'Spa-uri și centre de wellness cu băi termale', 'Sfântu Gheorghe', 'Covasna', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 600),
('Parc natural și piste de hiking', 'Trasee de trekking și amplasare de instalații în natură', 'Sfântu Gheorghe', 'Covasna', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 550),
('Program de agricultură ecologică', 'Suport pentru cultivarea de produse ecologice și biodinamice', 'Sfântu Gheorghe', 'Covasna', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 480),
('Centru de artă și meșteșuguri tradiționale', 'Ateliere și expuneri de artă și meșteșuguri locale', 'Sfântu Gheorghe', 'Covasna', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 520),
('Biblioteca comunitară și centru de lectură', 'Bibliotecă modernă cu spații de lectură și activități', 'Sfântu Gheorghe', 'Covasna', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 450),

-- Târgoviște
('Centru de sănătate comunitară', 'Clinic cu servicii de sănătate preventivă și curativă', 'Târgoviște', 'Dâmbovița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 580),
('Conservare și restaurare a Curții Domne', 'Restaurarea complexului Curții Domnești din Târgoviște', 'Târgoviște', 'Dâmbovița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 650),
('Program de reconversie profesională', 'Cursuri de formare pentru noi meserii și cariere', 'Târgoviște', 'Dâmbovița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 520),
('Parc de energie regenerabilă', 'Instalare de panouri solare și turbine eoliene', 'Târgoviște', 'Dâmbovița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 700),
('Centru comercial verde', 'Mall cu design sustenabil și magazine locale', 'Târgoviște', 'Dâmbovița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 600),
('Program de transport public ecologic', 'Introducerea de autobuze electrice și piste de biciclete', 'Târgoviște', 'Dâmbovița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mobilitate', 580),

-- Craiova
('Centru de arte performative', 'Teatru și sală de concerte pentru artiști locali și internaționali', 'Craiova', 'Dolj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 700),
('Muzeu de arta și civilizație', 'Muzeu dedicat artei și culturii regiunii', 'Craiova', 'Dolj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 680),
('Program agricol și industrie alimentară', 'Suport pentru agricultori și producători de alimente locale', 'Craiova', 'Dolj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 620),
('Parc urban cu activități pentru copii', 'Parc cu zone de joacă și activități educative', 'Craiova', 'Dolj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'recreatie', 560),
('Centru de formare IT și digitalizare', 'Cursuri de programare și digitalizare pentru toți', 'Craiova', 'Dolj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 640),
('Program de revitalizare a Pieții Centrale', 'Modernizare și conservare a pieții centrale istorice', 'Craiova', 'Dolj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 600),

-- Galați
('Centru de logistică și transporturi', 'Hub pentru logistică și servicii de transport', 'Galați', 'Galați', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 700),
('Muzeu de metalurgie și industrie', 'Muzeu dedicat industriei metalurgice din Galați', 'Galați', 'Galați', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 580),
('Program de protecție a Dunării', 'Inițiative de curățare și protecție a Dunării', 'Galați', 'Galați', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 650),
('Centru de vela și sporturi acvatice', 'Bază pentru vela și alte sporturi pe apă', 'Galați', 'Galați', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sport', 550),
('Bibliotecă și centru cultural', 'Bibliotecă modernă cu expozițiile și ateliere', 'Galați', 'Galați', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 520),
('Program de reabilitare a zonei portuare', 'Transformarea portului vechi în spațiu cultural și turistic', 'Galați', 'Galați', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 600),

-- Giurgiu
('Centru de graniță și comerț transfrontalier', 'Facilități de comerț și logistică la graniță', 'Giurgiu', 'Giurgiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 550),
('Podul peste Danubiu și turizm', 'Promovarea turismului pe baza conectării cu Bulgaria', 'Giurgiu', 'Giurgiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 600),
('Centru de educație și integrare european', 'Cursuri de limbi străine și educație europeană', 'Giurgiu', 'Giurgiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),
('Program de agricultură și exporturi', 'Suport pentru agricultori și exporturi de produse locale', 'Giurgiu', 'Giurgiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 520),
('Parc de agrement pe Dunăru', 'Zone de recreație și agrement pe litoralul Dunării', 'Giurgiu', 'Giurgiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'recreatie', 450),
('Centru de sănătate și wellness', 'Clinică și centre wellness pentru populație', 'Giurgiu', 'Giurgiu', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 500),

-- Târgu Jiu
('Centru de artă și muzee', 'Muzeu cu lucrări de artă locală și internațională', 'Târgu Jiu', 'Gorj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 600),
('Parc natural și trasee de trekking', 'Piste de hiking și parc natural în munții Gorjului', 'Târgu Jiu', 'Gorj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 580),
('Program de protecție a pădurilor', 'Inițiative de protecție și reîmpădurire', 'Târgu Jiu', 'Gorj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 650),
('Centru de industrie lemn și meșteșuguri', 'Suport pentru industria lemnului și meșteșuguri tradiționale', 'Târgu Jiu', 'Gorj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 520),
('Bibliotecă digitală și centru IT', 'Bibliotecă cu sală de calculatoare și cursuri IT', 'Târgu Jiu', 'Gorj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),
('Festival anual de cultură și tradițiuni', 'Eveniment care promovează cultura și tradițiile locale', 'Târgu Jiu', 'Gorj', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 530),

-- Miercurea Ciuc
('Centru de sănătate și medicina termală', 'Clinică integrativă cu băi termale și wellness', 'Miercurea Ciuc', 'Harghita', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 600),
('Turism montan și schi', 'Piste de schi și facilități pentru turism montan', 'Miercurea Ciuc', 'Harghita', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 700),
('Program de protecție a habitatelor naturale', 'Protecție a faunei și florei locale din muntele Harghita', 'Miercurea Ciuc', 'Harghita', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 580),
('Centru de artă și tradițiuni locale', 'Ateliere de artă și expuneri de meșteșuguri tradiționale', 'Miercurea Ciuc', 'Harghita', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 520),
('Stație de tratare a apei și protecție ambiență', 'Sistem modern de tratare a apei potabile', 'Miercurea Ciuc', 'Harghita', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'infrastructura', 550),
('Program de formare în turism și hotelerie', 'Cursuri de formare pentru industria turismului', 'Miercurea Ciuc', 'Harghita', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),

-- Deva
('Centru de conservare a patrimoniului industrial', 'Muzeu și centru dedicat patrimoniului industrial din Hunedoara', 'Deva', 'Hunedoara', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 580),
('Program de reabilitare a mediului după minerie', 'Curățare și restabilire a ariilor afectate de minerie', 'Deva', 'Hunedoara', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 700),
('Centru de formare și reconversie profesională', 'Cursuri de formare pentru sectoare în creștere', 'Deva', 'Hunedoara', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 600),
('Turism cultural și monumente istorice', 'Promovarea turismului în jurul castlelor și monumentelor locale', 'Deva', 'Hunedoara', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 550),
('Parc natural și piste de biciclete', 'Trasee de biciclete și parc natural în zona rurală', 'Deva', 'Hunedoara', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 520),
('Centru de inovație pentru startup-uri locale', 'Incubator și spațiu de lucru pentru antreprenori', 'Deva', 'Hunedoara', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 480);
