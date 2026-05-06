<template>
  <footer class="footer">
    <div class="container footer-inner">
      <p>&copy; 2026 | Designed and coded by Mugisha Prince</p>
      <SocialLinks />
      <div class="footer-links">
        <a href="/#home">home</a>
        <RouterLink to="/projects">work</RouterLink>
        <RouterLink to="/testimonials">kind words</RouterLink>
        <RouterLink to="/contact">contact</RouterLink>
        <a href="#home">back to top</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import SocialLinks from './SocialLinks.vue';
</script>
