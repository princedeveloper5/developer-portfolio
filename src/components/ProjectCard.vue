<template>
  <article class="portfolio__item">
    <img :src="project.image_url" :alt="project.title" />
    <div class="portfolio__item__text">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <span>{{ project.tech_stack }}</span>
      <RouterLink class="card-action" :to="`/projects/${project.id}`">view case study</RouterLink>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
});
</script>
