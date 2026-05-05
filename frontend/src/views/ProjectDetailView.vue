<template>
  <section class="page project-detail-page">
    <div v-if="loading" class="card skeleton-card">
      <div class="skeleton-media"></div>
      <div><span></span><h3></h3><p></p></div>
    </div>
    <template v-else-if="project">
      <div class="project-detail-hero">
        <div class="project-detail-copy">
          <p class="kicker">{{ project.tech_stack }}</p>
          <h1>{{ project.title }}</h1>
          <p class="project-detail-summary">{{ summary }}</p>
          <div v-if="project.live_url || project.github_url" class="project-actions">
            <a v-if="project.live_url" :href="project.live_url" target="_blank" rel="noreferrer">View live</a>
            <a v-if="project.github_url" :href="project.github_url" target="_blank" rel="noreferrer">Source code</a>
          </div>
        </div>

        <div class="project-detail-media">
          <div class="project-media detail-media">
            <video v-if="project.preview_video_url" :src="project.preview_video_url" muted loop autoplay playsinline></video>
            <img v-else class="page-image" :src="project.image_url" :alt="project.alt_text || project.title" loading="lazy" />
          </div>
        </div>
      </div>

      <div class="project-detail-body">
        <article v-if="caseStudyBlocks.length" class="case-study">
          <template v-for="(block, index) in caseStudyBlocks" :key="index">
            <p v-if="block.type === 'text'">{{ block.content }}</p>
            <blockquote v-else-if="block.type === 'quote'">{{ block.content }}</blockquote>
            <pre v-else-if="block.type === 'code'"><code>{{ block.content }}</code></pre>
            <img v-else-if="block.type === 'image'" :src="block.url" :alt="block.alt || project.title" loading="lazy" />
          </template>
        </article>

        <aside v-if="project.problem || project.solution || project.features" class="project-notes">
          <div v-if="project.problem">
            <h2>Problem</h2>
            <p>{{ project.problem }}</p>
          </div>
          <div v-if="project.solution">
            <h2>Solution</h2>
            <p>{{ project.solution }}</p>
          </div>
          <div v-if="project.features">
            <h2>Features</h2>
            <p>{{ project.features }}</p>
          </div>
        </aside>
      </div>
    </template>
    <article v-else class="empty-state">
      <h1>{{ error ? 'Project could not load' : 'Project not found' }}</h1>
      <p>{{ error || 'This project is not available right now.' }}</p>
      <RouterLink to="/projects">Back to projects</RouterLink>
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../services/api';

const route = useRoute();
const loading = ref(true);
const project = ref(null);
const error = ref('');
const caseStudyBlocks = computed(() => {
  if (!project.value) return [];
  return Array.isArray(project.value.description) ? project.value.description : [];
});
const summary = computed(() => {
  if (!project.value) return '';
  if (project.value.description_summary) return project.value.description_summary;
  return caseStudyBlocks.value.find((block) => block?.content)?.content || '';
});

function setMeta(item) {
  document.title = `${item.title} | Mugisha Prince project`;
  const description = item.description_summary || 'Project by Mugisha Prince.';
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', description.slice(0, 160));
  let imageMeta = document.querySelector('meta[property="og:image"]');
  if (!imageMeta) {
    imageMeta = document.createElement('meta');
    imageMeta.setAttribute('property', 'og:image');
    document.head.appendChild(imageMeta);
  }
  imageMeta.setAttribute('content', item.image_url);
}

onMounted(async () => {
  try {
    project.value = (await api.getProject(route.params.id)).data;
    setMeta(project.value);
  } catch (loadError) {
    error.value = loadError.message || 'Please check that the API is running.';
  } finally {
    loading.value = false;
  }
});
</script>
