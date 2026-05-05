<template>
  <section class="page">
    <p class="kicker">portfolio.</p>
    <h1>Selected projects</h1>
    <div class="project-tools">
      <label class="search-field">
        <span>Search projects</span>
        <input v-model.trim="searchQuery" type="search" placeholder="Search by title, tool, or summary" />
      </label>
      <div v-if="filters.length" class="filter-row" aria-label="Project filters">
        <button v-for="filter in filters" :key="filter" type="button" :class="{ active: activeFilter === filter }" @click="activeFilter = filter">
          {{ filter }}
        </button>
      </div>
    </div>
    <div v-if="loading" class="grid three">
      <article v-for="index in 6" :key="index" class="card project-card skeleton-card">
        <div class="skeleton-media"></div>
        <div><span></span><h3></h3><p></p></div>
      </article>
    </div>
    <article v-else-if="error" class="empty-state">
      <h2>Projects could not load</h2>
      <p>{{ error }}</p>
      <button type="button" @click="loadProjects">Try again</button>
    </article>
    <article v-else-if="!projects.length" class="empty-state">
      <h2>No projects yet</h2>
      <p>Projects added from the dashboard will show here.</p>
    </article>
    <article v-else-if="!filteredProjects.length" class="empty-state">
      <h2>No matching projects</h2>
      <p>Try a different search or filter.</p>
      <button type="button" @click="clearFilters">Clear filters</button>
    </article>
    <div v-else class="grid three">
      <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../components/ProjectCard.vue';
import { api } from '../services/api';

const projects = ref([]);
const loading = ref(true);
const error = ref('');
const activeFilter = ref('All');
const searchQuery = ref('');
const filters = computed(() => {
  const tags = projects.value.flatMap((project) => String(project.tech_stack || '').split(',').map((tag) => tag.trim()).filter(Boolean));
  return tags.length ? ['All', ...new Set(tags)] : [];
});
const filteredProjects = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return projects.value.filter((project) => {
    const matchesFilter = activeFilter.value === 'All' || String(project.tech_stack || '').includes(activeFilter.value);
    const searchable = [
      project.title,
      project.tech_stack,
      project.description_summary,
      Array.isArray(project.description) ? project.description.map((block) => block?.content).join(' ') : project.description
    ].join(' ').toLowerCase();
    return matchesFilter && (!query || searchable.includes(query));
  });
});

function clearFilters() {
  activeFilter.value = 'All';
  searchQuery.value = '';
}

async function loadProjects() {
  loading.value = true;
  error.value = '';
  try {
    projects.value = (await api.getProjects()).data;
  } catch (loadError) {
    projects.value = [];
    error.value = loadError.message || 'Please check that the API is running.';
  } finally {
    loading.value = false;
    await nextTick();
    if (filteredProjects.value.length) {
      gsap.from('.project-reveal', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.grid.three',
          start: 'top 82%'
        }
      });
    }
    ScrollTrigger.refresh();
  }
}

onMounted(async () => {
  document.title = 'Projects | Mugisha Prince';
  await loadProjects();
});
</script>
