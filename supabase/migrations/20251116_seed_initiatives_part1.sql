-- Seed initiatives for each Romanian town
-- This script creates 6 initiatives per town

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
-- București
('Îmbunătățirea sistemului de transport public', 'Modernizarea și extinderea rețelei de metrou și a autobuzelor cu accent pe liniile periferice', 'București', 'București', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'transport', 1000),
('Creșterea spațiilor verzi în piețele publice', 'Plantarea de copaci și crearea de parcuri în zone aglomerate din centrul orașului', 'București', 'București', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 800),
('Programme de educație digitală pentru seniori', 'Cursuri gratuite de informatică și folosire a internetului în biblioteci și centre civice', 'București', 'București', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 600),
('Renovarea și revitalizarea clădirilor istorice', 'Restabilirea aspectului original al unor clădiri din secolul XIX-XX din centrul historic', 'București', 'București', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 750),
('Crearea de piste de biciclete sigure', 'Construirea unei rețele interconectate de piste dedicate pentru bicicliști', 'București', 'București', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mobilitate', 900),
('Program de colectare și reciclare a deșeurilor', 'Implementarea unui sistem modern de separare și reciclare a deșeurilor în toate cartierele', 'București', 'București', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 1100),

-- Alba Iulia
('Reabilitarea fortului medieval', 'Restaurarea și conservarea fortificațiilor istorice din Alba Iulia', 'Alba Iulia', 'Alba', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 500),
('Dezvoltare turism local', 'Crearea de rute turistice și promovarea atracțiilor locale', 'Alba Iulia', 'Alba', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 450),
('Modernizare iluminat public', 'Înlocuirea sistemului de iluminat tradițional cu LED-uri eficiente energetic', 'Alba Iulia', 'Alba', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'infrastructura', 600),
('Curs gratuit de învățare meșteșuguri tradiționale', 'Transmiterea cunoștințelor despre meșteșugurile tradiționale către tineri', 'Alba Iulia', 'Alba', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 400),
('Amenajare parc comunitar', 'Crearea unui parc destinat activităților comunitare și recreației', 'Alba Iulia', 'Alba', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 550),
('Program de sprijin pentru antreprenori locali', 'Ateliere de business și acces la microfinanțare pentru micii business-uri', 'Alba Iulia', 'Alba', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 480),

-- Arad
('Construire centru sportiv multifuncțional', 'Edificiu modern pentru activități sportive și recreație cu bazin și sălă de fitness', 'Arad', 'Arad', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sport', 700),
('Biblioteca digitală a orașului', 'Colecție online de cărți, documente și resurse educaționale accesibile gratuit', 'Arad', 'Arad', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 550),
('Proiect verde - păduri urbane', 'Plantarea de copaci în diferite zone ale orașului pentru a crea păduri urbane', 'Arad', 'Arad', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 650),
('Restaurare edificii cu valoare arhitecturală', 'Conservarea și restaurarea clădirilor cu importanță istorică din Arad', 'Arad', 'Arad', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 600),
('Program de mentorat pentru tineri', 'Conexiuni între profesioniști experimentați și tineri doritori să invețe', 'Arad', 'Arad', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 500),
('Centru comunitar multifuncțional', 'Spațiu destinat activităților comunitare, cursuri și programe sociale', 'Arad', 'Arad', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'socializare', 580),

-- Pitești
('Reabilitare centru istoric', 'Renovarea și modernizarea zonei centrale a orașului cu respectarea arhitecturii tradiționale', 'Pitești', 'Argeș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 620),
('Program transport școlar gratuit', 'Asigurarea transportului gratuit pentru elevii care locuiesc departe de instituțiile de învățământ', 'Pitești', 'Argeș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 700),
('Parc de aventură pentru copii', 'Crearea unui parc tematic cu activități și jocuri pentru copii de diferite vârste', 'Pitești', 'Argeș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'recreatie', 550),
('Sensibilizare privind accesibilitate pentru persoane cu dizabilități', 'Adaptarea spațiilor publice și instituțiilor pentru a fi accesibile tuturor', 'Pitești', 'Argeș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'social', 480),
('Festival anual de cultură și arte', 'Organizarea unui eveniment anual care promovează artele și tradițiile locale', 'Pitești', 'Argeș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 520),
('Stație de încărcare pentru vehicule electrice', 'Instalarea unei rețele de stații de încărcare pentru mașinile electrice', 'Pitești', 'Argeș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mobilitate', 600),

-- Bacău
('Centru de inovație și startup-uri', 'Spațiu dedicat inovației, cu birou și suport pentru antreprenori tineri', 'Bacău', 'Bacău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 550),
('Reabilitare râul Bistrița', 'Curățare și protejare a riului cu recrearea habitatelor naturale', 'Bacău', 'Bacău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 650),
('Cursuri de prevenție a crizei de sănătate mintală', 'Program educativ asupra sănătății mentale și suport psihologic gratuit', 'Bacău', 'Bacău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 480),
('Modernizare rețea de apă și canalizare', 'Înlocuirea conductelor vechi cu sistem modern de distribuție a apei', 'Bacău', 'Bacău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'infrastructura', 800),
('Grădini comunale urbane', 'Crearea de grădini comunitare unde localnicii pot cultiva legume și plante', 'Bacău', 'Bacău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 420),
('Teatru comunitar și ateliere teatrale', 'Crearea unui teatru comunitar și programe de educație dramatică', 'Bacău', 'Bacău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 500),

-- Oradea
('Dezvoltare turism termal și wellness', 'Promovarea și modernizarea facilitaților termale existente pentru atrage turiști', 'Oradea', 'Bihor', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 700),
('Pista de rulare și ciclism în natură', 'Construirea unor piste dedicate pentru alergare și ciclism în zone verzi', 'Oradea', 'Bihor', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sport', 600),
('Bibliotecă de reciclare - economy circulară', 'Bibliotecă unde oamenii pot schimba și recicla obiecte vechi', 'Oradea', 'Bihor', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 520),
('Muzeu interactiv al istoriei locale', 'Muzeu cu expozițiilor și activități interactive despre istoria Oradiei', 'Oradea', 'Bihor', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 580),
('Program de integrare a migranților și refugiaților', 'Cursuri de limbă română și orientare pentru migranți în societatea locală', 'Oradea', 'Bihor', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'social', 450),
('Sistem de iluminat inteligent cu senzori', 'Instalare de sistemul de iluminat care se ajustează automat în funcție de nevoie', 'Oradea', 'Bihor', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'infrastructura', 630),

-- Bistrița
('Centru de educație pentru abilități digitale', 'Cursuri și workshop-uri pentru a-și îmbunătăți abilități IT și online', 'Bistrița', 'Bistrița-Năsăud', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 500),
('Reabilitare fortificațiile medievale', 'Restaurarea și conservarea fortificațiilor din Bistrița', 'Bistrița', 'Bistrița-Năsăud', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 550),
('Dezvoltare turism pe bicicletă', 'Trasee de bicicletă în natură și promovarea turismului activ', 'Bistrița', 'Bistrița-Năsăud', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 480),
('Centru de zi pentru vârstnici', 'Spațiu unde vârstnicii pot participa la activități sociale și recreative', 'Bistrița', 'Bistrița-Năsăud', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'social', 420),
('Parc naturist și cășuțe din lemn', 'Amenajare parc cu facilități eco-friendly și cășuțe de lemn pentru turism', 'Bistrița', 'Bistrița-Năsăud', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 530),
('Program de apicultura urbană și miere locală', 'Suport și formare pentru producători de miere în zona urbană', 'Bistrița', 'Bistrița-Năsăud', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 460),

-- Botoșani
('Centru de sănătate comunitară', 'Clinică multidisciplinară cu servicii de sănătate accesibile pentru toți localnicii', 'Botoșani', 'Botoșani', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 650),
('Program de agroturism și producători locali', 'Promovarea produselor locale și dezvoltarea turismului agricol', 'Botoșani', 'Botoșani', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 520),
('Biblioteca municipală modernă', 'Reconstrucția și modernizarea bibliotecii cu facilități digitale', 'Botoșani', 'Botoșani', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 580),
('Sistem de colectare și tratare apelor uzate', 'Modernizarea infrastructurii de apă uzată și protecția mediului', 'Botoșani', 'Botoșani', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 720),
('Festival anual de vin și tradițiii gastronomice', 'Eveniment ce promovează vinurile și mâncărurile tradiționale din regiune', 'Botoșani', 'Botoșani', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 490),
('Program de prevenție a abandonului școlar', 'Suport și burse pentru copiii care riscă să abandoneaza școala', 'Botoșani', 'Botoșani', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 610),

-- Brașov
('Expansiune rețea transport urban', 'Adăugarea de linii de autobuz și tramvai în zone aglomerate', 'Brașov', 'Brașov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'transport', 800),
('Dezvoltare turism montan și schi', 'Îmbunătățirea facilities-urilor de schi și promovarea turismului montan', 'Brașov', 'Brașov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 850),
('Reabilitare cartiere dezavantajate', 'Program de renovare și îmbunătățire a condițiilor de viață în cartiere marginale', 'Brașov', 'Brașov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'social', 750),
('Centru de formare profesională', 'Instituție de formare în meserii cerute pe piața muncii', 'Brașov', 'Brașov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 700),
('Program de combatere a poluării aerului', 'Inițiative de reducere a poluării și promovarea mobilității verzi', 'Brașov', 'Brașov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 680),
('Parc de aventură din copaci', 'Construirea unui parc cu activități în copaci pentru copii și adulți', 'Brașov', 'Brașov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'recreatie', 620),

-- Brăila
('Dezvoltare port turistic și ecoturism pe Danubiu', 'Modernizarea portului pentru turism și promovarea ecoturismului pe Danubiu', 'Brăila', 'Brăila', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 700),
('Muzeu interactiv al peștilor și faunei Dunării', 'Muzeu dedicat biodiversității și ecosistemului Dunării', 'Brăila', 'Brăila', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 580),
('Program de reabilitare a nivelului apei din Dunăru', 'Inițiative de protecție a habitatelor din Dunăru', 'Brăila', 'Brăila', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 650),
('Centru de inovație pentru pescari și agricultori', 'Program de suport și inovație pentru sectorul agricol și pescăresc', 'Brăila', 'Brăila', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 500),
('Restaurare și revitalizare a portului vechi', 'Conservarea și transformarea zonei portuare vechi în spațiu cultural și turistic', 'Brăila', 'Brăila', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 620),
('Program de educație nautică și siguranță pe apă', 'Cursuri de înot și siguranță pe apă pentru copii și adulți', 'Brăila', 'Brăila', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),

-- Buzău
('Centru de interpretare a geologiei și paleontologiei', 'Muzeu cu expozițiile interactive despre istoria geologică a regiunii', 'Buzău', 'Buzău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 520),
('Dezvoltare turism în Nemuri și peisaje naturale', 'Trasee de trekking și promovarea turismului în natura în Buzău', 'Buzău', 'Buzău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 600),
('Program de protecție a poluării râului Buzău', 'Curățare și protecție a râului cu amenajări ecologice', 'Buzău', 'Buzău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 580),
('Centru de formație meșteșuguri tradiționale', 'Transmiterea de cunoștințe despre meșteșuguri locale tradiționale', 'Buzău', 'Buzău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 450),
('Stație de tratare a deșeurilor recicabile', 'Instalare de facilități moderne de reciclare și gestionare a deșeurilor', 'Buzău', 'Buzău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 640),
('Program de revitalizare a centrul istoric', 'Renovare și modernizare a clădirilor istorice din centrul orașului', 'Buzău', 'Buzău', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 560),

-- Reșița
('Centru de reconversie profesională și reintegrare socială', 'Program de formare și suport pentru lucrători din sectoare în declin', 'Reșița', 'Caraș-Severin', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'social', 580),
('Muzeu al industriei și patrimoniului industrial', 'Muzeu dedicat istoriei industriale a Reșiței și transformării acesteia', 'Reșița', 'Caraș-Severin', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 500),
('Parc industrial și zone de meșteșuguri', 'Crearea de spații pentru artizani și mici producători locali', 'Reșița', 'Caraș-Severin', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 520),
('Dezvoltare turism de aventură', 'Trasee de trekking, escaladă și alte activități în peisajele din Caraș-Severin', 'Reșița', 'Caraș-Severin', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 600),
('Program de reabilitare a mediului după activitățile industriale', 'Curățarea și restabilirea ariilor afectate de poluare industrială', 'Reșița', 'Caraș-Severin', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 720),
('Centru cultural și de convivialitate', 'Spațiu pentru organizarea de evenimente culturale și activități comunitare', 'Reșița', 'Caraș-Severin', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 480);
