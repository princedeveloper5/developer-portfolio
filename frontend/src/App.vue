<template>
  <div v-if="loading" class="preloader" aria-live="polite">
    <span>{{ loadProgress }}%</span>
  </div>
  <div class="custom-cursor" :class="{ active: cursor.active, view: cursor.view }" :style="cursorStyle">
    <span>View</span>
  </div>
  <div class="app-shell" :class="{ 'admin-shell': isAdminLayout }">
    <AppNavbar v-if="!isAdminLayout" />
    <main>
      <RouterView />
    </main>
    <AppFooter v-if="!isAdminLayout" />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from './components/AppFooter.vue';
import AppNavbar from './components/AppNavbar.vue';

const route = useRoute();
const isAdminLayout = computed(() => Boolean(route.meta.adminLayout));
const loading = ref(true);
const loadProgress = ref(0);
const cursor = reactive({ x: 0, y: 0, active: false, view: false });
const cursorStyle = computed(() => ({ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }));

let progressTimer;

function moveCursor(event) {
  cursor.x = event.clientX;
  cursor.y = event.clientY;
  const target = event.target.closest('a, button, input, textarea, .project-media');
  cursor.active = Boolean(target);
  cursor.view = Boolean(event.target.closest('.project-media'));
}

function bindMagneticButtons() {
  document.querySelectorAll('button, .magnetic').forEach((button) => {
    button.addEventListener('mousemove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      button.style.transform = `translate(${x}px, ${y}px)`;
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
}

onMounted(() => {
  window.addEventListener('mousemove', moveCursor);
  bindMagneticButtons();
  progressTimer = window.setInterval(() => {
    loadProgress.value = Math.min(96, loadProgress.value + Math.ceil(Math.random() * 9));
  }, 70);
  window.addEventListener('load', () => {
    loadProgress.value = 100;
    window.setTimeout(() => {
      loading.value = false;
      window.clearInterval(progressTimer);
    }, 260);
  }, { once: true });
  window.setTimeout(() => {
    loadProgress.value = 100;
    loading.value = false;
    window.clearInterval(progressTimer);
  }, 1600);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveCursor);
  window.clearInterval(progressTimer);
});
</script>
