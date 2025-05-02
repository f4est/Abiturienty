<template>
  <div class="profile-page">
    <h1 class="page-title">Личный кабинет</h1>
    
    <div v-if="!isAuthenticated" class="not-authenticated">
      <div class="auth-card">
        <h2>Войдите в систему</h2>
        <p>Для доступа к личному кабинету необходимо авторизоваться.</p>
        
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="loginForm.email" 
              required
              class="form-control"
            />
          </div>
          
          <div class="form-group">
            <label for="password">Пароль</label>
            <input 
              type="password" 
              id="password" 
              v-model="loginForm.password" 
              required
              class="form-control"
            />
          </div>
          
          <div class="auth-actions">
            <button type="submit" class="btn btn-primary">Войти</button>
            <button type="button" @click="showRegisterForm = true" class="btn btn-secondary">
              Регистрация
            </button>
          </div>
        </form>
        
        <div v-if="authError" class="auth-error">
          {{ authError }}
        </div>
        
        <!-- Форма регистрации (показывается по кнопке) -->
        <div v-if="showRegisterForm" class="register-form-container">
          <h2>Регистрация</h2>
          <form @submit.prevent="register" class="register-form">
            <div class="form-group">
              <label for="reg-name">Имя</label>
              <input 
                type="text" 
                id="reg-name" 
                v-model="registerForm.name" 
                required
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label for="reg-email">Email</label>
              <input 
                type="email" 
                id="reg-email" 
                v-model="registerForm.email" 
                required
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label for="reg-password">Пароль</label>
              <input 
                type="password" 
                id="reg-password" 
                v-model="registerForm.password" 
                required
                class="form-control"
              />
            </div>
            
            <div class="auth-actions">
              <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
              <button 
                type="button" 
                @click="showRegisterForm = false" 
                class="btn btn-secondary"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <div v-else class="profile-content">
      <div class="profile-sidebar">
        <div class="profile-info-card">
          <div class="profile-avatar">
            <img :src="user.avatar || '/images/default-avatar.png'" :alt="user.name">
            <button @click="editAvatar" class="edit-avatar-btn">
              <span>Изменить</span>
            </button>
          </div>
          
          <div class="profile-info">
            <h2>{{ user.name }}</h2>
            <p class="profile-email">{{ user.email }}</p>
            <button @click="editProfile" class="btn btn-secondary btn-sm">
              Редактировать профиль
            </button>
            <button @click="logout" class="btn btn-outline logout-btn">
              Выйти
            </button>
          </div>
        </div>
        
        <div class="profile-navigation">
          <button 
            @click="activeTab = 'saved'" 
            class="tab-button" 
            :class="{ active: activeTab === 'saved' }"
          >
            Избранные учебные заведения
          </button>
          <button 
            @click="activeTab = 'test-results'" 
            class="tab-button" 
            :class="{ active: activeTab === 'test-results' }"
          >
            Результаты теста
          </button>
          <button 
            @click="activeTab = 'settings'" 
            class="tab-button" 
            :class="{ active: activeTab === 'settings' }"
          >
            Настройки
          </button>
        </div>
      </div>
      
      <div class="profile-main-content">
        <!-- Избранные учебные заведения -->
        <div v-if="activeTab === 'saved'" class="tab-content">
          <h2>Избранные учебные заведения</h2>
          
          <div v-if="favoriteInstitutions.length === 0" class="empty-state">
            <p>У вас пока нет сохраненных учебных заведений</p>
            <NuxtLink to="/catalog" class="btn btn-primary">
              Перейти в каталог
            </NuxtLink>
          </div>
          
          <div v-else class="favorites-list">
            <div 
              v-for="institution in favoriteInstitutions" 
              :key="institution.id"
              class="favorite-item"
            >
              <div class="favorite-item-image">
                <img :src="institution.image || '/images/placeholder.jpg'" :alt="institution.name">
              </div>
              <div class="favorite-item-content">
                <h3>{{ institution.name }}</h3>
                <p class="favorite-item-type">{{ getTypeLabel(institution.type) }}</p>
                <p class="favorite-item-description">
                  {{ truncateText(institution.description, 120) }}
                </p>
                <div class="favorite-item-actions">
                  <NuxtLink :to="`/catalog/${institution.id}`" class="btn btn-secondary btn-sm">
                    Подробнее
                  </NuxtLink>
                  <button 
                    @click="removeFromFavorites(institution.id)" 
                    class="btn btn-outline btn-sm"
                  >
                    Удалить из избранного
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Результаты теста -->
        <div v-if="activeTab === 'test-results'" class="tab-content">
          <h2>Результаты теста профориентации</h2>
          
          <div v-if="!testResults" class="empty-state">
            <p>Вы еще не прошли тест профориентации</p>
            <NuxtLink to="/test" class="btn btn-primary">
              Пройти тест
            </NuxtLink>
          </div>
          
          <div v-else class="test-results-container">
            <div class="results-date">
              Тест пройден: {{ formatDate(testResults.date) }}
            </div>
            
            <div class="results-categories">
              <div 
                v-for="(category, index) in testResults.categories" 
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
            
            <div class="recommended-directions">
              <h3>Рекомендуемые направления</h3>
              <ul class="directions-list">
                <li 
                  v-for="(direction, index) in testResults.recommendations" 
                  :key="index"
                >
                  {{ direction }}
                </li>
              </ul>
            </div>
            
            <div class="test-actions">
              <NuxtLink to="/test" class="btn btn-primary">
                Пройти тест заново
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Настройки профиля -->
        <div v-if="activeTab === 'settings'" class="tab-content">
          <h2>Настройки профиля</h2>
          
          <form @submit.prevent="saveSettings" class="settings-form">
            <div class="form-group">
              <label for="setting-name">Имя</label>
              <input 
                type="text" 
                id="setting-name" 
                v-model="settingsForm.name" 
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label for="setting-email">Email</label>
              <input 
                type="email" 
                id="setting-email" 
                v-model="settingsForm.email" 
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label for="setting-password">Новый пароль (оставьте пустым, если не хотите менять)</label>
              <input 
                type="password" 
                id="setting-password" 
                v-model="settingsForm.password" 
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label>Уведомления</label>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="settingsForm.notifications.news" 
                  />
                  Получать новости о новых учебных заведениях
                </label>
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="settingsForm.notifications.updates" 
                  />
                  Уведомления об обновлениях избранных учебных заведений
                </label>
              </div>
            </div>
            
            <button type="submit" class="btn btn-primary">Сохранить настройки</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Состояние аутентификации
const isAuthenticated = ref(false);
const user = ref(null);
const authError = ref(null);
const showRegisterForm = ref(false);

// Активная вкладка в профиле
const activeTab = ref('saved');

// Формы
const loginForm = ref({
  email: '',
  password: ''
});

const registerForm = ref({
  name: '',
  email: '',
  password: ''
});

const settingsForm = ref({
  name: '',
  email: '',
  password: '',
  notifications: {
    news: true,
    updates: true
  }
});

// Избранные учебные заведения
const favoriteInstitutions = ref([]);

// Результаты теста
const testResults = ref(null);

// Методы для авторизации
function login() {
  // В реальном приложении здесь был бы API запрос
  
  // Для демонстрации просто авторизуем пользователя
  isAuthenticated.value = true;
  user.value = {
    id: 1,
    name: 'Иван Иванов',
    email: loginForm.value.email,
    avatar: 'https://via.placeholder.com/150'
  };
  
  // Сохраняем в localStorage для демонстрации
  localStorage.setItem('user', JSON.stringify(user.value));
  
  // Загружаем данные профиля
  loadProfileData();
}

function register() {
  // В реальном приложении здесь был бы API запрос
  
  // Для демонстрации просто авторизуем пользователя
  isAuthenticated.value = true;
  user.value = {
    id: 1,
    name: registerForm.value.name,
    email: registerForm.value.email,
    avatar: 'https://via.placeholder.com/150'
  };
  
  // Сохраняем в localStorage для демонстрации
  localStorage.setItem('user', JSON.stringify(user.value));
  
  // Сбрасываем форму и скрываем ее
  showRegisterForm.value = false;
  
  // Загружаем данные профиля
  loadProfileData();
}

function logout() {
  isAuthenticated.value = false;
  user.value = null;
  
  // Очищаем localStorage
  localStorage.removeItem('user');
}

// Методы для избранных учебных заведений
function loadFavoriteInstitutions() {
  // В реальном приложении здесь был бы API запрос
  
  // Получаем идентификаторы избранных учреждений из localStorage
  const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  // Демонстрационные данные
  const demoInstitutions = [
    {
      id: 1,
      name: 'Московский государственный университет',
      type: 'university',
      description: 'Один из ведущих вузов России и мира, основан в 1755 году.',
      image: 'https://via.placeholder.com/300x180'
    },
    {
      id: 2,
      name: 'Санкт-Петербургский государственный университет',
      type: 'university',
      description: 'Один из старейших и крупнейших университетов России, основан в 1724 году.',
      image: 'https://via.placeholder.com/300x180'
    },
    {
      id: 3,
      name: 'Финансовый колледж №1',
      type: 'college',
      description: 'Ведущий колледж экономического направления.',
      image: 'https://via.placeholder.com/300x180'
    }
  ];
  
  // Фильтруем только избранные
  favoriteInstitutions.value = demoInstitutions.filter(inst => favoriteIds.includes(inst.id));
}

function removeFromFavorites(id) {
  // Получаем текущие избранные
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  // Удаляем учреждение из избранного
  favorites = favorites.filter(item => item !== id);
  
  // Сохраняем обновленный список
  localStorage.setItem('favorites', JSON.stringify(favorites));
  
  // Обновляем UI
  favoriteInstitutions.value = favoriteInstitutions.value.filter(item => item.id !== id);
}

// Методы для результатов теста
function loadTestResults() {
  // В реальном приложении здесь был бы API запрос
  
  // Проверяем, есть ли сохраненные результаты
  const savedResults = localStorage.getItem('testResults');
  
  if (savedResults) {
    const categories = JSON.parse(savedResults);
    
    // Формируем объект с результатами
    testResults.value = {
      date: new Date().toISOString(), // в реальном приложении здесь была бы дата прохождения
      categories: categories,
      recommendations: ['Информатика и вычислительная техника', 'Экономика', 'Прикладная математика']
    };
  }
}

// Вспомогательные методы
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric'
  });
}

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

// Методы для настроек профиля
function loadProfileSettings() {
  if (user.value) {
    settingsForm.value.name = user.value.name;
    settingsForm.value.email = user.value.email;
    settingsForm.value.password = '';
    
    // Загружаем настройки уведомлений из localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      settingsForm.value.notifications = settings.notifications || {
        news: true,
        updates: true
      };
    }
  }
}

function saveSettings() {
  // Обновляем данные пользователя
  if (user.value) {
    user.value.name = settingsForm.value.name;
    user.value.email = settingsForm.value.email;
    
    // В реальном приложении здесь был бы API запрос для обновления данных
    
    // Сохраняем обновленные данные в localStorage
    localStorage.setItem('user', JSON.stringify(user.value));
    
    // Сохраняем настройки уведомлений
    localStorage.setItem('userSettings', JSON.stringify({
      notifications: settingsForm.value.notifications
    }));
    
    // Сбрасываем пароль в форме
    settingsForm.value.password = '';
    
    alert('Настройки успешно сохранены');
  }
}

// Методы для аватара и профиля
function editAvatar() {
  // В реальном приложении здесь был бы диалог выбора файла
  alert('Функция загрузки аватара будет доступна в следующей версии');
}

function editProfile() {
  // Переключаемся на вкладку настроек
  activeTab.value = 'settings';
}

// Загрузка данных профиля
function loadProfileData() {
  // Загружаем избранные учебные заведения
  loadFavoriteInstitutions();
  
  // Загружаем результаты теста
  loadTestResults();
  
  // Загружаем настройки профиля
  loadProfileSettings();
}

// При монтировании компонента
onMounted(() => {
  // Проверяем, авторизован ли пользователь
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    user.value = JSON.parse(savedUser);
    isAuthenticated.value = true;
    
    // Загружаем данные профиля
    loadProfileData();
  }
});
</script>

<style scoped>
.profile-page {
  padding-bottom: 3rem;
}

.page-title {
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 2rem;
}

.not-authenticated {
  max-width: 500px;
  margin: 0 auto;
}

.auth-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.auth-card h2 {
  color: var(--color-primary);
  margin-top: 0;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.auth-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.auth-error {
  margin-top: 1rem;
  color: #e74c3c;
  font-size: 0.9rem;
}

.register-form-container {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.profile-content {
  display: flex;
  gap: 2rem;
}

.profile-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.profile-info-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.profile-avatar {
  position: relative;
  width: 100%;
  height: 200px;
  background-color: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
}

.edit-avatar-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-avatar-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.profile-info {
  padding: 1.5rem;
}

.profile-info h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.profile-email {
  color: #666;
  margin-bottom: 1rem;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
}

.btn-outline {
  background: none;
  border: 1px solid #ddd;
  color: #666;
}

.btn-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.logout-btn {
  margin-top: 0.5rem;
  width: 100%;
}

.profile-navigation {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-button {
  padding: 1rem 1.5rem;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-button:last-child {
  border-bottom: none;
}

.tab-button.active {
  background-color: var(--color-primary);
  color: white;
}

.tab-button:hover:not(.active) {
  background-color: #f9f9f9;
}

.profile-main-content {
  flex: 1;
}

.tab-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tab-content h2 {
  margin-top: 0;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
}

.empty-state p {
  margin-bottom: 1.5rem;
  color: #666;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.favorite-item {
  display: flex;
  gap: 1.5rem;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.favorite-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.favorite-item-image {
  width: 160px;
  flex-shrink: 0;
}

.favorite-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-item-content {
  padding: 1.5rem 1.5rem 1.5rem 0;
  flex: 1;
}

.favorite-item-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

.favorite-item-type {
  color: var(--color-accent);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.favorite-item-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.favorite-item-actions {
  display: flex;
  gap: 1rem;
}

.test-results-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
}

.results-date {
  margin-bottom: 1.5rem;
  color: #666;
  font-style: italic;
}

.results-categories {
  margin-bottom: 2rem;
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

.recommended-directions h3 {
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.directions-list {
  list-style-type: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.directions-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.directions-list li:last-child {
  border-bottom: none;
}

.test-actions {
  margin-top: 2rem;
  text-align: center;
}

.settings-form {
  max-width: 600px;
}

.checkbox-group {
  margin-top: 0.5rem;
}

.checkbox-label {
  display: block;
  margin-bottom: 0.8rem;
  cursor: pointer;
}

.checkbox-label input {
  margin-right: 0.5rem;
}

@media (max-width: 768px) {
  .profile-content {
    flex-direction: column;
  }
  
  .profile-sidebar {
    width: 100%;
  }
  
  .profile-navigation {
    margin-bottom: 1.5rem;
  }
  
  .favorite-item {
    flex-direction: column;
  }
  
  .favorite-item-image {
    width: 100%;
    height: 180px;
  }
  
  .favorite-item-content {
    padding: 1.5rem;
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
}
</style> 