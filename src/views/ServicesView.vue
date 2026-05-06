<template>
  <section class="breadcrumb-option" style="background-image: url('/img/breadcrumb-bg.jpg')">
    <div class="breadcrumb__text">
      <h2>Services</h2>
      <div class="breadcrumb__links">
        <RouterLink to="/">Home</RouterLink>
        <span>Services</span>
      </div>
    </div>
  </section>

  <section class="services services-page spad">
    <div class="container">
      <div class="section-title center-title">
        <span>My services</span>
        <h2>What I build</h2>
      </div>
      <div class="services-grid">
        <article v-for="service in services" :key="service.title" class="services__item">
          <div class="services__item__icon">
            <img :src="service.icon" :alt="service.title" />
          </div>
          <h4>{{ service.title }}</h4>
          <p>{{ service.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Frontend Development',
    icon: '/img/icons/si-1.png',
    description: 'Responsive Vue interfaces with clean components, routing, forms, and API-driven content.'
  },
  {
    title: 'Backend APIs',
    icon: '/img/icons/si-2.png',
    description: 'Node.js REST endpoints for projects, skills, contact messages, authentication, and CRUD.'
  },
  {
    title: 'Database Design',
    icon: '/img/icons/si-3.png',
    description: 'Structured MySQL tables for users, portfolio projects, messages, and skill records.'
  },
  {
    title: 'Portfolio Systems',
    icon: '/img/icons/si-4.png',
    description: 'A professional portfolio flow that separates UI, business logic, and stored data.'
  }
];
</script>
