<template>
  <header class="navbar">
    <RouterLink class="brand" to="/" @click="closeMenu">
      <span class="brand-logo-frame" aria-hidden="true">
        <img class="brand-logo" src="/img/prince-images/mugisha_logo_no_bg.png" alt="" />
      </span>
      <span>Mugisha Prince</span>
    </RouterLink>

    <button class="nav-toggle" type="button" aria-label="Toggle navigation" @click="isOpen = !isOpen">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav :class="{ open: isOpen }" aria-label="Primary navigation">
      <a href="/#home" @click="closeMenu">home</a>
      <RouterLink to="/about" @click="closeMenu">about</RouterLink>
      <RouterLink to="/services" @click="closeMenu">learn</RouterLink>
      <RouterLink to="/projects" @click="closeMenu">portfolio</RouterLink>
      <RouterLink to="/contact" @click="closeMenu">contact</RouterLink>
      <RouterLink to="/blog" @click="closeMenu">blog</RouterLink>
      <SocialLinks class="navbar-socials" />
      <button class="theme-toggle" type="button" :aria-pressed="isDarkMode" @click="$emit('toggleTheme')">
        <span>{{ isDarkMode ? 'light' : 'dark' }}</span>
        <strong class="theme-icon" :class="{ 'theme-icon--sun': isDarkMode, 'theme-icon--moon': !isDarkMode }" aria-hidden="true"></strong>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import SocialLinks from './SocialLinks.vue';

defineProps({
  isDarkMode: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggleTheme']);

const isOpen = ref(false);
const closeMenu = () => {
  isOpen.value = false;
};
</script>
