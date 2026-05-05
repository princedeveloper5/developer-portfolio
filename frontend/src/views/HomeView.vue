<template>
  <HeroSection />

  <section class="home-proof">
    <div class="proof-copy">
      <p class="kicker">what this site does.</p>
      <h2>Good design in front, simple control behind it.</h2>
      <p>
        This site is not only for showing work. It also makes it easy to update projects,
        manage content, and keep everything organized in one place.
      </p>
      <div class="proof-actions">
        <RouterLink to="/projects">See portfolio</RouterLink>
        <RouterLink to="/contact">Start a project</RouterLink>
      </div>
    </div>

    <div class="proof-stats" aria-label="Portfolio highlights">
      <article>
        <strong>{{ projects.length }}</strong>
        <span>projects</span>
      </article>
      <article>
        <strong>{{ skills.length }}</strong>
        <span>tools</span>
      </article>
      <article>
        <strong>{{ facts.length || '04' }}</strong>
        <span>proof points</span>
      </article>
    </div>
  </section>

  <section class="home-services">
    <div>
      <p class="kicker">what I do.</p>
      <h2>The parts that make a website feel complete.</h2>
    </div>
    <div class="service-list">
      <article>
        <span>01</span>
        <h3>Visual identity</h3>
        <p>Typography, spacing, colors, and image choices that give the site a clear look.</p>
      </article>
      <article>
        <span>02</span>
        <h3>Project stories</h3>
        <p>Project cards, previews, and detail pages that help people understand the work quickly.</p>
      </article>
      <article>
        <span>03</span>
        <h3>Content control</h3>
        <p>Simple admin tools for updating projects, skills, images, and messages without editing code.</p>
      </article>
    </div>
  </section>

  <section v-if="featuredProjects.length" class="home-featured">
    <header>
      <p class="kicker">featured.</p>
      <h2>Recent builds</h2>
    </header>
    <div class="featured-strip">
      <RouterLink
        v-for="project in featuredProjects"
        :key="project.id"
        class="featured-project"
        :to="`/projects/${project.id}`"
      >
        <div class="project-media">
          <video v-if="project.preview_video_url" :src="project.preview_video_url" muted loop playsinline preload="metadata"></video>
          <img v-else :src="project.image_url || fallbackImage" :alt="project.alt_text || project.title" loading="lazy" />
        </div>
        <div>
          <span>{{ project.tech_stack }}</span>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description_summary || projectSummary(project) }}</p>
        </div>
      </RouterLink>
    </div>
  </section>

  <section class="home-cta">
    <p class="kicker">ready.</p>
    <h2>Let us make your website feel ready to use.</h2>
    <RouterLink to="/contact">Start a project</RouterLink>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import HeroSection from '../components/HeroSection.vue';
import { api } from '../services/api';

const projects = ref([]);
const skills = ref([]);
const facts = ref([]);
const fallbackImage = new URL('../../public/img/work/work-1.jpg', import.meta.url).href;
const featuredProjects = computed(() => {
  const featured = projects.value.filter((project) => project.is_featured);
  return (featured.length ? featured : projects.value).slice(0, 3);
});

function projectSummary(project) {
  if (Array.isArray(project.description)) {
    return project.description.find((block) => block?.content)?.content || '';
  }
  return project.description || '';
}

onMounted(async () => {
  document.title = 'Mugisha Prince | Web developer';
  api.getProfile().then((payload) => {
    const profile = payload.data || {};
    const ogImage = profile.og_image_url || profile.portrait_url;
    if (!ogImage) return;
    let meta = document.querySelector('meta[property="og:image"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', ogImage);
  }).catch(() => {});
  api.trackVisit().catch(() => {});
  try {
    const [projectPayload, skillPayload, factPayload] = await Promise.all([
      api.getProjects(),
      api.getSkills(),
      api.getFacts()
    ]);
    projects.value = projectPayload.data || [];
    skills.value = skillPayload.data || [];
    facts.value = factPayload.data || [];
  } catch {
    projects.value = [];
    skills.value = [];
    facts.value = [];
  }
});
</script>
