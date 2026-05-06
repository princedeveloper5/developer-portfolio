<template>
  <section class="breadcrumb-option" style="background-image: url('/img/breadcrumb-bg.jpg')">
    <div class="breadcrumb__text">
      <h2>Kind words</h2>
      <div class="breadcrumb__links">
        <RouterLink to="/">Home</RouterLink>
        <span>Testimonials</span>
      </div>
    </div>
  </section>

  <section class="portfolio-section testimonials-section">
    <div class="container">
      <p class="section-kicker">kind words</p>
      <div v-if="loading" class="status-box">Loading testimonials...</div>
      <div v-else-if="testimonials.length" class="quote-grid">
        <blockquote v-for="item in testimonials" :key="item.id">
          <p>{{ item.quote }}</p>
          <cite>{{ item.name }}<span v-if="item.role">, {{ item.role }}</span></cite>
        </blockquote>
      </div>
      <div v-else class="status-box">No testimonials yet.</div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../services/api';

const testimonials = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const payload = await api.getTestimonials();
    testimonials.value = payload.data;
  } catch {
    testimonials.value = [];
  } finally {
    loading.value = false;
  }
});
</script>
