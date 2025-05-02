<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <h2>Edugate</h2>
          <p>Ваш помощник в выборе учебного заведения</p>
          <div class="social-icons">
            <a href="#" aria-label="Facebook"><i class="social-icon">📱</i></a>
            <a href="#" aria-label="Instagram"><i class="social-icon">💌</i></a>
            <a href="#" aria-label="Telegram"><i class="social-icon">💬</i></a>
          </div>
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
          <p><i class="contact-icon">✉️</i> info@edugate.kz</p>
          <p><i class="contact-icon">📞</i> +7 (747) 081-86-44</p>
          <p><i class="contact-icon">📍</i> г. Алматы, мкр. Тастак, ул. Тастак 1в</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Edugate. Все права защищены.</p>
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
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, var(--color-accent), var(--color-secondary), var(--color-accent));
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
  position: relative;
  display: inline-block;
}

.footer-logo h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: var(--color-accent);
}

.footer-logo p {
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.social-icon {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  display: inline-block;
}

.social-icons a:hover .social-icon {
  transform: translateY(-5px);
}

.footer-links h3, .footer-contact h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.footer-links h3::after, .footer-contact h3::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: var(--color-accent);
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 0;
}

.footer-links a:hover {
  opacity: 1;
  color: var(--color-accent);
  padding-left: 5px;
}

.contact-icon {
  margin-right: 0.5rem;
  font-size: 1rem;
}

.footer-contact p {
  margin: 0.75rem 0;
  opacity: 0.8;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.footer-contact p:hover {
  opacity: 1;
  transform: translateX(5px);
}

.footer-bottom {
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem 3rem;
  }
  
  .footer-logo {
    grid-column: 1 / -1;
    text-align: center;
  }
  
  .footer-logo h2::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .social-icons {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .footer-links h3::after, .footer-contact h3::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .footer-contact p {
    justify-content: center;
  }
  
  .footer-bottom {
    padding-top: 1rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 2rem 0 0.5rem;
  }
  
  .footer-content {
    gap: 1.5rem;
  }
}
</style> 