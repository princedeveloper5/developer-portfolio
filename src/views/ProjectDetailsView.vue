<template>
  <section class="project-case-hero">
    <div v-if="loading" class="container status-box">Loading project...</div>
    <div v-else-if="error" class="container status-box error">{{ error }}</div>
    <div v-else class="container case-hero-grid">
      <div>
        <RouterLink class="case-back-link" to="/projects">Back to projects</RouterLink>
        <p class="section-kicker">case study</p>
        <h1>{{ project.title }}</h1>
        <p>{{ project.description }}</p>
        <div class="case-actions">
          <a v-if="project.live_url" class="cta-button primary-action" :href="project.live_url" target="_blank" rel="noreferrer">
            live demo
          </a>
          <a v-if="project.github_url" class="cta-button secondary-action" :href="project.github_url" target="_blank" rel="noreferrer">
            github
          </a>
        </div>
      </div>
      <img :src="project.image_url" :alt="project.title" />
    </div>
  </section>

  <section v-if="!loading && !error" class="portfolio-section case-study-section">
    <div class="container case-study-grid">
      <article>
        <span>01</span>
        <h2>Problem</h2>
        <p>{{ project.problem || 'This project needed a clearer, more maintainable digital experience.' }}</p>
      </article>
      <article>
        <span>02</span>
        <h2>Solution</h2>
        <p>{{ project.solution || 'I designed and built a practical web solution focused on usability, performance, and maintainability.' }}</p>
      </article>
      <article>
        <span>03</span>
        <h2>Stack</h2>
        <p>{{ project.tech_stack }}</p>
      </article>
      <article>
        <span>04</span>
        <h2>Features</h2>
        <ul>
          <li v-for="feature in features" :key="feature">{{ feature }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../services/api';

const route = useRoute();
const project = ref({});
const loading = ref(true);
const error = ref('');

const features = computed(() => {
  const rawFeatures = project.value.features || 'Responsive interface, Backend-managed content, Clean admin workflow';
  return rawFeatures
    .split(',')
    .map((feature) => feature.trim())
    .filter(Boolean);
});

onMounted(async () => {
  try {
    const payload = await api.getProject(route.params.id);
    project.value = payload.data;
  } catch (requestError) {
    error.value = requestError.message;
  } finally {
    loading.value = false;
  }
});
</script>
