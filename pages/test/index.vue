<template>
  <div class="test-page">
    <h1 class="page-title">Тест на профориентацию</h1>
    
    <div v-if="testState === 'intro'" class="test-intro">
      <div class="intro-card">
        <h2>Узнайте свои склонности и выберите подходящую специальность</h2>
        <p>
          Этот тест поможет вам определить ваши профессиональные склонности и подскажет, 
          какие направления обучения могут вам подойти.
        </p>
        <p>
          Тест состоит из {{ totalQuestions }} вопросов и займет около 10-15 минут. 
          Отвечайте честно, ориентируясь на свои предпочтения.
        </p>
        <div class="test-actions">
          <button @click="startTest" class="btn btn-primary">Начать тест</button>
        </div>
      </div>
    </div>
    
    <div v-else-if="testState === 'questions'" class="test-questions">
      <div class="question-card">
        <div class="question-progress">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }"
            ></div>
          </div>
          <div class="progress-text">
            Вопрос {{ currentQuestionIndex }} из {{ totalQuestions }}
          </div>
        </div>
        
        <div class="question-content">
          <h2 class="question-text">{{ currentQuestion.text }}</h2>
          
          <div class="answers-list">
            <div 
              v-for="(answer, index) in currentQuestion.answers" 
              :key="index"
              class="answer-item"
              @click="selectAnswer(index)"
              :class="{ 'selected': selectedAnswer === index }"
            >
              {{ answer.text }}
            </div>
          </div>
        </div>
        
        <div class="question-actions">
          <button 
            v-if="currentQuestionIndex > 1" 
            @click="prevQuestion" 
            class="btn btn-secondary"
          >
            Назад
          </button>
          <button 
            @click="nextQuestion" 
            class="btn btn-primary"
            :disabled="selectedAnswer === null"
          >
            {{ isLastQuestion ? 'Завершить тест' : 'Далее' }}
          </button>
        </div>
      </div>
    </div>
    
    <div v-else-if="testState === 'results'" class="test-results">
      <div class="results-card">
        <h2>Результаты теста</h2>
        
        <div class="results-summary">
          <p>На основе ваших ответов мы определили следующие профессиональные склонности:</p>
          
          <div class="results-categories">
            <div 
              v-for="(category, index) in sortedResults" 
              :key="index"
              class="category-result"
            >
              <div class="category-name">{{ category.name }}</div>
              <div class="category-score-bar">
                <div 
                  class="category-score-fill" 
                  :style="{ width: `${category.score}%`, backgroundColor: getCategoryColor(index) }"
                ></div>
              </div>
              <div class="category-score-value">{{ category.score }}%</div>
            </div>
          </div>
        </div>
        
        <div class="recommendation">
          <h3>Рекомендуемые направления обучения</h3>
          <p>Основываясь на ваших результатах, мы рекомендуем рассмотреть следующие направления:</p>
          
          <div class="recommended-programs">
            <div 
              v-for="(program, index) in recommendedPrograms" 
              :key="index"
              class="program-card"
            >
              <h4>{{ program.name }}</h4>
              <p>{{ program.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="institution-recommendation">
          <h3>Учебные заведения с этими направлениями</h3>
          <div class="institutions-list">
            <div 
              v-for="(institution, index) in recommendedInstitutions" 
              :key="index"
              class="institution-item"
            >
              <h4>{{ institution.name }}</h4>
              <p>{{ institution.programs.join(', ') }}</p>
              <NuxtLink :to="`/catalog/${institution.id}`" class="btn btn-secondary">
                Подробнее
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <div class="results-actions">
          <button @click="saveResults" class="btn btn-primary">Сохранить результаты</button>
          <button @click="restartTest" class="btn btn-secondary">Пройти тест заново</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Состояние теста
const testState = ref('intro'); // 'intro', 'questions', 'results'
const currentQuestionIndex = ref(1);
const selectedAnswer = ref(null);
const userAnswers = ref([]);
const testResults = ref(null);

// Вопросы теста (в реальном приложении должны загружаться с сервера)
const questions = ref([
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
]);

const totalQuestions = computed(() => questions.value.length);
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value - 1]);
const isLastQuestion = computed(() => currentQuestionIndex.value === totalQuestions.value);

// Начать тест
function startTest() {
  testState.value = 'questions';
  currentQuestionIndex.value = 1;
  userAnswers.value = Array(totalQuestions.value).fill(null);
  selectedAnswer.value = null;
}

// Выбрать ответ
function selectAnswer(index) {
  selectedAnswer.value = index;
}

// Перейти к следующему вопросу
function nextQuestion() {
  if (selectedAnswer.value !== null) {
    // Сохраняем ответ
    userAnswers.value[currentQuestionIndex.value - 1] = selectedAnswer.value;
    
    if (isLastQuestion.value) {
      // Завершаем тест и показываем результаты
      calculateResults();
      testState.value = 'results';
    } else {
      // Переходим к следующему вопросу
      currentQuestionIndex.value++;
      selectedAnswer.value = userAnswers.value[currentQuestionIndex.value - 1];
    }
  }
}

// Вернуться к предыдущему вопросу
function prevQuestion() {
  if (currentQuestionIndex.value > 1) {
    currentQuestionIndex.value--;
    selectedAnswer.value = userAnswers.value[currentQuestionIndex.value - 1];
  }
}

// Рассчет результатов теста
function calculateResults() {
  // Категории профессиональных склонностей
  const categories = {
    technical: { name: 'Технические науки', score: 0 },
    humanitarian: { name: 'Гуманитарные науки', score: 0 },
    natural: { name: 'Естественные науки', score: 0 },
    social: { name: 'Социальная сфера', score: 0 },
    economic: { name: 'Экономика и управление', score: 0 },
    artistic: { name: 'Искусство и творчество', score: 0 }
  };
  
  // Подсчитываем баллы по категориям
  userAnswers.value.forEach((answerIndex, questionIndex) => {
    if (answerIndex !== null) {
      const question = questions.value[questionIndex];
      const answer = question.answers[answerIndex];
      categories[answer.category].score += 10; // 10 баллов за каждый ответ
    }
  });
  
  // Сохраняем результаты
  testResults.value = Object.values(categories);
  
  // Находим рекомендуемые направления обучения
  generateRecommendations();
}

// Сортированные результаты
const sortedResults = computed(() => {
  if (!testResults.value) return [];
  return [...testResults.value].sort((a, b) => b.score - a.score);
});

// Получение цвета для категории
function getCategoryColor(index) {
  const colors = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-secondary)',
    '#5a9b6b',
    '#9b5a8c',
    '#9b7a5a'
  ];
  return colors[index % colors.length];
}

// Рекомендуемые программы обучения
const recommendedPrograms = ref([]);

// Рекомендуемые учебные заведения
const recommendedInstitutions = ref([]);

// Генерация рекомендаций
function generateRecommendations() {
  // В реальном приложении программы и учреждения должны приходить с сервера
  // на основе результатов теста, ниже - пример реализации
  
  const topCategory = sortedResults.value[0];
  
  // Примеры программ в зависимости от категории
  const programsByCategory = {
    technical: [
      { name: 'Информатика и вычислительная техника', description: 'Разработка программного обеспечения, системное администрирование, проектирование информационных систем.' },
      { name: 'Прикладная механика', description: 'Проектирование и эксплуатация технических устройств, разработка робототехнических систем.' }
    ],
    humanitarian: [
      { name: 'Лингвистика', description: 'Изучение языков, межкультурная коммуникация, перевод и переводоведение.' },
      { name: 'История', description: 'Изучение исторических процессов, архивоведение, музейное дело.' }
    ],
    natural: [
      { name: 'Биология', description: 'Изучение живой природы, экологический мониторинг, биотехнологии.' },
      { name: 'Химия', description: 'Исследование веществ и их свойств, разработка новых материалов, анализ и контроль качества.' }
    ],
    social: [
      { name: 'Психология', description: 'Изучение психики человека, психологическое консультирование, социально-психологическая поддержка.' },
      { name: 'Педагогика', description: 'Обучение и воспитание, методическая работа, образовательные технологии.' }
    ],
    economic: [
      { name: 'Экономика', description: 'Анализ экономических процессов, бухгалтерский учет, финансовый менеджмент.' },
      { name: 'Менеджмент', description: 'Управление организациями, бизнес-планирование, управление проектами.' }
    ],
    artistic: [
      { name: 'Дизайн', description: 'Проектирование предметно-пространственной среды, графический дизайн, дизайн интерфейсов.' },
      { name: 'Режиссура', description: 'Создание аудиовизуальных произведений, постановка спектаклей, организация мероприятий.' }
    ]
  };
  
  // Пример учебных заведений
  const institutions = [
    { id: 1, name: 'Московский государственный университет', programs: ['Информатика и вычислительная техника', 'Экономика', 'История'] },
    { id: 2, name: 'Российский технологический университет', programs: ['Прикладная механика', 'Химия', 'Дизайн'] },
    { id: 3, name: 'Финансовый университет', programs: ['Экономика', 'Менеджмент', 'Информатика и вычислительная техника'] },
    { id: 4, name: 'Психологический институт', programs: ['Психология', 'Педагогика'] },
    { id: 5, name: 'Академия художеств', programs: ['Дизайн', 'Режиссура'] }
  ];
  
  // Получаем рекомендуемые программы для топовой категории
  recommendedPrograms.value = programsByCategory[topCategory.name.toLowerCase()] || [];
  
  // Ищем учебные заведения, предлагающие рекомендуемые программы
  const programNames = recommendedPrograms.value.map(p => p.name);
  recommendedInstitutions.value = institutions.filter(inst => 
    inst.programs.some(p => programNames.includes(p))
  );
}

// Сохранение результатов в профиль пользователя
function saveResults() {
  // В реальном приложении отправка на сервер
  
  // Сохраняем в localStorage для примера
  localStorage.setItem('testResults', JSON.stringify(testResults.value));
  
  // Перенаправляем в личный кабинет
  router.push('/profile');
}

// Перезапустить тест
function restartTest() {
  testState.value = 'intro';
  userAnswers.value = [];
  testResults.value = null;
}

// Загрузка сохраненных результатов при монтировании
onMounted(() => {
  // Можно проверить, проходил ли пользователь тест ранее
  const savedResults = localStorage.getItem('testResults');
  if (savedResults) {
    // Тут можно обработать сценарий с существующими результатами
  }
});
</script>

<style scoped>
.test-page {
  padding-bottom: 3rem;
}

.page-title {
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 2rem;
}

.test-intro, .test-questions, .test-results {
  max-width: 800px;
  margin: 0 auto;
}

.intro-card, .question-card, .results-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.intro-card h2 {
  color: var(--color-primary);
  margin-top: 0;
}

.test-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

/* Стили для вопросов */
.question-progress {
  margin-bottom: 2rem;
}

.progress-bar {
  height: 8px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: right;
  font-size: 0.9rem;
  color: #666;
}

.question-text {
  color: var(--color-primary);
  margin-bottom: 2rem;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.answer-item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.answer-item:hover {
  border-color: var(--color-primary);
  background-color: rgba(105, 135, 169, 0.05);
}

.answer-item.selected {
  border-color: var(--color-primary);
  background-color: rgba(105, 135, 169, 0.1);
  box-shadow: 0 0 0 2px rgba(105, 135, 169, 0.2);
}

.question-actions {
  display: flex;
  justify-content: space-between;
}

/* Стили для результатов */
.results-summary {
  margin-bottom: 2rem;
}

.results-categories {
  margin-top: 1.5rem;
}

.category-result {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.category-name {
  width: 200px;
  font-weight: 500;
}

.category-score-bar {
  flex: 1;
  height: 24px;
  background-color: #eee;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 1rem;
}

.category-score-fill {
  height: 100%;
  transition: width 0.5s ease;
}

.category-score-value {
  width: 50px;
  text-align: right;
  font-weight: 500;
}

.recommendation, .institution-recommendation {
  margin-top: 2.5rem;
}

.recommended-programs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

.program-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
}

.program-card h4 {
  color: var(--color-primary);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.institutions-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

.institution-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
}

.institution-item h4 {
  color: var(--color-primary);
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.institution-item p {
  margin-bottom: 1rem;
}

.results-actions {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .intro-card, .question-card, .results-card {
    padding: 1.5rem;
  }
  
  .question-actions {
    flex-direction: column-reverse;
    gap: 1rem;
  }
  
  .question-actions .btn {
    width: 100%;
  }
  
  .recommended-programs, .institutions-list {
    grid-template-columns: 1fr;
  }
  
  .category-result {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }
  
  .category-name {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .category-score-bar {
    width: 100%;
    margin: 0 0 0.5rem 0;
  }
  
  .category-score-value {
    width: 100%;
    text-align: left;
  }
  
  .results-actions {
    flex-direction: column;
  }
  
  .results-actions .btn {
    width: 100%;
  }
}
</style> 