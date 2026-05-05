<template>
  <article class="card project-card project-reveal">
    <RouterLink :to="`/projects/${project.id}`">
      <div class="project-media">
        <video v-if="project.preview_video_url" :src="project.preview_video_url" muted loop playsinline preload="metadata" @mouseenter="playVideo" @mouseleave="pauseVideo"></video>
        <img v-else :src="imageSrc" :alt="project.alt_text || project.title" loading="lazy" />
      </div>
    </RouterLink>
    <div>
      <span>{{ project.tech_stack }}</span>
      <h3>{{ project.title }}</h3>
      <p>{{ summary }}</p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  project: { type: Object, required: true }
});

const fallbackImage = new URL('../../public/img/work/work-1.jpg', import.meta.url).href;
const imageSrc = computed(() => props.project.image_url || fallbackImage);
const summary = computed(() => {
  if (props.project.description_summary) return props.project.description_summary;
  if (Array.isArray(props.project.description)) return props.project.description.find((block) => block?.content)?.content || '';
  return props.project.description || '';
});

function playVideo(event) {
  event.currentTarget.play().catch(() => {});
}

function pauseVideo(event) {
  event.currentTarget.pause();
}
</script>
