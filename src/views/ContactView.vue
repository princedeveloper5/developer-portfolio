<template>
  <section class="contact-page contact-section">
    <div class="container contact-layout">
      <div>
        <RouterLink class="case-back-link contact-back-link" to="/">back home</RouterLink>
        <p class="section-kicker">contact.</p>
        <h1>Want to build something useful?</h1>
        <p>
          Send a message to {{ profile.name }}. Your message is validated, stored in MySQL, and
          visible in the admin dashboard.
        </p>
        <p class="contact-meta">{{ profile.location }} | {{ profile.email }}</p>
        <SocialLinks />
      </div>
      <ContactForm />
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import ContactForm from '../components/ContactForm.vue';
import SocialLinks from '../components/SocialLinks.vue';
import { api } from '../services/api';

const profile = ref({
  name: 'Mugisha Prince',
  location: 'Rwanda',
  email: 'hello@example.com'
});

onMounted(async () => {
  try {
    const payload = await api.getProfile();
    profile.value = {
      ...profile.value,
      ...payload.data
    };
  } catch {
    // Keep the local fallback content when the API is offline.
  }
});
</script>
