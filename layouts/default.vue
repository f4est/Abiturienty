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

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}
</style> 