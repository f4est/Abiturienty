// Тестовые данные для учебных заведений
const institutions = [
  {
    id: 1,
    name: 'Московский государственный университет',
    type: 'university',
    directions: ['tech', 'humanitarian'],
    description: 'Один из ведущих вузов России и мира, основан в 1755 году.',
    image: 'https://via.placeholder.com/300x180',
    logo: 'https://via.placeholder.com/150',
    rating: 4.9,
    address: 'Россия, г. Москва, Ленинские горы, д. 1',
    phone: '+7 (495) 939-10-00',
    email: 'info@msu.ru',
    website: 'https://www.msu.ru',
    photos: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400'
    ],
    programs: [
      {
        code: '09.03.01',
        name: 'Информатика и вычислительная техника',
        duration: '4 года',
        price: 350000,
        exams: [
          { name: 'Математика', minScore: 70 },
          { name: 'Физика', minScore: 65 },
          { name: 'Русский язык', minScore: 60 }
        ]
      },
      {
        code: '01.03.02',
        name: 'Прикладная математика и информатика',
        duration: '4 года',
        price: 370000,
        exams: [
          { name: 'Математика', minScore: 75 },
          { name: 'Информатика', minScore: 70 },
          { name: 'Русский язык', minScore: 60 }
        ]
      },
      {
        code: '38.03.01',
        name: 'Экономика',
        duration: '4 года',
        price: 325000,
        exams: [
          { name: 'Математика', minScore: 70 },
          { name: 'Обществознание', minScore: 65 },
          { name: 'Русский язык', minScore: 60 }
        ]
      }
    ],
    reviews: [
      {
        author: 'Алексей',
        rating: 5,
        date: '15.05.2023',
        text: 'Отличный университет с богатой историей и прекрасными преподавателями. Получил здесь достойное образование.'
      },
      {
        author: 'Мария',
        rating: 4,
        date: '03.02.2023',
        text: 'Хороший университет, но иногда бывают организационные проблемы. В целом довольна обучением и преподавателями.'
      },
      {
        author: 'Дмитрий',
        rating: 5,
        date: '17.11.2022',
        text: 'Лучший вуз в стране, студенческая жизнь кипит, много возможностей для развития.'
      }
    ]
  },
  {
    id: 2,
    name: 'Санкт-Петербургский государственный университет',
    type: 'university',
    directions: ['humanitarian', 'economics'],
    description: 'Один из старейших и крупнейших университетов России, основан в 1724 году.',
    image: 'https://via.placeholder.com/300x180',
    logo: 'https://via.placeholder.com/150',
    rating: 4.8,
    address: 'Россия, г. Санкт-Петербург, Университетская набережная, д. 7–9',
    phone: '+7 (812) 328-20-00',
    email: 'info@spbu.ru',
    website: 'https://spbu.ru',
    photos: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400'
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
        date: '10.06.2023',
        text: 'Прекрасный университет с богатой историей. Преподаватели - профессионалы своего дела.'
      },
      {
        author: 'Павел',
        rating: 4,
        date: '28.01.2023',
        text: 'Получил отличное образование. Есть некоторые проблемы с организацией, но в целом все на высшем уровне.'
      }
    ]
  },
  {
    id: 3,
    name: 'Финансовый колледж №1',
    type: 'college',
    directions: ['economics'],
    description: 'Ведущий колледж экономического направления.',
    image: 'https://via.placeholder.com/300x180',
    logo: 'https://via.placeholder.com/150',
    rating: 4.5,
    address: 'Россия, г. Москва, ул. Финансовая, д. 123',
    phone: '+7 (495) 123-45-67',
    email: 'info@fincollege.ru',
    website: 'https://fincollege.ru',
    photos: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400'
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
        date: '05.03.2023',
        text: 'Отличный колледж, дает качественное образование в финансовой сфере.'
      },
      {
        author: 'Иван',
        rating: 4,
        date: '17.12.2022',
        text: 'Хорошая подготовка, но хотелось бы больше практических занятий.'
      }
    ]
  },
  {
    id: 4,
    name: 'Медицинский институт',
    type: 'institute',
    directions: ['medical'],
    description: 'Специализированное учебное заведение в области медицины.',
    image: 'https://via.placeholder.com/300x180',
    logo: 'https://via.placeholder.com/150',
    rating: 4.7,
    address: 'Россия, г. Москва, ул. Медицинская, д. 45',
    phone: '+7 (495) 987-65-43',
    email: 'info@medinst.ru',
    website: 'https://medinst.ru',
    photos: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400'
    ],
    programs: [
      {
        code: '31.05.01',
        name: 'Лечебное дело',
        duration: '6 лет',
        price: 380000,
        exams: [
          { name: 'Химия', minScore: 70 },
          { name: 'Биология', minScore: 70 },
          { name: 'Русский язык', minScore: 65 }
        ]
      },
      {
        code: '31.05.03',
        name: 'Стоматология',
        duration: '5 лет',
        price: 400000,
        exams: [
          { name: 'Химия', minScore: 75 },
          { name: 'Биология', minScore: 70 },
          { name: 'Русский язык', minScore: 65 }
        ]
      }
    ],
    reviews: [
      {
        author: 'Надежда',
        rating: 5,
        date: '08.04.2023',
        text: 'Сильнейший институт с прекрасной базой для обучения медицинским специальностям.'
      },
      {
        author: 'Михаил',
        rating: 4,
        date: '23.11.2022',
        text: 'Отличные преподаватели, но небольшие проблемы с организацией практики.'
      }
    ]
  },
  {
    id: 5,
    name: 'Технический колледж',
    type: 'college',
    directions: ['tech'],
    description: 'Подготовка специалистов в области технических наук.',
    image: 'https://via.placeholder.com/300x180',
    logo: 'https://via.placeholder.com/150',
    rating: 4.3,
    address: 'Россия, г. Москва, ул. Техническая, д. 78',
    phone: '+7 (495) 111-22-33',
    email: 'info@techcollege.ru',
    website: 'https://techcollege.ru',
    photos: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400'
    ],
    programs: [
      {
        code: '09.02.07',
        name: 'Информационные системы и программирование',
        duration: '3 года 10 месяцев',
        price: 135000,
        exams: [
          { name: 'Математика', minScore: 65 },
          { name: 'Русский язык', minScore: 60 }
        ]
      },
      {
        code: '15.02.10',
        name: 'Мехатроника и мобильная робототехника',
        duration: '3 года 10 месяцев',
        price: 140000,
        exams: [
          { name: 'Математика', minScore: 65 },
          { name: 'Физика', minScore: 60 },
          { name: 'Русский язык', minScore: 60 }
        ]
      }
    ],
    reviews: [
      {
        author: 'Андрей',
        rating: 4,
        date: '19.02.2023',
        text: 'Хороший колледж с современным оборудованием и актуальными программами обучения.'
      },
      {
        author: 'Елена',
        rating: 5,
        date: '07.12.2022',
        text: 'Отличная подготовка к работе в IT-сфере, преподаватели с опытом реальной работы в индустрии.'
      }
    ]
  },
  {
    id: 6,
    name: 'Институт культуры и искусств',
    type: 'institute',
    directions: ['arts'],
    description: 'Учебное заведение для подготовки профессионалов в сфере искусства.',
    image: 'https://via.placeholder.com/300x180',
    logo: 'https://via.placeholder.com/150',
    rating: 4.6,
    address: 'Россия, г. Москва, ул. Искусства, д. 15',
    phone: '+7 (495) 444-55-66',
    email: 'info@artinst.ru',
    website: 'https://artinst.ru',
    photos: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400'
    ],
    programs: [
      {
        code: '51.03.02',
        name: 'Народная художественная культура',
        duration: '4 года',
        price: 290000,
        exams: [
          { name: 'Творческое испытание', minScore: 75 },
          { name: 'Литература', minScore: 65 },
          { name: 'Русский язык', minScore: 60 }
        ]
      },
      {
        code: '52.03.01',
        name: 'Хореографическое искусство',
        duration: '4 года',
        price: 310000,
        exams: [
          { name: 'Творческое испытание', minScore: 80 },
          { name: 'Литература', minScore: 60 },
          { name: 'Русский язык', minScore: 60 }
        ]
      }
    ],
    reviews: [
      {
        author: 'Анастасия',
        rating: 5,
        date: '15.03.2023',
        text: 'Прекрасный институт для развития творческих способностей. Преподаватели - известные деятели искусства.'
      },
      {
        author: 'Сергей',
        rating: 4,
        date: '10.01.2023',
        text: 'Отличная творческая атмосфера, но хотелось бы больше информации о трудоустройстве.'
      }
    ]
  }
];

// Endpoint для получения списка всех учебных заведений
export default defineEventHandler((event) => {
  return institutions;
}); 