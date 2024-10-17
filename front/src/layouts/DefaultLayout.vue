<template>
  <header-component />

  <div class="w-full">

    <main class="container mx-auto p-4">
      <router-view />
    </main>

  </div>
  <footer-component />

</template>

<script setup>
import FooterComponent from "../components/Footer.vue";
import HeaderComponent from "../components/Header.vue";
</script>

<style scoped>
/* Layout-specific styles */
</style>
