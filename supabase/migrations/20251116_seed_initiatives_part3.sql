-- Seed initiatives - Part 3

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
-- Slobozia
('Centru de agricultura și producție locală', 'Sprijin pentru agricultori și procesatori de alimente din Ialomița', 'Slobozia', 'Ialomița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 550),
('Parc și zona verdes', 'Creare de spații verzi și parc central pentru recreație', 'Slobozia', 'Ialomița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 500),
('Centru de sănătate comunitară', 'Clinic cu servicii medicale preventive și curative', 'Slobozia', 'Ialomița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 520),
('Program de digitalizare a comunității', 'Cursuri de IT și digitalizare pentru populație', 'Slobozia', 'Ialomița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),
('Bibliotecă publică modernă', 'Bibliotecă cu spații digitale și activități culturale', 'Slobozia', 'Ialomița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 450),
('Program de turism și agro-turism', 'Promovarea turismului agricol și rural în regiune', 'Slobozia', 'Ialomița', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 530),

-- Iași
('Hub de inovație și tech', 'Incubator pentru startup-uri și companii tech', 'Iași', 'Iași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 850),
('Centru de cultura și arte', 'Galerie și sală de expozicii pentru artiști locali', 'Iași', 'Iași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 800),
('Modernizare sistem transport public', 'Autobuze electrice și expansion de rețea', 'Iași', 'Iași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'transport', 850),
('Universitate și centru de cercetare', 'Extensie și modernizare a facilitaților universitare', 'Iași', 'Iași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 900),
('Parc urban multifuncțional', 'Parc mare cu zone de recreație și culturi', 'Iași', 'Iași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'recreatie', 750),
('Program de incluziune socială', 'Inițiative de suport pentru persoane vulnerabile', 'Iași', 'Iași', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'social', 700),

-- Buftea
('Centru de comerț și servicii', 'Zone comerciale moderne în apropierea Bucureștiului', 'Buftea', 'Ilfov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 600),
('Parc industrial și zone de meșteșuguri', 'Spații pentru producători și antreprenori locali', 'Buftea', 'Ilfov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 550),
('Centru de educație și formare', 'Curse de formare și programe educative', 'Buftea', 'Ilfov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 500),
('Parc și zone verzi', 'Crearea de spații verzi și parc de agrement', 'Buftea', 'Ilfov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 480),
('Centru de sănătate și wellness', 'Clinică și centre wellness moderne', 'Buftea', 'Ilfov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 520),
('Program de transport și mobilitate', 'Îmbunătățiri de transport și piste de biciclete', 'Buftea', 'Ilfov', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mobilitate', 550),

-- Baia Mare
('Centru de conservare a patrimoniului cultural', 'Muzeu dedicat culturii și tradițiilor maramureșene', 'Baia Mare', 'Maramureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 650),
('Program de turism și agro-turism', 'Promovarea turismului tradițional în Maramureș', 'Baia Mare', 'Maramureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 700),
('Centru de protecție a mediului', 'Inițiative de protecție a pădurilor și habitatelor naturale', 'Baia Mare', 'Maramureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 600),
('Program de suport pentru meșteșuguri tradiționale', 'Ateliere și cursuri de meșteșuguri maramureșene', 'Baia Mare', 'Maramureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 550),
('Centru de educație și formare profesională', 'Cursuri de formare în sectoare în creștere', 'Baia Mare', 'Maramureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 580),
('Parc natural și trasee de hiking', 'Piste de trekking și parc natural în munții Maramureșului', 'Baia Mare', 'Maramureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 620),

-- Drobeta-Turnu Severin
('Centru de turism și arqueologie', 'Muzeu dedicat Daciei și culturii antice din regiune', 'Drobeta-Turnu Severin', 'Mehedinți', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 600),
('Parc de agrement pe Dunăru', 'Zone de recreație și agrement pe litoralul Dunării', 'Drobeta-Turnu Severin', 'Mehedinți', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 550),
('Program de turism activ', 'Trasee de trekking și activități outdoor', 'Drobeta-Turnu Severin', 'Mehedinți', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 520),
('Centru de sănătate comunitară', 'Clinic cu servicii medicale și preventive', 'Drobeta-Turnu Severin', 'Mehedinți', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 480),
('Bibliotecă digitală și centru cultural', 'Bibliotecă modernă cu programe culturale', 'Drobeta-Turnu Severin', 'Mehedinți', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 450),
('Program de dezvoltare economică locală', 'Suport pentru antreprenori și micii producători', 'Drobeta-Turnu Severin', 'Mehedinți', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 500),

-- Târgu Mureș
('Hub de inovație și business', 'Incubator pentru startup-uri și companii mici', 'Târgu Mureș', 'Mureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 750),
('Centru de arte și cultură', 'Teatru, cinema și galerie pentru artiști locali', 'Târgu Mureș', 'Mureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 700),
('Parc natural și piste de biciclete', 'Trasee de biciclete și parc natural în jur', 'Târgu Mureș', 'Mureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 650),
('Program de educație și formare profesională', 'Cursuri și programe de formare în sectoare noi', 'Târgu Mureș', 'Mureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 650),
('Centru de sănătate și wellness', 'Clinic și centre wellness pentru populație', 'Târgu Mureș', 'Mureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 600),
('Modernizare transport public', 'Autobuze electrice și expansion de rețea', 'Târgu Mureș', 'Mureș', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'transport', 700),

-- Piatra Neamț
('Centru de turism montan și schi', 'Piste de schi și facilități pentru turism montan', 'Piatra Neamț', 'Neamț', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 700),
('Muzeu de industrie și patrimoniu', 'Muzeu dedicat industriei textile și patrimoniului local', 'Piatra Neamț', 'Neamț', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 600),
('Program de protecție a mediului', 'Inițiative de reîmpădurire și protecție a naturii', 'Piatra Neamț', 'Neamț', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 620),
('Centru de formare și educație', 'Cursuri și programe de formare profesională', 'Piatra Neamț', 'Neamț', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 550),
('Parc de agrement și recreație', 'Parc cu zone de joacă și activități recreative', 'Piatra Neamț', 'Neamț', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'recreatie', 500),
('Centru de sănătate comunitară', 'Clinic cu servicii medicale și preventive', 'Piatra Neamț', 'Neamț', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 520),

-- Slatina
('Program de agricultură și industrie alimentară', 'Suport pentru agricultori și producători din Olt', 'Slatina', 'Olt', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 600),
('Centru de culturi și tradițiuni', 'Muzeu și ateliere pentru tradițiile locale', 'Slatina', 'Olt', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 550),
('Parc și zone verzi', 'Crearea de spații verzi și parc central', 'Slatina', 'Olt', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 500),
('Centru de educație și formare', 'Cursuri de formare în sectoare în creștere', 'Slatina', 'Olt', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 480),
('Bibliotecă publică modernă', 'Bibliotecă cu facilități digitale și culturale', 'Slatina', 'Olt', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 450),
('Program de turism rural', 'Promovarea turismului agricol și rural în regiune', 'Slatina', 'Olt', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'turism', 520),

-- Ploiești
('Centru de petrol și energetică', 'Muzeu și centru dedicat industriei petrolului din Ploiești', 'Ploiești', 'Prahova', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'cultura', 650),
('Program de reconversie și reabilitare industrială', 'Inițiative de reconversie a zonelor industriale', 'Ploiești', 'Prahova', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'economie', 700),
('Modernizare transport public', 'Autobuze electrice și expansion de rețea', 'Ploiești', 'Prahova', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'transport', 750),
('Centru de sănătate și wellness', 'Clinic și centre wellness pentru populație', 'Ploiești', 'Prahova', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'sanatate', 600),
('Parc și zone verzi', 'Crearea de spații verzi și parc urban', 'Ploiești', 'Prahova', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'mediu', 620),
('Program de educație și formare profesională', 'Cursuri de formare în sectoare noi', 'Ploiești', 'Prahova', 'active', '00000000-0000-0000-0000-000000000001', NOW(), NOW(), 'educatie', 680);
