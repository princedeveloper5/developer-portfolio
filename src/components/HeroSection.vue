<template>
  <section id="home" class="split-hero modern-hero">
    <div class="container hero-content">
      <div class="hero-text">
        <h1>
          <span class="highlight">Mugisha Prince</span>
          <br />
          Full-Stack Developer
        </h1>
        <p>
          I build exceptional digital experiences with modern technologies. 
          Specializing in Vue.js, Node.js, and creating elegant solutions 
          that drive real results.
        </p>
        <div class="hero-actions">
          <RouterLink to="/projects" class="cta-button primary-action">
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
          <RouterLink to="/contact" class="cta-button secondary-action">
            Get In Touch
          </RouterLink>
        </div>
      </div>

      <div class="hero-image">
        <img src="/img/prince-images/profile-image.png" alt="Mugisha Prince - Full Stack Developer" />
        <div class="floating-card">
          <img class="avatar" src="/img/prince-images/profile-image.png" alt="Profile" />
          <div>
            <strong>Available for work</strong>
            <span>Let's build something great</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
