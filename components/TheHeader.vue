<template>
  <header class="header">
    <div class="container header-container">
      <div class="logo">
        <NuxtLink to="/">Edugate</NuxtLink>
      </div>
      <button class="mobile-menu-btn" @click="toggleMenu" :aria-expanded="isMenuOpen">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="sr-only">Меню</span>
      </button>
      <nav class="main-nav" :class="{ 'is-open': isMenuOpen }">
        <ul>
          <li><NuxtLink to="/" @click="closeMenu">Главная</NuxtLink></li>
          <li><NuxtLink to="/catalog" @click="closeMenu">Каталог</NuxtLink></li>
          <li><NuxtLink to="/test" @click="closeMenu">Тест на профориентацию</NuxtLink></li>
          <li><NuxtLink to="/profile" @click="closeMenu">Личный кабинет</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.classList.remove('no-scroll');
};
</script>

<style scoped>
.header {
  background-color: var(--color-primary);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.logo a:hover {
  transform: scale(1.05);
}

.main-nav ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.main-nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
}

.main-nav a:hover {
  color: var(--color-accent);
}

.main-nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width 0.3s ease;
}

.main-nav a:hover::after {
  width: 100%;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: white;
  transition: all 0.3s ease;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.no-scroll {
  overflow: hidden;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
    z-index: 101;
  }
  
  .mobile-menu-btn[aria-expanded="true"] .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  
  .mobile-menu-btn[aria-expanded="true"] .bar:nth-child(2) {
    opacity: 0;
  }
  
  .mobile-menu-btn[aria-expanded="true"] .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
  
  .main-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: var(--color-primary);
    padding: 4rem 2rem 2rem;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    transition: right 0.3s ease;
    z-index: 100;
  }
  
  .main-nav.is-open {
    right: 0;
  }
  
  .main-nav ul {
    flex-direction: column;
    gap: 2rem;
  }
  
  .main-nav a {
    display: block;
    font-size: 1.2rem;
  }
}
</style> 