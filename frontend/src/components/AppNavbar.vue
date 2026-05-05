<template>
  <header class="navbar">
    <RouterLink class="brand" to="/">
      <img src="/img/prince-images/mugisha_logo_no_bg.png" alt="" />
      <span>Mugisha Prince</span>
    </RouterLink>
    <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-label="Toggle menu" @click="menuOpen = !menuOpen">menu</button>
    <div class="nav-cluster" :class="{ open: menuOpen }">
      <nav>
        <RouterLink to="/" active-class="active" exact-active-class="active">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/services">Services</RouterLink>
        <RouterLink to="/projects">Portfolio</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/testimonials">Testimonials</RouterLink>
      </nav>
      <div v-if="socialLinks.length" class="header-socials" aria-label="Social media links">
        <a v-for="link in socialLinks" :key="link.label" :href="link.href" target="_blank" rel="noreferrer" :aria-label="link.label">
          <i :class="['fa', link.icon]" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { api } from '../services/api';

const menuOpen = ref(false);
const profile = ref({
  github_url: 'https://github.com/mugishaprince',
  linkedin_url: 'https://www.linkedin.com/in/mugisha-prince',
  instagram_url: 'https://www.instagram.com/mugishaprince',
  twitter_url: 'https://x.com/mugishaprince',
  facebook_url: 'https://www.facebook.com/mugishaprince'
});
const socialLinks = computed(() => [
  { label: 'Instagram', icon: 'fa-instagram', href: profile.value.instagram_url },
  { label: 'Facebook', icon: 'fa-facebook', href: profile.value.facebook_url },
  { label: 'Twitter', icon: 'fa-twitter', href: profile.value.twitter_url },
  { label: 'LinkedIn', icon: 'fa-linkedin', href: profile.value.linkedin_url },
  { label: 'GitHub', icon: 'fa-github', href: profile.value.github_url }
].filter((link) => link.href));

onMounted(async () => {
  try {
    profile.value = { ...profile.value, ...(await api.getProfile()).data };
  } catch {}
});
</script>
