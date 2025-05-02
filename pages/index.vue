<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <h1>Добро пожаловать на АбитуриентПро!</h1>
        <p>Ваш надежный помощник в выборе учебного заведения</p>
        <div class="hero-buttons">
          <NuxtLink to="/catalog" class="btn btn-primary">Перейти к каталогу</NuxtLink>
          <NuxtLink to="/test" class="btn btn-accent">Пройти тест</NuxtLink>
        </div>
      </div>
      
      <div class="hero-characters">
        <!-- Здесь будут две фигуры персонажей -->
        <div class="character character-left">
          <!-- Место для первого персонажа -->
          <div class="character-placeholder">
            <span>Персонаж 1</span>
          </div>
        </div>
        <div class="character character-right">
          <!-- Место для второго персонажа -->
          <div class="character-placeholder">
            <span>Персонаж 2</span>
          </div>
        </div>
      </div>
    </section>

    <section class="features">
      <h2 class="section-title">Как пользоваться сайтом</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <h3>Найдите подходящее учебное заведение</h3>
          <p>Просмотрите наш каталог учебных заведений с полной информацией о программах обучения</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">✏️</div>
          <h3>Пройдите тест профориентации</h3>
          <p>Определите свои склонности и узнайте, какие направления подходят именно вам</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⭐</div>
          <h3>Сохраняйте избранное</h3>
          <p>Добавляйте учебные заведения в избранное для удобного доступа</p>
        </div>
      </div>
    </section>

    <section class="about">
      <h2 class="section-title">О проекте</h2>
      <p>
        Платформа АбитуриентПро создана для помощи абитуриентам в выборе учебного заведения.
        Мы предоставляем подробную информацию об университетах и колледжах, включая направления обучения,
        стоимость, необходимые экзамены и многое другое.
      </p>
      <p>
        Наши инструменты помогут вам сделать осознанный выбор и поступить в учебное заведение,
        которое наилучшим образом соответствует вашим интересам и способностям.
      </p>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  margin-top: -2rem;
}

.hero {
  display: flex;
  background-color: var(--color-primary);
  color: white;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 20px 20px;
  margin-bottom: 4rem;
}

.hero-content {
  flex: 1;
  padding: 2rem;
  max-width: 600px;
  z-index: 2;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.hero-characters {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  width: 40%;
  z-index: 1;
}

.character {
  height: 300px;
  width: 150px;
  position: relative;
}

.character-left {
  margin-right: -20px;
}

.character-placeholder {
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px dashed rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.about {
  background-color: var(--color-secondary);
  padding: 3rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.about p {
  max-width: 800px;
  margin: 0 auto 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    padding-bottom: 300px;
  }
  
  .hero-content {
    padding: 2rem 1rem;
  }
  
  .hero-characters {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style> 