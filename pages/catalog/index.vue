<template>
  <div class="catalog-page">
    <h1 class="page-title">Каталог учебных заведений</h1>
    
    <div class="catalog-controls">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Поиск по названию..." 
          class="search-input" 
        />
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <label>Тип учреждения</label>
          <select v-model="filters.type" class="filter-select">
            <option value="">Все типы</option>
            <option value="university">Университет</option>
            <option value="college">Колледж</option>
            <option value="institute">Институт</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Направление</label>
          <select v-model="filters.direction" class="filter-select">
            <option value="">Все направления</option>
            <option value="tech">Технические науки</option>
            <option value="humanitarian">Гуманитарные науки</option>
            <option value="medical">Медицина</option>
            <option value="economics">Экономика</option>
            <option value="arts">Искусство</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Сортировка</label>
          <select v-model="sortBy" class="filter-select">
            <option value="name">По названию</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>
        
        <button class="btn btn-primary" @click="resetFilters">Сбросить фильтры</button>
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      Загрузка...
    </div>
    
    <div v-else-if="filteredInstitutions.length === 0" class="no-results">
      <p>Ничего не найдено. Попробуйте изменить параметры поиска.</p>
    </div>
    
    <div v-else class="institutions-grid">
      <div 
        v-for="institution in filteredInstitutions" 
        :key="institution.id" 
        class="institution-card"
      >
        <div class="institution-image">
          <img :src="institution.image || '/images/placeholder.jpg'" :alt="institution.name">
        </div>
        <div class="institution-content">
          <h3>{{ institution.name }}</h3>
          <p class="institution-type">{{ getTypeLabel(institution.type) }}</p>
          <p class="institution-description">{{ truncateText(institution.description, 100) }}</p>
          <div class="institution-footer">
            <NuxtLink :to="`/catalog/${institution.id}`" class="btn btn-secondary">Подробнее</NuxtLink>
            <button 
              @click="toggleFavorite(institution.id)"
              class="favorite-btn"
              :class="{ 'is-favorite': isFavorite(institution.id) }"
            >
              &#9733;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Состояние
const loading = ref(true);
const institutions = ref([]);
const searchQuery = ref('');
const filters = ref({
  type: '',
  direction: '',
});
const sortBy = ref('name');
const favorites = ref([]);

// Для примера заполним некоторыми данными
onMounted(async () => {
  // Здесь будет запрос к API
  await new Promise(resolve => setTimeout(resolve, 800)); // Имитация загрузки
  
  institutions.value = [
    {
      id: 1,
      name: 'Московский государственный университет',
      type: 'university',
      directions: ['tech', 'humanitarian'],
      description: 'Один из ведущих вузов России и мира, основан в 1755 году.',
      image: 'https://via.placeholder.com/300x180',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Санкт-Петербургский государственный университет',
      type: 'university',
      directions: ['humanitarian', 'economics'],
      description: 'Один из старейших и крупнейших университетов России, основан в 1724 году.',
      image: 'https://via.placeholder.com/300x180',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Финансовый колледж №1',
      type: 'college',
      directions: ['economics'],
      description: 'Ведущий колледж экономического направления.',
      image: 'https://via.placeholder.com/300x180',
      rating: 4.5
    },
    {
      id: 4,
      name: 'Медицинский институт',
      type: 'institute',
      directions: ['medical'],
      description: 'Специализированное учебное заведение в области медицины.',
      image: 'https://via.placeholder.com/300x180',
      rating: 4.7
    },
    {
      id: 5,
      name: 'Технический колледж',
      type: 'college',
      directions: ['tech'],
      description: 'Подготовка специалистов в области технических наук.',
      image: 'https://via.placeholder.com/300x180',
      rating: 4.3
    },
    {
      id: 6,
      name: 'Институт культуры и искусств',
      type: 'institute',
      directions: ['arts'],
      description: 'Учебное заведение для подготовки профессионалов в сфере искусства.',
      image: 'https://via.placeholder.com/300x180',
      rating: 4.6
    }
  ];
  
  loading.value = false;
});

// Вычисляемые свойства
const filteredInstitutions = computed(() => {
  let result = institutions.value;
  
  // Применение поиска
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }
  
  // Применение фильтров
  if (filters.value.type) {
    result = result.filter(item => item.type === filters.value.type);
  }
  
  if (filters.value.direction) {
    result = result.filter(item => 
      item.directions.includes(filters.value.direction)
    );
  }
  
  // Сортировка
  if (sortBy.value === 'name') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === 'rating') {
    result = [...result].sort((a, b) => b.rating - a.rating);
  }
  
  return result;
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

function truncateText(text, length) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

function resetFilters() {
  searchQuery.value = '';
  filters.value = {
    type: '',
    direction: ''
  };
  sortBy.value = 'name';
}

function toggleFavorite(id) {
  const index = favorites.value.indexOf(id);
  if (index === -1) {
    favorites.value.push(id);
  } else {
    favorites.value.splice(index, 1);
  }
  
  // Можно сохранить в localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
}

function isFavorite(id) {
  return favorites.value.includes(id);
}

// Загрузка избранного из localStorage при монтировании
onMounted(() => {
  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
    try {
      favorites.value = JSON.parse(savedFavorites);
    } catch (e) {
      console.error('Ошибка при загрузке избранного', e);
    }
  }
});
</script>

<style scoped>
.catalog-page {
  padding-bottom: 3rem;
}

.page-title {
  margin-bottom: 2rem;
  text-align: center;
  color: var(--color-primary);
}

.catalog-controls {
  margin-bottom: 2rem;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: flex-end;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.filter-select {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.loading, .no-results {
  text-align: center;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.institutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.institution-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.institution-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.institution-image {
  height: 180px;
  overflow: hidden;
}

.institution-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.institution-content {
  padding: 1.5rem;
}

.institution-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.institution-type {
  color: var(--color-accent);
  font-weight: 500;
  margin-bottom: 1rem;
}

.institution-description {
  margin-bottom: 1.5rem;
  color: #666;
  line-height: 1.5;
}

.institution-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorite-btn {
  background: none;
  border: none;
  color: #ccc;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.favorite-btn.is-favorite {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .institutions-grid {
    grid-template-columns: 1fr;
  }
}
</style> 