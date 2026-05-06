<template>
  <div class="social-icon-row" aria-label="Social links">
    <a v-for="link in links" :key="link.label" :href="link.href" target="_blank" rel="noreferrer" :aria-label="link.label">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path :d="link.path" />
      </svg>
    </a>
  </div>
</template>

<script setup>
const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/',
    path:
      'M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C18.6 5.4 19.6 5.7 19.6 5.7c.6 1.6.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    path:
      'M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.35 8h4.3v14H.35V8Zm7.7 0h4.12v1.9h.06c.57-1.08 1.98-2.23 4.08-2.23 4.36 0 5.17 2.87 5.17 6.6V22h-4.3v-6.85c0-1.63-.03-3.73-2.27-3.73-2.28 0-2.63 1.78-2.63 3.61V22H8.05V8Z'
  },
  {
    label: 'X',
    href: 'https://x.com/',
    path:
      'M18.9 2h3.3l-7.2 8.2L23.5 22h-6.7l-5.2-6.8L5.6 22H2.3l7.7-8.8L1.8 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L7.6 3.9H5.7L17.7 20Z'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    path:
      'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.8A4.2 4.2 0 1 1 12 16.2 4.2 4.2 0 0 1 12 7.8Zm0 2A2.2 2.2 0 1 0 12 14.2 2.2 2.2 0 0 0 12 9.8Zm4.7-3.1a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z'
  }
];
</script>
