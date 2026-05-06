<template>
  <section class="breadcrumb-option" style="background-image: url('/img/breadcrumb-bg.jpg')">
    <div class="breadcrumb__text">
      <h2>Blog</h2>
      <div class="breadcrumb__links">
        <RouterLink to="/">Home</RouterLink>
        <span>Blog</span>
      </div>
    </div>
  </section>

  <section class="blog spad">
    <div class="container">
      <div class="section-title center-title">
        <span>Notes</span>
        <h2>Development updates</h2>
      </div>
      <div class="blog-grid">
        <article v-for="post in posts" :key="post.slug" class="blog__item">
          <img :src="post.image" :alt="post.title" />
          <div class="blog__item__text">
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
            <RouterLink :to="`/blog/${post.slug}`">Read more</RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const posts = [
  {
    slug: 'vue-node-mysql-portfolio',
    title: 'Vue, Node.js, and MySQL Portfolio Architecture',
    excerpt: 'How this portfolio separates frontend UI, backend logic, and relational data.',
    image: '/img/blog/blog-1.jpg'
  },
  {
    slug: 'dynamic-project-data',
    title: 'Managing Portfolio Content Dynamically',
    excerpt: 'Projects, skills, and contact messages are handled through API endpoints.',
    image: '/img/blog/blog-2.jpg'
  }
];
</script>
