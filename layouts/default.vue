<template>
  <div class="app">
    <TheHeader />
    <main class="main-content">
      <div class="container">
        <slot />
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
useHead({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  meta: [
    { name: 'theme-color', content: '#6987a9' }
  ]
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  width: 100%;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem 0;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 1rem 0;
  }
}
</style> 