<template>
  <div v-if="loading" class="loading">
    Загрузка...
  </div>
  
  <div v-else-if="error" class="error">
    <p>{{ error }}</p>
    <NuxtLink to="/catalog" class="btn btn-primary">Вернуться к каталогу</NuxtLink>
  </div>
  
  <div v-else class="institution-details">
    <div class="institution-header">
      <div class="container">
        <div class="back-link">
          <NuxtLink to="/catalog">← Назад к каталогу</NuxtLink>
        </div>
        
        <div class="institution-main-info">
          <div class="institution-logo">
            <img :src="institution.logo || '/images/logo-placeholder.png'" :alt="`Логотип ${institution.name}`">
          </div>
          <div class="institution-title">
            <h1>{{ institution.name }}</h1>
            <p class="institution-type">{{ getTypeLabel(institution.type) }}</p>
            <div class="institution-actions">
              <button 
                @click="toggleFavorite"
                class="btn favorite-btn"
                :class="{ 'is-favorite': isFavorite }"
              >
                {{ isFavorite ? 'Убрать из избранного' : 'Добавить в избранное' }}
              </button>
              <a v-if="institution.website" :href="institution.website" target="_blank" class="btn btn-secondary">
                Официальный сайт
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container">
      <div class="institution-content">
        <div class="institution-photos">
          <h2>Фотографии</h2>
          <div v-if="institution.photos && institution.photos.length" class="photos-grid">
            <div 
              v-for="(photo, index) in institution.photos" 
              :key="index" 
              class="photo-item" 
              @click="openPhotoGallery(index)"
            >
              <img :src="photo" alt="Фото учебного заведения">
            </div>
          </div>
          <div v-else class="no-photos">
            <p>Фотографии отсутствуют</p>
          </div>
        </div>
        
        <div class="institution-info-tabs">
          <div class="tabs-header">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              class="tab-button"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              {{ tab.name }}
            </button>
          </div>
          
          <div class="tab-content">
            <!-- Описание -->
            <div v-if="activeTab === 'description'" class="tab-pane">
              <h3>Описание учебного заведения</h3>
              <div class="description">
                {{ institution.description }}
              </div>
            </div>
            
            <!-- Направления обучения -->
            <div v-if="activeTab === 'programs'" class="tab-pane">
              <h3>Направления обучения</h3>
              <div class="programs-table">
                <table>
                  <thead>
                    <tr>
                      <th>Код</th>
                      <th>Направление</th>
                      <th>Срок обучения</th>
                      <th>Стоимость (в год)</th>
                      <th>Необходимые экзамены</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="program in institution.programs" :key="program.code">
                      <td>{{ program.code }}</td>
                      <td>{{ program.name }}</td>
                      <td>{{ program.duration }}</td>
                      <td>{{ program.price ? `${program.price} руб.` : 'По запросу' }}</td>
                      <td>
                        <div v-for="(exam, i) in program.exams" :key="i" class="exam-item">
                          {{ exam.name }} (от {{ exam.minScore }} баллов)
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Контакты и адрес -->
            <div v-if="activeTab === 'contacts'" class="tab-pane">
              <h3>Контактная информация</h3>
              <div class="contacts-info">
                <div class="contact-item">
                  <strong>Адрес:</strong> {{ institution.address }}
                </div>
                <div class="contact-item">
                  <strong>Телефон:</strong> {{ institution.phone }}
                </div>
                <div class="contact-item">
                  <strong>Email:</strong> {{ institution.email }}
                </div>
                <div class="contact-item" v-if="institution.website">
                  <strong>Веб-сайт:</strong> 
                  <a :href="institution.website" target="_blank">{{ institution.website }}</a>
                </div>
              </div>
              
              <div class="location-map">
                <h4>Расположение на карте</h4>
                <div class="map-placeholder">
                  <!-- Здесь будет карта -->
                  <div class="map-container">
                    <div class="map-message">
                      Место для встраивания карты Яндекс или Google Maps
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Отзывы -->
            <div v-if="activeTab === 'reviews'" class="tab-pane">
              <h3>Отзывы</h3>
              <div class="reviews-list">
                <div v-if="institution.reviews && institution.reviews.length > 0">
                  <div v-for="(review, index) in institution.reviews" :key="index" class="review-item">
                    <div class="review-header">
                      <div class="review-author">{{ review.author }}</div>
                      <div class="review-rating">
                        <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }">★</span>
                      </div>
                      <div class="review-date">{{ review.date }}</div>
                    </div>
                    <div class="review-content">{{ review.text }}</div>
                  </div>
                </div>
                <div v-else class="no-reviews">
                  <p>Отзывы отсутствуют</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const institution = ref(null);
const isFavorite = ref(false);

// Определение вкладок
const tabs = [
  { id: 'description', name: 'Описание' },
  { id: 'programs', name: 'Направления обучения' },
  { id: 'contacts', name: 'Контакты' },
  { id: 'reviews', name: 'Отзывы' }
];

const activeTab = ref('description');

// Загрузка данных учебного заведения
onMounted(async () => {
  const id = parseInt(route.params.id);
  
  try {
    // В реальном приложении здесь будет запрос к API
    await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация загрузки
    
    // Демонстрационные данные
    const demoInstitution = {
      id: id,
      name: 'Московский государственный университет',
      type: 'university',
      logo: 'https://via.placeholder.com/150',
      description: 'Московский государственный университет имени М.В. Ломоносова (МГУ) — один из старейших и крупнейших классических университетов России, один из центров отечественной науки и культуры. C 1940 года носит имя Михаила Ломоносова. Великий русский учёный не был основателем университета, но, благодаря его деятельности и научному авторитету, становление университета значительно ускорилось.',
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
    };
    
    institution.value = demoInstitution;
    
    // Проверяем, находится ли учреждение в избранном
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    isFavorite.value = favorites.includes(id);
    
  } catch (e) {
    console.error(e);
    error.value = 'Не удалось загрузить информацию об учебном заведении';
  } finally {
    loading.value = false;
  }
});

// Методы
function getTypeLabel(type) {
  const types = {
    university: 'Университет',
    college: 'Колледж',
    institute: 'Институт'
  };
  return types[type] || type;
}

function toggleFavorite() {
  const id = parseInt(route.params.id);
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  if (isFavorite.value) {
    // Удаляем из избранного
    favorites = favorites.filter(item => item !== id);
  } else {
    // Добавляем в избранное
    favorites.push(id);
  }
  
  localStorage.setItem('favorites', JSON.stringify(favorites));
  isFavorite.value = !isFavorite.value;
}

function openPhotoGallery(index) {
  // Здесь будет реализация галереи
  console.log('Открытие галереи с индекса', index);
}
</script>

<style scoped>
.loading, .error {
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 500px;
}

.error .btn {
  margin-top: 1rem;
}

.institution-header {
  background-color: var(--color-primary);
  color: white;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.back-link {
  margin-bottom: 1.5rem;
}

.back-link a {
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.3s;
}

.back-link a:hover {
  opacity: 0.8;
}

.institution-main-info {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.institution-logo {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.institution-logo img {
  max-width: 100%;
  max-height: 100%;
}

.institution-title h1 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.institution-type {
  color: var(--color-accent);
  font-weight: 600;
  margin-bottom: 1rem;
}

.institution-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.favorite-btn {
  background-color: white;
  color: var(--color-primary);
}

.favorite-btn.is-favorite {
  background-color: var(--color-accent);
  color: white;
}

.institution-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.institution-photos h2, 
.institution-info-tabs h2 {
  margin-top: 0;
  color: var(--color-primary);
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.photo-item {
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.photo-item:hover {
  transform: scale(1.03);
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-photos {
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #666;
}

.tabs-header {
  display: flex;
  border-bottom: 2px solid var(--color-secondary);
  margin-bottom: 1.5rem;
  overflow-x: auto;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-button.active {
  color: var(--color-primary);
  border-bottom: 3px solid var(--color-primary);
  margin-bottom: -2px;
}

.tab-button:hover:not(.active) {
  background-color: rgba(0, 0, 0, 0.05);
}

.tab-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-pane h3 {
  margin-top: 0;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.description {
  line-height: 1.7;
}

.programs-table {
  overflow-x: auto;
}

.programs-table table {
  width: 100%;
  border-collapse: collapse;
}

.programs-table th, 
.programs-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.programs-table th {
  background-color: var(--color-secondary);
  color: var(--color-text);
  font-weight: 600;
}

.programs-table tr:hover td {
  background-color: #f9f9f9;
}

.exam-item {
  margin-bottom: 0.5rem;
}

.exam-item:last-child {
  margin-bottom: 0;
}

.contacts-info {
  margin-bottom: 2rem;
}

.contact-item {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.location-map {
  margin-top: 2rem;
}

.map-container {
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.map-message {
  padding: 2rem;
  color: #666;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #f9f9f9;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.review-author {
  font-weight: bold;
}

.review-rating {
  display: flex;
  gap: 2px;
}

.star {
  color: #ccc;
}

.star.filled {
  color: var(--color-accent);
}

.review-date {
  color: #666;
  margin-left: auto;
}

.review-content {
  line-height: 1.6;
}

.no-reviews {
  text-align: center;
  padding: 2rem;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .institution-main-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .institution-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .institution-actions .btn {
    width: 100%;
  }
  
  .tabs-header {
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .photos-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .tab-content {
    padding: 1.5rem;
  }
}
</style> 