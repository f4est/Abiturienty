<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <h2>АбитуриентПро</h2>
          <p>Ваш помощник в выборе учебного заведения</p>
        </div>
        <div class="footer-links">
          <h3>Навигация</h3>
          <ul>
            <li><NuxtLink to="/">Главная</NuxtLink></li>
            <li><NuxtLink to="/catalog">Каталог</NuxtLink></li>
            <li><NuxtLink to="/test">Тест</NuxtLink></li>
            <li><NuxtLink to="/profile">Личный кабинет</NuxtLink></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h3>Контакты</h3>
          <p>Email: info@abiturientpro.ru</p>
          <p>Телефон: +7 (999) 123-45-67</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} АбитуриентПро. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-primary);
  color: white;
  padding: 2rem 0 1rem;
  margin-top: 3rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-logo h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.footer-logo p {
  opacity: 0.8;
}

.footer-links h3, .footer-contact h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.footer-links a:hover {
  opacity: 1;
  color: var(--color-accent);
}

.footer-contact p {
  margin: 0.5rem 0;
  opacity: 0.8;
}

.footer-bottom {
  padding-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style> 