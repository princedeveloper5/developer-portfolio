<template>
  <section class="page about-page">
    <div class="about-hero">
      <div class="about-portrait">
        <img :src="profile.portrait_url || '/img/prince-images/pic1.jpg'" :alt="profile.alt_text || 'Mugisha Prince'" />
        <div class="about-portrait-card">
          <strong>{{ profile.location || 'Rwanda' }}</strong>
          <span>{{ profile.phone || profile.email || 'Available for web projects' }}</span>
        </div>
      </div>
      <div class="about-copy">
        <p class="kicker">about.</p>
        <h1>{{ profile.headline }}</h1>
        <p>{{ profile.intro }}</p>
        <div class="about-intro-grid">
          <article>
            <span>based in</span>
            <strong>{{ profile.location || 'Rwanda' }}</strong>
          </article>
          <article>
            <span>phone</span>
            <strong>
              <a v-if="profile.phone" class="about-detail-link" :href="phoneLink">{{ profile.phone }}</a>
              <template v-else>Phone available on request</template>
            </strong>
          </article>
          <article>
            <span>email</span>
            <strong>
              <a v-if="profile.email" class="about-detail-link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
              <template v-else>hello@example.com</template>
            </strong>
          </article>
        </div>
        <div class="about-actions">
          <RouterLink to="/projects">View my work</RouterLink>
          <RouterLink to="/contact">Work with me</RouterLink>
        </div>
      </div>
    </div>

    <div class="about-stats">
      <article v-for="fact in visibleFacts" :key="fact.id || fact.label">
        <span>{{ fact.label }}</span>
        <strong>{{ fact.value }}</strong>
      </article>
    </div>

    <div class="about-roles">
      <article>
        <span>Design</span>
        <h2>{{ profile.role_left || 'Designer' }}</h2>
        <p>{{ profile.role_left_description || 'I work on layout, spacing, and structure so the site feels clear and easy to follow.' }}</p>
      </article>
      <article>
        <span>Build</span>
        <h2>{{ profile.role_right || 'Developer' }}</h2>
        <p>{{ profile.role_right_description || 'I connect the frontend to APIs, database content, uploads, and the tools needed to manage the site.' }}</p>
      </article>
    </div>

    <div class="about-presence">
      <article class="about-presence-card">
        <p class="kicker">where i am.</p>
        <h2>Working from {{ profile.location || 'Rwanda' }} and available for serious client work.</h2>
        <p>I focus on websites that need both a strong public page and a simple way to manage content behind the scenes.</p>
      </article>
      <article class="about-presence-card about-presence-card--accent">
        <p class="kicker">reach me.</p>
        <ul>
          <li>
            <span>Phone</span>
            <strong>
              <a v-if="profile.phone" class="about-detail-link" :href="phoneLink">{{ profile.phone }}</a>
              <template v-else>Phone available on request</template>
            </strong>
          </li>
          <li>
            <span>Email</span>
            <strong>
              <a v-if="profile.email" class="about-detail-link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
              <template v-else>hello@example.com</template>
            </strong>
          </li>
          <li>
            <span>Status</span>
            <strong>Open to freelance and portfolio projects</strong>
          </li>
        </ul>
      </article>
    </div>

    <div class="about-process">
      <div>
        <p class="kicker">method.</p>
        <h2>I keep the process simple from start to finish.</h2>
      </div>
      <ol>
        <li v-for="step in processSteps" :key="step.title">
          <span>{{ step.number }}</span>
          <div>
            <strong>{{ step.title }}</strong>
            <p>{{ step.text }}</p>
          </div>
        </li>
      </ol>
    </div>

    <div v-if="skills.length" class="about-stack">
      <p class="kicker">stack.</p>
      <div>
        <span v-for="skill in skills.slice(0, 10)" :key="skill.id">{{ skill.name }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { api } from '../services/api';

const profile = ref({
  headline: 'I build websites that are useful, clean, and easy to manage.',
  intro: 'My focus is making websites that feel clear for visitors and simple to update for the owner.',
  location: 'Rwanda',
  email: 'hello@example.com',
  phone: ''
});
const facts = ref([]);
const skills = ref([]);
const fallbackFacts = [
  { label: 'Focus', value: 'Web systems' },
  { label: 'Frontend', value: 'Vue' },
  { label: 'Backend', value: 'Express' },
  { label: 'Database', value: 'MySQL' }
];
const visibleFacts = computed(() => (facts.value.length ? facts.value : fallbackFacts).slice(0, 4));
const phoneLink = computed(() => `tel:${(profile.value.phone || '').replace(/\s+/g, '')}`);
const processSteps = [
  {
    number: '01',
    title: 'Start with the goal',
    text: 'I begin by understanding what the site needs to say and what visitors should notice first.'
  },
  {
    number: '02',
    title: 'Build the layout',
    text: 'I organize the page with good spacing, readable type, and a layout that works well on different screens.'
  },
  {
    number: '03',
    title: 'Connect the tools',
    text: 'I link the frontend with the backend so projects, images, and messages can be managed easily.'
  }
];

onMounted(async () => {
  document.title = 'About | Mugisha Prince';
  try {
    const [profilePayload, factPayload, skillPayload] = await Promise.all([api.getProfile(), api.getFacts(), api.getSkills()]);
    profile.value = profilePayload.data;
    facts.value = factPayload.data;
    skills.value = skillPayload.data || [];
  } catch {
    facts.value = [];
    skills.value = [];
  }
});
</script>
