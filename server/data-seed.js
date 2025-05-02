// Скрипт для заполнения базы данных тестовыми данными
import db from './db.js';

// Очистка существующих данных (кроме справочников)
const clearData = () => {
  db.exec('DELETE FROM institution_photos');
  db.exec('DELETE FROM institution_directions');
  db.exec('DELETE FROM exams');
  db.exec('DELETE FROM programs');
  db.exec('DELETE FROM reviews');
  db.exec('DELETE FROM institutions');
  db.exec('DELETE FROM favorites');
  db.exec('DELETE FROM test_results');
  db.exec('DELETE FROM users');
};

// Заполнение тестовыми данными
const seedData = () => {
  // Добавляем тестовых пользователей
  const insertUser = db.prepare(`
    INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)
  `);
  
  const users = [
    { name: 'Алексей', email: 'alex@example.com', password: 'password123', avatar: '/images/avatar1.jpg' },
    { name: 'Мария', email: 'maria@example.com', password: 'password123', avatar: '/images/avatar2.jpg' }
  ];
  
  users.forEach(user => {
    insertUser.run(user.name, user.email, user.password, user.avatar);
  });
  
  // Получаем ID типов учебных заведений
  const typeIds = {};
  const types = db.prepare('SELECT id, code FROM institution_types').all();
  types.forEach(type => {
    typeIds[type.code] = type.id;
  });
  
  // Получаем ID направлений обучения
  const directionIds = {};
  const directions = db.prepare('SELECT id, code FROM directions').all();
  directions.forEach(direction => {
    directionIds[direction.code] = direction.id;
  });
  
  // Добавляем учебные заведения
  const insertInstitution = db.prepare(`
    INSERT INTO institutions 
    (name, type_id, description, image, logo, rating, address, phone, email, website)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const institutions = [
    {
      name: 'Московский государственный университет',
      type: 'university',
      description: 'Один из ведущих вузов России и мира, основан в 1755 году.',
      image: '/images/msu.jpg',
      logo: '/images/msu-logo.png',
      rating: 4.9,
      address: 'Россия, г. Москва, Ленинские горы, д. 1',
      phone: '+7 (495) 939-10-00',
      email: 'info@msu.ru',
      website: 'https://www.msu.ru',
      directions: ['tech', 'humanitarian'],
      photos: [
        '/images/msu-1.jpg',
        '/images/msu-2.jpg',
        '/images/msu-3.jpg'
      ],
      programs: [
        {
          code: '01.03.02',
          name: 'Прикладная математика и информатика',
          duration: '4 года',
          price: 380000,
          exams: [
            { name: 'Математика', minScore: 75 },
            { name: 'Информатика', minScore: 70 },
            { name: 'Русский язык', minScore: 65 }
          ]
        },
        {
          code: '45.03.01',
          name: 'Филология',
          duration: '4 года',
          price: 320000,
          exams: [
            { name: 'Литература', minScore: 70 },
            { name: 'Русский язык', minScore: 75 },
            { name: 'История', minScore: 65 }
          ]
        }
      ],
      reviews: [
        {
          author: 'Алексей',
          rating: 5,
          date: '2023-05-15',
          text: 'Отличный университет с богатой историей и прекрасными преподавателями.'
        },
        {
          author: 'Мария',
          rating: 4,
          date: '2023-02-03',
          text: 'Хороший университет, но иногда бывают организационные проблемы.'
        }
      ]
    },
    {
      name: 'Санкт-Петербургский государственный университет',
      type: 'university',
      description: 'Один из старейших и крупнейших университетов России, основан в 1724 году.',
      image: '/images/spbu.jpg',
      logo: '/images/spbu-logo.png',
      rating: 4.8,
      address: 'Россия, г. Санкт-Петербург, Университетская набережная, д. 7–9',
      phone: '+7 (812) 328-20-00',
      email: 'info@spbu.ru',
      website: 'https://spbu.ru',
      directions: ['humanitarian', 'economics'],
      photos: [
        '/images/spbu-1.jpg',
        '/images/spbu-2.jpg',
        '/images/spbu-3.jpg'
      ],
      programs: [
        {
          code: '45.03.01',
          name: 'Филология',
          duration: '4 года',
          price: 310000,
          exams: [
            { name: 'Литература', minScore: 70 },
            { name: 'Русский язык', minScore: 70 },
            { name: 'История', minScore: 60 }
          ]
        },
        {
          code: '38.03.01',
          name: 'Экономика',
          duration: '4 года',
          price: 345000,
          exams: [
            { name: 'Математика', minScore: 70 },
            { name: 'Обществознание', minScore: 65 },
            { name: 'Русский язык', minScore: 65 }
          ]
        }
      ],
      reviews: [
        {
          author: 'Екатерина',
          rating: 5,
          date: '2023-06-10',
          text: 'Прекрасный университет с богатой историей. Преподаватели - профессионалы своего дела.'
        },
        {
          author: 'Павел',
          rating: 4,
          date: '2023-01-28',
          text: 'Получил отличное образование. Есть некоторые проблемы с организацией, но в целом все на высшем уровне.'
        }
      ]
    },
    {
      name: 'Финансовый колледж №1',
      type: 'college',
      description: 'Ведущий колледж экономического направления.',
      image: '/images/fin-college.jpg',
      logo: '/images/fin-college-logo.png',
      rating: 4.5,
      address: 'Россия, г. Москва, ул. Финансовая, д. 123',
      phone: '+7 (495) 123-45-67',
      email: 'info@fincollege.ru',
      website: 'https://fincollege.ru',
      directions: ['economics'],
      photos: [
        '/images/fin-college-1.jpg',
        '/images/fin-college-2.jpg'
      ],
      programs: [
        {
          code: '38.02.01',
          name: 'Экономика и бухгалтерский учет',
          duration: '2 года 10 месяцев',
          price: 120000,
          exams: [
            { name: 'Русский язык', minScore: 60 },
            { name: 'Математика', minScore: 60 }
          ]
        },
        {
          code: '38.02.06',
          name: 'Финансы',
          duration: '2 года 10 месяцев',
          price: 125000,
          exams: [
            { name: 'Русский язык', minScore: 60 },
            { name: 'Математика', minScore: 65 }
          ]
        }
      ],
      reviews: [
        {
          author: 'Ольга',
          rating: 5,
          date: '2023-03-05',
          text: 'Отличный колледж, дает качественное образование в финансовой сфере.'
        },
        {
          author: 'Иван',
          rating: 4,
          date: '2022-12-17',
          text: 'Хорошая подготовка, но хотелось бы больше практических занятий.'
        }
      ]
    }
  ];
  
  // Добавляем учебные заведения и связанные данные
  institutions.forEach(inst => {
    // Добавляем основную информацию об учебном заведении
    const result = insertInstitution.run(
      inst.name,
      typeIds[inst.type],
      inst.description,
      inst.image,
      inst.logo,
      inst.rating,
      inst.address,
      inst.phone,
      inst.email,
      inst.website
    );
    
    const institutionId = result.lastInsertRowid;
    
    // Добавляем направления обучения
    const insertDirection = db.prepare(`
      INSERT INTO institution_directions (institution_id, direction_id) VALUES (?, ?)
    `);
    
    inst.directions.forEach(dir => {
      insertDirection.run(institutionId, directionIds[dir]);
    });
    
    // Добавляем фотографии
    const insertPhoto = db.prepare(`
      INSERT INTO institution_photos (institution_id, photo_url) VALUES (?, ?)
    `);
    
    inst.photos.forEach(photo => {
      insertPhoto.run(institutionId, photo);
    });
    
    // Добавляем программы обучения
    const insertProgram = db.prepare(`
      INSERT INTO programs (institution_id, code, name, duration, price) VALUES (?, ?, ?, ?, ?)
    `);
    
    inst.programs.forEach(program => {
      const programResult = insertProgram.run(
        institutionId,
        program.code,
        program.name,
        program.duration,
        program.price
      );
      
      const programId = programResult.lastInsertRowid;
      
      // Добавляем экзамены
      const insertExam = db.prepare(`
        INSERT INTO exams (program_id, name, min_score) VALUES (?, ?, ?)
      `);
      
      program.exams.forEach(exam => {
        insertExam.run(programId, exam.name, exam.minScore);
      });
    });
    
    // Добавляем отзывы
    const insertReview = db.prepare(`
      INSERT INTO reviews (institution_id, author, rating, text, date) VALUES (?, ?, ?, ?, ?)
    `);
    
    inst.reviews.forEach(review => {
      insertReview.run(
        institutionId,
        review.author,
        review.rating,
        review.text,
        review.date
      );
    });
  });
  
  // Добавляем избранные учебные заведения для пользователей
  const insertFavorite = db.prepare(`
    INSERT INTO favorites (user_id, institution_id) VALUES (?, ?)
  `);
  
  // Первый пользователь добавил в избранное МГУ и Финансовый колледж
  insertFavorite.run(1, 1);
  insertFavorite.run(1, 3);
  
  // Второй пользователь добавил в избранное СПбГУ
  insertFavorite.run(2, 2);
  
  // Добавляем результаты тестов для пользователей
  const insertTestResult = db.prepare(`
    INSERT INTO test_results 
    (user_id, technical, humanitarian, natural, social, economic, artistic)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  // Результаты теста для первого пользователя
  insertTestResult.run(1, 80, 60, 50, 70, 90, 40);
  
  // Результаты теста для второго пользователя
  insertTestResult.run(2, 50, 85, 60, 75, 70, 65);
  
  console.log('База данных успешно заполнена тестовыми данными');
};

try {
  // Очищаем данные
  clearData();
  // Заполняем тестовыми данными
  seedData();
  console.log('Скрипт успешно выполнен');
} catch (error) {
  console.error('Ошибка при заполнении базы данных:', error);
} 