<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <section class="site-footer__intro">
        <p class="site-footer__eyebrow">Mugisha Prince</p>
        <h2>Let us make your website simple, clear, and ready to use.</h2>
        <p>
          I create websites with clear structure, smooth frontend work, and tools that
          help you keep everything updated.
        </p>
      </section>

      <section class="site-footer__group">
        <h3>Pages</h3>
        <div class="site-footer__links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/services">Services</RouterLink>
          <RouterLink to="/projects">Portfolio</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>
      </section>

      <section class="site-footer__group">
        <h3>Contact</h3>
        <div class="site-footer__meta">
          <p>{{ profile.location || 'Rwanda' }}</p>
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          <RouterLink to="/contact">Start a project</RouterLink>
        </div>
      </section>

      <section class="site-footer__group">
        <h3>Follow</h3>
        <div class="site-footer__socials">
          <a v-for="link in socialLinks" :key="link.label" :href="link.href" target="_blank" rel="noreferrer" :aria-label="link.label">
            <i :class="['fa', link.icon]" aria-hidden="true"></i>
          </a>
          <a v-if="profile.cv_url" :href="profile.cv_url" :download="isLocalCv" aria-label="Download CV">
            <i class="fa fa-download" aria-hidden="true"></i>
          </a>
        </div>
      </section>
    </div>

    <div class="site-footer__bottom">
      <p>&copy; 2026 Mugisha Prince. All rights reserved.</p>
      <RouterLink to="/">Back to top</RouterLink>
    </div>
  </footer>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { api } from '../services/api';

const profile = ref({
  location: 'Rwanda',
  email: 'hello@example.com',
  github_url: 'https://github.com/mugishaprince',
  linkedin_url: 'https://www.linkedin.com/in/mugisha-prince',
  instagram_url: 'https://www.instagram.com/mugishaprince',
  twitter_url: 'https://x.com/mugishaprince',
  facebook_url: 'https://www.facebook.com/mugishaprince',
  cv_url: '/Mugisha_Prince_CV.pdf'
});

const socialLinks = computed(() => [
  { label: 'Instagram', icon: 'fa-instagram', href: profile.value.instagram_url },
  { label: 'Facebook', icon: 'fa-facebook', href: profile.value.facebook_url },
  { label: 'Twitter', icon: 'fa-twitter', href: profile.value.twitter_url },
  { label: 'LinkedIn', icon: 'fa-linkedin', href: profile.value.linkedin_url },
  { label: 'GitHub', icon: 'fa-github', href: profile.value.github_url }
].filter((link) => link.href));

const isLocalCv = computed(() => profile.value.cv_url?.startsWith('/'));

onMounted(async () => {
  try {
    profile.value = { ...profile.value, ...(await api.getProfile()).data };
  } catch {}
});
</script>
