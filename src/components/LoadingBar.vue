<template>
  <div v-if="isVisible" class="loading-bar-container">
    <div class="loading-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const isVisible = ref(false);
const progress = ref(0);
let progressInterval = null;
let hideTimeout = null;

const router = useRouter();

function startLoading() {
  isVisible.value = true;
  progress.value = 0;
  
  clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 15;
      if (progress.value > 90) progress.value = 90;
    }
  }, 200);
}

function finishLoading() {
  clearInterval(progressInterval);
  progress.value = 100;
  
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    isVisible.value = false;
    progress.value = 0;
  }, 300);
}

let unsubscribeBefore = null;
let unsubscribeAfter = null;

onMounted(() => {
  unsubscribeBefore = router.beforeEach(() => {
    startLoading();
  });
  
  unsubscribeAfter = router.afterEach(() => {
    finishLoading();
  });
});

onUnmounted(() => {
  clearInterval(progressInterval);
  clearTimeout(hideTimeout);
  if (unsubscribeBefore) unsubscribeBefore();
  if (unsubscribeAfter) unsubscribeAfter();
});

// Expose methods for manual control
defineExpose({ startLoading, finishLoading });
</script>

<style scoped>
.loading-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 9999;
  background: transparent;
}

.loading-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent, #f2cf5b), #ff6b6b);
  transition: width 0.3s ease-out;
  box-shadow: 0 0 10px rgba(242, 207, 91, 0.5);
}
</style>
