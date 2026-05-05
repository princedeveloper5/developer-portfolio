<template>
  <section class="hero hero-showcase">
    <div class="hero-panel reveal-title">
      <p class="hero-kicker">Mugisha Prince</p>
      <h1>I make websites that are clear, fast, and easy to use.</h1>
      <p class="hero-summary">
        I work with Vue, Node.js, and MySQL to create websites that look good,
        work smoothly, and stay easy to manage.
      </p>

      <div class="hero-notes" aria-label="Quick introduction">
        <span>Kigali, Rwanda</span>
        <span>Available for freelance work</span>
        <span>Vue, Node.js, MySQL</span>
      </div>

      <div class="hero-actions">
        <RouterLink to="/projects">View my work</RouterLink>
        <RouterLink to="/contact">Contact me</RouterLink>
      </div>

      <div class="hero-metrics" aria-label="Portfolio highlights">
        <article>
          <strong>03+</strong>
          <span>main tools</span>
        </article>
        <article>
          <strong>UI</strong>
          <span>frontend work</span>
        </article>
        <article>
          <strong>CMS</strong>
          <span>admin tools</span>
        </article>
      </div>
    </div>

    <div class="hero-visual reveal-title" aria-label="Portfolio visual preview">
      <img class="hero-bg-photo" src="/img/prince-images/hero-background.jpg" alt="" />
      <div class="hero-grid-lines" aria-hidden="true"></div>
      <div class="portrait-card">
        <img src="/img/prince-images/profile-image.png" alt="Mugisha Prince portrait" />
      </div>
      <div class="hero-floating hero-floating--top">
        <span>available for</span>
        <strong>web projects</strong>
      </div>
      <div class="hero-floating hero-floating--bottom">
        <span>focus</span>
        <strong>frontend and backend</strong>
      </div>
      <div class="hero-floating hero-floating--center">
        <span>workflow</span>
        <strong>plan, design, build</strong>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  gsap.from('.reveal-title', {
    y: 80,
    opacity: 0,
    duration: 1.1,
    ease: 'power4.out',
    stagger: 0.18,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top 72%'
    }
  });
});
</script>
