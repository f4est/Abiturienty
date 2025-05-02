<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  meta: [
    { name: 'theme-color', content: '#6987a9' }
  ]
});
</script>

<style>
@import '~/assets/css/main.css';
</style>
