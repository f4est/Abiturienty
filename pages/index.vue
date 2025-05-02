<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <h1 class="animate-title">Добро пожаловать на Edugate!</h1>
        <p class="animate-text">Ваш надежный помощник в выборе учебного заведения</p>
        <div class="hero-buttons animate-buttons">
          <NuxtLink to="/catalog" class="btn btn-primary">Перейти к каталогу</NuxtLink>
          <NuxtLink to="/test" class="btn btn-accent">Пройти тест</NuxtLink>
        </div>
      </div>
      
      <div class="hero-characters">
        <div class="character character-left">
          <div class="character-bubble">
            <p>"Edugate помог мне выбрать правильный путь!"</p>
          </div>
          <div class="character-image student-1"></div>
        </div>
        <div class="character character-right">
          <div class="character-bubble">
            <p>"Теперь я знаю, куда поступать!"</p>
          </div>
          <div class="character-image student-2"></div>
        </div>
      </div>
    </section>

    <section class="features">
      <h2 class="section-title">Как пользоваться сайтом</h2>
      <div class="features-grid">
        <div class="feature-card" data-aos="fade-up">
          <div class="feature-icon">🔍</div>
          <h3>Найдите подходящее учебное заведение</h3>
          <p>Просмотрите наш каталог учебных заведений с полной информацией о программах обучения</p>
        </div>
        <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
          <div class="feature-icon">✏️</div>
          <h3>Пройдите тест профориентации</h3>
          <p>Определите свои склонности и узнайте, какие направления подходят именно вам</p>
        </div>
        <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
          <div class="feature-icon">⭐</div>
          <h3>Сохраняйте избранное</h3>
          <p>Добавляйте учебные заведения в избранное для удобного доступа</p>
        </div>
      </div>
    </section>

    <section class="about">
      <h2 class="section-title">О проекте</h2>
      <div class="about-content">
        <div class="about-text">
          <p>
            Платформа Edugate создана для помощи абитуриентам в выборе учебного заведения.
            Мы предоставляем подробную информацию об университетах и колледжах, включая направления обучения,
            стоимость, необходимые экзамены и многое другое.
          </p>
          <p>
            Наши инструменты помогут вам сделать осознанный выбор и поступить в учебное заведение,
            которое наилучшим образом соответствует вашим интересам и способностям.
          </p>
        </div>
        <div class="about-stats">
          <div class="stat-item">
            <div class="stat-number">100+</div>
            <div class="stat-label">Учебных заведений</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Направлений</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">10000+</div>
            <div class="stat-label">Абитуриентов</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  margin-top: -2rem;
}

.hero {
  display: flex;
  background: linear-gradient(135deg, var(--color-primary) 30%, #4a6381 100%);
  color: white;
  padding: 3rem 0;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 30px 30px;
  margin-bottom: 4rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  transform: scale(1.5);
}

.hero-content {
  flex: 1;
  padding: 2rem;
  max-width: 600px;
  z-index: 2;
}

.animate-title {
  animation: fadeInUp 1s ease-out;
}

.animate-text {
  animation: fadeInUp 1s ease-out 0.3s forwards;
  opacity: 0;
  animation-fill-mode: forwards;
}

.animate-buttons {
  animation: fadeInUp 1s ease-out 0.6s forwards;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.5;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.hero-buttons .btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.hero-buttons .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.hero-characters {
  position: absolute;
  right: 5%;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  width: 40%;
  z-index: 1;
}

.character {
  height: 320px;
  width: 150px;
  position: relative;
}

.character-bubble {
  position: absolute;
  top: 30px;
  left: 0;
  background-color: white;
  color: var(--color-primary);
  padding: 0.75rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  max-width: 180px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 3;
  transform: translateY(-10px);
  opacity: 0;
  animation: bubbleUp 0.5s ease-out 1.5s forwards;
}

.character-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 20px;
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: white transparent transparent;
}

.character-left .character-bubble {
  left: -30px;
}

.character-right .character-bubble {
  right: -30px;
  left: auto;
}

.character-right .character-bubble::after {
  left: auto;
  right: 20px;
}

@keyframes bubbleUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.character-left {
  margin-right: -20px;
  transform: translateY(20px);
  animation: characterBob 3s ease-in-out infinite;
}

.character-right {
  transform: translateY(0);
  animation: characterBob 3s ease-in-out 1.5s infinite;
}

@keyframes characterBob {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.character-image {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px 20px 0 0;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.student-1::before, .student-2::before {
  content: '👨‍🎓';
  font-size: 5rem;
  position: absolute;
  bottom: 40px;
}

.student-2::before {
  content: '👩‍🎓';
}

.section-title {
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--color-primary);
  position: relative;
  padding-bottom: 1rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 3px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.feature-card {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
  border-bottom: 3px solid var(--color-accent);
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.about {
  background: linear-gradient(to right, var(--color-secondary), #97b1cb);
  padding: 4rem 2rem;
  border-radius: 16px;
  margin-bottom: 3rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: #2c3e50;
}

.about-content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto;
}

.about-text {
  flex: 1 1 500px;
}

.about-text p {
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.about-stats {
  flex: 1 1 300px;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
}

.stat-item {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  min-width: 150px;
  flex: 1 1 120px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Адаптивные стили */
@media (max-width: 1100px) {
  .hero {
    padding-bottom: 300px;
  }
  
  .hero-content {
    padding: 2.5rem;
    max-width: 90%;
  }
  
  .hero-characters {
    right: 50%;
    transform: translateX(50%);
    bottom: 0;
    width: auto;
  }
}

@media (max-width: 768px) {
  .hero {
    padding-bottom: 250px;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero p {
    font-size: 1.1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .hero-buttons .btn {
    width: 100%;
    text-align: center;
  }
  
  .character {
    height: 250px;
    width: 120px;
  }
  
  .character-bubble {
    max-width: 150px;
    font-size: 0.8rem;
  }
  
  .about {
    padding: 3rem 1.5rem;
  }
  
  .about-content {
    flex-direction: column;
  }
  
  .about-stats {
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .hero {
    padding-bottom: 200px;
    margin-bottom: 3rem;
  }
  
  .hero-content {
    padding: 2rem 1.5rem;
  }
  
  .character {
    height: 200px;
    width: 100px;
  }
  
  .character-bubble {
    max-width: 120px;
    padding: 0.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  .stat-item {
    flex: 1 1 100%;
  }
}
</style> 