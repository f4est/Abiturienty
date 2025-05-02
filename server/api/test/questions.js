// Тестовые данные для вопросов профориентационного теста
const questions = [
  {
    id: 1,
    text: 'Что вам больше нравится делать в свободное время?',
    answers: [
      { text: 'Читать книги, писать или изучать что-то новое', category: 'humanitarian' },
      { text: 'Решать головоломки, логические задачи', category: 'technical' },
      { text: 'Заниматься творчеством (рисование, музыка и т.д.)', category: 'artistic' },
      { text: 'Общаться с людьми, помогать им', category: 'social' },
      { text: 'Анализировать данные, составлять планы', category: 'economic' }
    ]
  },
  {
    id: 2,
    text: 'Какие предметы в школе вам нравились больше всего?',
    answers: [
      { text: 'Математика, физика, информатика', category: 'technical' },
      { text: 'Литература, история, языки', category: 'humanitarian' },
      { text: 'Биология, химия, экология', category: 'natural' },
      { text: 'Экономика, обществознание', category: 'economic' },
      { text: 'ИЗО, музыка, труд', category: 'artistic' }
    ]
  },
  {
    id: 3,
    text: 'Какие задачи вам легче всего решать?',
    answers: [
      { text: 'Технические, требующие точных расчетов', category: 'technical' },
      { text: 'Творческие, где нужно что-то придумать', category: 'artistic' },
      { text: 'Связанные с анализом информации и фактов', category: 'humanitarian' },
      { text: 'Помогающие другим людям', category: 'social' },
      { text: 'Организационные, требующие планирования', category: 'economic' }
    ]
  },
  {
    id: 4,
    text: 'Что из перечисленного вам было бы интереснее делать на работе?',
    answers: [
      { text: 'Работать с техникой, механизмами, программами', category: 'technical' },
      { text: 'Заниматься творчеством, создавать что-то новое', category: 'artistic' },
      { text: 'Исследовать природу, проводить опыты', category: 'natural' },
      { text: 'Помогать людям, лечить, обучать', category: 'social' },
      { text: 'Руководить, организовывать процессы', category: 'economic' }
    ]
  },
  {
    id: 5,
    text: 'Какая рабочая среда вам кажется наиболее комфортной?',
    answers: [
      { text: 'Лаборатория, мастерская, техническое помещение', category: 'technical' },
      { text: 'Творческая студия, театр, музей', category: 'artistic' },
      { text: 'Природа, ферма, теплица', category: 'natural' },
      { text: 'Социальное учреждение, школа, больница', category: 'social' },
      { text: 'Офис, бизнес-центр, банк', category: 'economic' }
    ]
  },
  {
    id: 6,
    text: 'Что из перечисленного вы считаете своей сильной стороной?',
    answers: [
      { text: 'Логическое мышление и аналитические способности', category: 'technical' },
      { text: 'Творческое мышление и воображение', category: 'artistic' },
      { text: 'Коммуникабельность и умение понимать людей', category: 'social' },
      { text: 'Организованность и лидерские качества', category: 'economic' },
      { text: 'Усидчивость и внимание к деталям', category: 'natural' }
    ]
  },
  {
    id: 7,
    text: 'Какая профессиональная цель вам ближе?',
    answers: [
      { text: 'Создавать новые технологии и решения', category: 'technical' },
      { text: 'Помогать людям и менять их жизнь к лучшему', category: 'social' },
      { text: 'Исследовать мир и делать открытия', category: 'natural' },
      { text: 'Создавать красоту и искусство', category: 'artistic' },
      { text: 'Добиться финансового успеха и признания', category: 'economic' }
    ]
  },
  {
    id: 8,
    text: 'Какие книги или фильмы вас больше увлекают?',
    answers: [
      { text: 'Научная фантастика, научно-популярная литература', category: 'technical' },
      { text: 'Классическая литература, исторические романы', category: 'humanitarian' },
      { text: 'Книги о людях, психологии, саморазвитии', category: 'social' },
      { text: 'Биографии успешных бизнесменов, бизнес-литература', category: 'economic' },
      { text: 'Книги об искусстве, художественные альбомы', category: 'artistic' }
    ]
  },
  {
    id: 9,
    text: 'Чем бы вы хотели заниматься через 10 лет?',
    answers: [
      { text: 'Разрабатывать новые технологии или продукты', category: 'technical' },
      { text: 'Заниматься творчеством, искусством', category: 'artistic' },
      { text: 'Помогать людям, работать в социальной сфере', category: 'social' },
      { text: 'Руководить компанией, вести свой бизнес', category: 'economic' },
      { text: 'Исследовать, делать научные открытия', category: 'natural' }
    ]
  },
  {
    id: 10,
    text: 'Какие у вас отношения с техникой и технологиями?',
    answers: [
      { text: 'Отлично разбираюсь, люблю новые гаджеты', category: 'technical' },
      { text: 'Использую технику для творчества', category: 'artistic' },
      { text: 'Использую как инструмент для общения', category: 'social' },
      { text: 'Использую для работы и решения задач', category: 'economic' },
      { text: 'Интересуюсь, как всё устроено', category: 'natural' }
    ]
  }
];

export default defineEventHandler((event) => {
  return questions;
}); 