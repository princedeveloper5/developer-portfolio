<template>
  <section class="page contact-page split">
    <div>
      <p class="kicker">contact.</p>
      <h1>Let us talk about your website.</h1>
      <p>Send a message to {{ profile.name }} and I will get back to you as soon as I can.</p>
      <strong>{{ profile.location }} | {{ profile.email }}</strong>
      <div class="social-actions">
        <a v-for="link in socialLinks" :key="link.label" :href="link.href" target="_blank" rel="noreferrer" :aria-label="link.label">
          <i :class="['fa', link.icon]" aria-hidden="true"></i>
        </a>
        <a v-if="profile.cv_url" :href="profile.cv_url" :download="isLocalCv" aria-label="Download CV">
          <i class="fa fa-download" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <ContactForm />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import ContactForm from '../components/ContactForm.vue';
import { api } from '../services/api';

const profile = ref({
  name: 'Mugisha Prince',
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
  document.title = 'Contact | Mugisha Prince';
  try {
    profile.value = { ...profile.value, ...(await api.getProfile()).data };
  } catch {}
});
</script>
