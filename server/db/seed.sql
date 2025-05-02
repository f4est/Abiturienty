-- Начальные данные для базы данных Edugate

-- Типы учебных заведений
INSERT INTO institution_types (code, name) VALUES
('university', 'Университет'),
('college', 'Колледж'),
('institute', 'Институт');

-- Направления обучения
INSERT INTO directions (code, name) VALUES
('tech', 'Технические науки'),
('economics', 'Экономика и управление'),
('humanitarian', 'Гуманитарные науки'),
('medical', 'Медицина и здравоохранение'),
('arts', 'Культура и искусство'),
('natural', 'Естественные науки');

-- Тестовый пользователь
INSERT INTO users (name, email, password, avatar) VALUES
('Тестовый пользователь', 'test@edugate.ru', '$2a$10$XZE5JTHBJx.KkOWm8G8qAePBU.xh2Fm/Tz6LkDf.z1gLF9U9ETFnC', '/images/default-avatar.png'); -- пароль: password123

-- Учебные заведения
INSERT INTO institutions (type_id, name, description, address, phone, email, website, image, logo, rating) VALUES
(1, 'Московский государственный университет', 'Один из ведущих вузов России и мира, основан в 1755 году.', 'Россия, г. Москва, Ленинские горы, д. 1', '+7 (495) 939-10-00', 'info@msu.ru', 'https://www.msu.ru', '/images/institutions/msu.jpg', '/images/logos/msu_logo.png', 4.9),
(1, 'Санкт-Петербургский государственный университет', 'Один из старейших и крупнейших университетов России, основан в 1724 году.', 'Россия, г. Санкт-Петербург, Университетская набережная, д. 7–9', '+7 (812) 328-20-00', 'info@spbu.ru', 'https://spbu.ru', '/images/institutions/spbu.jpg', '/images/logos/spbu_logo.png', 4.8),
(3, 'Финансовый колледж №1', 'Ведущий колледж экономического направления.', 'Россия, г. Москва, ул. Финансовая, д. 123', '+7 (495) 123-45-67', 'info@fincollege.ru', 'https://fincollege.ru', '/images/institutions/fincol.jpg', '/images/logos/fincol_logo.png', 4.5),
(2, 'Медицинский институт', 'Специализированное учебное заведение в области медицины.', 'Россия, г. Москва, ул. Медицинская, д. 45', '+7 (495) 987-65-43', 'info@medinst.ru', 'https://medinst.ru', '/images/institutions/medinst.jpg', '/images/logos/medinst_logo.png', 4.7),
(1, 'Технический университет', 'Современный вуз, специализирующийся на подготовке инженеров и IT-специалистов.', 'Россия, г. Москва, ул. Техническая, д. 78', '+7 (495) 111-22-33', 'info@techuni.ru', 'https://techuni.ru', '/images/institutions/techuni.jpg', '/images/logos/techuni_logo.png', 4.6),
(3, 'Институт культуры и искусств', 'Учебное заведение для подготовки профессионалов в сфере искусства.', 'Россия, г. Москва, ул. Искусства, д. 15', '+7 (495) 444-55-66', 'info@artinst.ru', 'https://artinst.ru', '/images/institutions/artinst.jpg', '/images/logos/artinst_logo.png', 4.6),

-- Учебные заведения города Алматы
(1, 'Казахский национальный университет имени аль-Фараби', 'Ведущий университет Казахстана, основан в 1934 году. Предлагает широкий спектр программ обучения по различным направлениям.', 'Казахстан, г. Алматы, пр. аль-Фараби, 71', '+7 (727) 377-33-30', 'info@kaznu.kz', 'https://www.kaznu.kz', '/images/institutions/kaznu.jpg', '/images/logos/kaznu_logo.png', 4.8),
(1, 'Алматинский университет энергетики и связи', 'Технический университет Казахстана, специализирующийся на подготовке специалистов в области энергетики, телекоммуникаций и IT.', 'Казахстан, г. Алматы, ул. Байтурсынова, 126', '+7 (727) 292-03-03', 'info@aues.kz', 'https://www.aues.kz', '/images/institutions/aues.jpg', '/images/logos/aues_logo.png', 4.6),
(2, 'Алматинский колледж телекоммуникаций и машиностроения', 'Среднее профессиональное учебное заведение, готовящее специалистов в области телекоммуникаций и машиностроения.', 'Казахстан, г. Алматы, ул. Толе Би, 237', '+7 (727) 292-54-85', 'info@aktm.kz', 'https://www.aktm.kz', '/images/institutions/aktm.jpg', '/images/logos/aktm_logo.png', 4.4),
(2, 'Алматинский финансово-экономический колледж', 'Колледж экономического направления, готовящий специалистов в области финансов, бухгалтерии и менеджмента.', 'Казахстан, г. Алматы, ул. Гоголя, 120', '+7 (727) 279-97-09', 'info@afek.kz', 'https://afek.kz', '/images/institutions/afek.jpg', '/images/logos/afek_logo.png', 4.3),
(3, 'Казахская национальная академия искусств имени Т.К. Жургенова', 'Ведущее высшее учебное заведение Казахстана в области культуры и искусства.', 'Казахстан, г. Алматы, ул. Панфилова, 127', '+7 (727) 261-46-22', 'info@kaznai.kz', 'https://kaznai.kz', '/images/institutions/kaznai.jpg', '/images/logos/kaznai_logo.png', 4.7),
(3, 'Казахский национальный медицинский университет имени С.Д. Асфендиярова', 'Старейший медицинский вуз Казахстана, основан в 1930 году.', 'Казахстан, г. Алматы, ул. Толе би, 94', '+7 (727) 292-79-37', 'info@kaznmu.kz', 'https://kaznmu.kz', '/images/institutions/kaznmu.jpg', '/images/logos/kaznmu_logo.png', 4.9);

-- Связи учебных заведений с направлениями
INSERT INTO institution_directions (institution_id, direction_id) VALUES
(1, 1), -- МГУ - Технические науки
(1, 3), -- МГУ - Гуманитарные науки
(2, 3), -- СПбГУ - Гуманитарные науки
(2, 2), -- СПбГУ - Экономика и управление
(3, 2), -- Финансовый колледж - Экономика и управление
(4, 4), -- Медицинский институт - Медицина и здравоохранение
(5, 1), -- Технический университет - Технические науки
(6, 5), -- Институт культуры и искусств - Культура и искусство
(7, 1), -- КазНУ - Технические науки
(7, 3), -- КазНУ - Гуманитарные науки
(7, 2), -- КазНУ - Экономика и управление
(7, 6), -- КазНУ - Естественные науки
(8, 1), -- АУЭС - Технические науки
(9, 1), -- Алматинский колледж телекоммуникаций - Технические науки
(10, 2), -- Алматинский финансово-экономический колледж - Экономика и управление
(11, 5), -- Академия искусств - Культура и искусство
(12, 4); -- КазНМУ - Медицина и здравоохранение

-- Фотографии учебных заведений
INSERT INTO institution_photos (institution_id, url) VALUES
(1, '/images/institutions/msu_1.jpg'),
(1, '/images/institutions/msu_2.jpg'),
(1, '/images/institutions/msu_3.jpg'),
(1, '/images/institutions/msu_4.jpg'),
(2, '/images/institutions/spbu_1.jpg'),
(2, '/images/institutions/spbu_2.jpg'),
(2, '/images/institutions/spbu_3.jpg'),
(3, '/images/institutions/fincol_1.jpg'),
(3, '/images/institutions/fincol_2.jpg'),
(4, '/images/institutions/medinst_1.jpg'),
(4, '/images/institutions/medinst_2.jpg'),
(4, '/images/institutions/medinst_3.jpg'),
(5, '/images/institutions/techuni_1.jpg'),
(5, '/images/institutions/techuni_2.jpg'),
(6, '/images/institutions/artinst_1.jpg'),
(6, '/images/institutions/artinst_2.jpg'),
(6, '/images/institutions/artinst_3.jpg'),
-- Фотографии для учебных заведений Алматы
(7, '/images/institutions/kaznu_1.jpg'),
(7, '/images/institutions/kaznu_2.jpg'),
(7, '/images/institutions/kaznu_3.jpg'),
(8, '/images/institutions/aues_1.jpg'),
(8, '/images/institutions/aues_2.jpg'),
(9, '/images/institutions/aktm_1.jpg'),
(9, '/images/institutions/aktm_2.jpg'),
(10, '/images/institutions/afek_1.jpg'),
(10, '/images/institutions/afek_2.jpg'),
(11, '/images/institutions/kaznai_1.jpg'),
(11, '/images/institutions/kaznai_2.jpg'),
(12, '/images/institutions/kaznmu_1.jpg'),
(12, '/images/institutions/kaznmu_2.jpg'),
(12, '/images/institutions/kaznmu_3.jpg');

-- Программы обучения для МГУ
INSERT INTO programs (institution_id, code, name, duration, price) VALUES
(1, '01.03.02', 'Прикладная математика и информатика', '4 года', 320000),
(1, '09.03.01', 'Информатика и вычислительная техника', '4 года', 350000);

-- Экзамены для программы "Прикладная математика и информатика"
INSERT INTO program_exams (program_id, name, min_score) VALUES
(1, 'Математика', 75),
(1, 'Информатика', 70),
(1, 'Русский язык', 65);

-- Экзамены для программы "Информатика и вычислительная техника"
INSERT INTO program_exams (program_id, name, min_score) VALUES
(2, 'Математика', 70),
(2, 'Информатика', 75),
(2, 'Русский язык', 65);

-- Программы обучения для СПбГУ
INSERT INTO programs (institution_id, code, name, duration, price) VALUES
(2, '45.03.01', 'Филология', '4 года', 310000),
(2, '38.03.01', 'Экономика', '4 года', 345000);

-- Экзамены для программы "Филология"
INSERT INTO program_exams (program_id, name, min_score) VALUES
(3, 'Литература', 70),
(3, 'Русский язык', 70),
(3, 'История', 60);

-- Экзамены для программы "Экономика"
INSERT INTO program_exams (program_id, name, min_score) VALUES
(4, 'Математика', 70),
(4, 'Обществознание', 65),
(4, 'Русский язык', 65);

-- Программы обучения для КазНУ
INSERT INTO programs (institution_id, code, name, duration, price) VALUES
(7, '6B06102', 'Информационные системы', '4 года', 1500000),
(7, '6B05101', 'Биология', '4 года', 1400000),
(7, '6B03101', 'Международные отношения', '4 года', 1600000);

-- Экзамены для программы "Информационные системы"
INSERT INTO program_exams (program_id, name, min_score) VALUES
(5, 'Математика', 65),
(5, 'Информатика', 60),
(5, 'Казахский/Русский язык', 60);

-- Экзамены для программы "Биология"
INSERT INTO program_exams (program_id, name, min_score) VALUES
(6, 'Биология', 70),
(6, 'Химия', 65),
(6, 'Казахский/Русский язык', 60);

-- Программы обучения для Алматинского колледжа телекоммуникаций
INSERT INTO programs (institution_id, code, name, duration, price) VALUES
(9, '1304000', 'Вычислительная техника и программное обеспечение', '2 года 10 месяцев', 750000),
(9, '1309000', 'Радиоэлектроника и связь', '2 года 10 месяцев', 780000);

-- Отзывы для МГУ
INSERT INTO reviews (institution_id, author, rating, text) VALUES
(1, 'Алексей', 5, 'Отличный университет с богатой историей и прекрасными преподавателями. Получил здесь достойное образование.'),
(1, 'Мария', 4, 'Хороший университет, но иногда бывают организационные проблемы. В целом довольна обучением и преподавателями.'),
(1, 'Дмитрий', 5, 'Лучший вуз в стране, студенческая жизнь кипит, много возможностей для развития.');

-- Отзывы для СПбГУ
INSERT INTO reviews (institution_id, author, rating, text) VALUES
(2, 'Екатерина', 5, 'Прекрасный университет с богатой историей. Преподаватели - профессионалы своего дела.'),
(2, 'Павел', 4, 'Получил отличное образование. Есть некоторые проблемы с организацией, но в целом все на высшем уровне.');

-- Отзывы для КазНУ
INSERT INTO reviews (institution_id, author, rating, text) VALUES
(7, 'Айдана', 5, 'Лучший университет Казахстана. Получила отличное образование и массу возможностей для развития.'),
(7, 'Тимур', 4, 'Хороший университет с сильным преподавательским составом. Особенно нравится кампус и инфраструктура.'),
(7, 'Алия', 5, 'Прекрасная атмосфера для обучения. Университет дает качественное образование и возможности для стажировок за рубежом.');

-- Отзывы для Алматинского колледжа телекоммуникаций
INSERT INTO reviews (institution_id, author, rating, text) VALUES
(9, 'Руслан', 4, 'Колледж дает практичные навыки, которые реально востребованы на рынке труда. Много практических занятий.'),
(9, 'Дана', 5, 'Отличный преподавательский состав, современное оборудование для обучения. Легко нашла работу после выпуска.');

-- Избранные учебные заведения пользователя
INSERT INTO favorites (user_id, institution_id) VALUES
(1, 1),
(1, 3),
(1, 5),
(1, 7),
(1, 9); 