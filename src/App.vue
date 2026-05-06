<template>
  <LoadingBar />
  <div class="app-shell" :class="{ 'admin-app-shell': isAdminRoute, 'auth-app-shell': isAuthRoute, 'dark-theme': isDarkMode }">
    <AppNavbar v-if="!isAdminRoute && !isAuthRoute" :is-dark-mode="isDarkMode" @toggle-theme="toggleTheme" />
    <main>
      <RouterView />
    </main>
    <AppFooter v-if="!isAdminRoute && !isAuthRoute" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from './components/AppFooter.vue';
import AppNavbar from './components/AppNavbar.vue';
import LoadingBar from './components/LoadingBar.vue';

const route = useRoute();
const isAdminRoute = computed(() => Boolean(route.meta.adminLayout));
const isAuthRoute = computed(() => Boolean(route.meta.authLayout));
const isDarkMode = ref(false);

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
}

onMounted(() => {
  const savedTheme = window.localStorage.getItem('portfolio_theme');
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark';
    return;
  }

  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
});

watch(isDarkMode, (value) => {
  window.localStorage.setItem('portfolio_theme', value ? 'dark' : 'light');
});
</script>
