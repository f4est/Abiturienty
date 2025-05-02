<template>
  <header class="header">
    <div class="container header-container">
      <div class="logo">
        <NuxtLink to="/">АбитуриентПро</NuxtLink>
      </div>
      <nav class="main-nav">
        <ul>
          <li><NuxtLink to="/">Главная</NuxtLink></li>
          <li><NuxtLink to="/catalog">Каталог</NuxtLink></li>
          <li><NuxtLink to="/test">Тест на профориентацию</NuxtLink></li>
          <li><NuxtLink to="/profile">Личный кабинет</NuxtLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--color-primary);
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
}

.main-nav a:hover {
  color: var(--color-accent);
}
</style> 