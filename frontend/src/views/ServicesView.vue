<template>
  <section class="page">
    <p class="kicker">services.</p>
    <h1>What I can help with</h1>
    <div class="grid two">
      <article class="card">
        <h2>Clear pages and layout</h2>
        <p>I make websites that feel organized, readable, and easy to move through.</p>
      </article>
      <article class="card">
        <h2>Frontend and backend setup</h2>
        <p>I connect the interface to the backend so content, messages, and updates stay manageable.</p>
      </article>
    </div>
    <div class="skills">
      <article v-for="skill in skills" :key="skill.id">
        <strong>{{ skill.name }}</strong>
        <span>{{ skill.level }}%</span>
      </article>
    </div>
    <article v-if="error" class="empty-state compact">
      <h2>Skills could not load</h2>
      <p>{{ error }}</p>
      <button type="button" @click="loadSkills">Try again</button>
    </article>
    <article v-else-if="!skills.length" class="empty-state compact">
      <h2>No skills listed yet</h2>
      <p>Add skills from the admin dashboard and they will appear here.</p>
    </article>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { api } from '../services/api';

const skills = ref([]);
const error = ref('');

async function loadSkills() {
  error.value = '';
  try {
    skills.value = (await api.getSkills()).data;
  } catch (loadError) {
    skills.value = [];
    error.value = loadError.message || 'Please check that the API is running.';
  }
}

onMounted(async () => {
  document.title = 'Services | Mugisha Prince';
  await loadSkills();
});
</script>
