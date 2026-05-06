<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <label>
      Name
      <input v-model.trim="form.name" type="text" autocomplete="name" />
      <span v-if="errors.name">{{ errors.name }}</span>
    </label>

    <label>
      Email
      <input v-model.trim="form.email" type="email" autocomplete="email" />
      <span v-if="errors.email">{{ errors.email }}</span>
    </label>

    <label>
      Message
      <textarea v-model.trim="form.message" rows="6"></textarea>
      <span v-if="errors.message">{{ errors.message }}</span>
    </label>

    <button type="submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Sending...' : 'Send Message' }}
    </button>

    <p v-if="notice" class="form-notice">{{ notice }}</p>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { api } from '../services/api';

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const errors = reactive({});
const status = ref('idle');
const notice = ref('');

function validate() {
  errors.name = form.name ? '' : 'Name is required.';
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Valid email is required.';
  errors.message = form.message.length >= 10 ? '' : 'Message must be at least 10 characters.';

  return !errors.name && !errors.email && !errors.message;
}

async function submitForm() {
  notice.value = '';

  if (!validate()) {
    return;
  }

  status.value = 'sending';

  try {
    await api.sendMessage({ ...form });
    form.name = '';
    form.email = '';
    form.message = '';
    notice.value = 'Message sent successfully.';
  } catch (error) {
    notice.value = error.message;
  } finally {
    status.value = 'idle';
  }
}
</script>
