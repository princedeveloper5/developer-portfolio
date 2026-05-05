<template>
  <section class="page">
    <p class="kicker">testimonials.</p>
    <h1>Testimonials</h1>
    <div class="grid two">
      <blockquote v-for="item in testimonials" :key="item.id" class="card">
        <p>{{ item.quote }}</p>
        <cite>{{ item.name }}<span v-if="item.role">, {{ item.role }}</span></cite>
      </blockquote>
    </div>
    <article v-if="error" class="empty-state">
      <h2>Testimonials could not load</h2>
      <p>{{ error }}</p>
      <button type="button" @click="loadTestimonials">Try again</button>
    </article>
    <article v-else-if="!testimonials.length" class="empty-state">
      <h2>No testimonials yet</h2>
      <p>Add testimonials from the admin dashboard and they will appear here.</p>
    </article>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../services/api';

const testimonials = ref([]);
const error = ref('');

async function loadTestimonials() {
  error.value = '';
  try {
    testimonials.value = (await api.getTestimonials()).data;
  } catch (loadError) {
    testimonials.value = [];
    error.value = loadError.message || 'Please check that the API is running.';
  }
}

onMounted(async () => {
  document.title = 'Testimonials | Mugisha Prince';
  await loadTestimonials();
});
</script>
