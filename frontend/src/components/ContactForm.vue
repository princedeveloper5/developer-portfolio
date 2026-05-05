<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <label>Name<input v-model.trim="form.name" type="text" /></label>
    <label>Email<input v-model.trim="form.email" type="email" /></label>
    <label>Message<textarea v-model.trim="form.message" rows="6"></textarea></label>
    <button type="submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'sending...' : 'send message' }}
    </button>
    <div v-if="notice" class="toast" :class="toastType" role="status" aria-live="polite">{{ notice }}</div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { api } from '../services/api';

const form = reactive({ name: '', email: '', message: '' });
const notice = ref('');
const toastType = ref('success');
const status = ref('idle');

async function submitForm() {
  notice.value = '';
  if (!form.name || !form.email || form.message.length < 10) {
    toastType.value = 'error';
    notice.value = 'Please fill all fields. Message must be at least 10 characters.';
    return;
  }
  status.value = 'sending';
  try {
    await api.sendMessage({ ...form });
    Object.assign(form, { name: '', email: '', message: '' });
    toastType.value = 'success';
    notice.value = 'Message sent successfully.';
  } catch (error) {
    toastType.value = 'error';
    notice.value = error.message;
  } finally {
    status.value = 'idle';
  }
}
</script>
