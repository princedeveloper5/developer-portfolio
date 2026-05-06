<template>
  <section class="breadcrumb-option" style="background-image: url('/img/breadcrumb-bg.jpg')">
    <div class="breadcrumb__text">
      <h2>Portfolio</h2>
      <div class="breadcrumb__links">
        <RouterLink to="/">Home</RouterLink>
        <span>Projects</span>
      </div>
    </div>
  </section>

  <section class="portfolio spad">
    <div class="section-title center-title">
      <span>My work</span>
      <h2>Latest projects</h2>
    </div>

    <div class="portfolio__filter">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        :class="{ active: selectedFilter === filter }"
        @click="selectedFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <div v-if="loading" class="status-box">Loading projects...</div>
    <div v-else-if="error" class="status-box error">{{ error }}</div>
    <div v-else-if="filteredProjects.length" class="portfolio-grid">
      <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
    </div>
    <div v-else class="status-box">No projects match this filter.</div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import ProjectCard from '../components/ProjectCard.vue';
import { api } from '../services/api';

const projects = ref([]);
const loading = ref(true);
const error = ref('');
const selectedFilter = ref('All');

const filters = computed(() => {
  const stacks = projects.value.flatMap((project) =>
    project.tech_stack.split(',').map((stack) => stack.trim())
  );

  return ['All', ...new Set(stacks)];
});

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'All') {
    return projects.value;
  }

  return projects.value.filter((project) => project.tech_stack.includes(selectedFilter.value));
});

onMounted(async () => {
  try {
    const payload = await api.getProjects();
    projects.value = payload.data;
  } catch (requestError) {
    error.value = requestError.message;
  } finally {
    loading.value = false;
  }
});
</script>
