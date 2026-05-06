<template>
  <section class="breadcrumb-option" style="background-image: url('/img/blog/blog-hero.jpg')">
    <div class="breadcrumb__text">
      <h2>{{ post.title }}</h2>
      <div class="breadcrumb__links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
        <span>Details</span>
      </div>
    </div>
  </section>

  <section class="blog-details spad">
    <div class="container blog-details-layout">
      <article class="blog__details__text">
        <p class="eyebrow">Portfolio system</p>
        <h1>{{ post.title }}</h1>
        <p>
          Mugisha Prince's portfolio is now a true Vue application. The browser loads one Vite
          entry file, Vue Router controls navigation, reusable components render the interface, and
          the backend API supplies dynamic data from MySQL.
        </p>
        <p>
          The original Videograph template still guides the visual structure: hero sections,
          services, portfolio cards, blog pages, breadcrumbs, contact forms, and footer layout.
        </p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const post = computed(() => ({
  title:
    route.params.slug === 'dynamic-project-data'
      ? 'Managing Portfolio Content Dynamically'
      : 'Vue, Node.js, and MySQL Portfolio Architecture'
}));
</script>
