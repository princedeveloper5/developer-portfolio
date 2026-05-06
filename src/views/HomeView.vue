<template>
  <HeroSection />

  <!-- Stats Strip -->
  <section class="stats-strip">
    <div class="container">
      <div class="stats-grid">
        <article class="stat-item">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <strong class="stat-number">5+</strong>
          <span class="stat-label">Years Experience</span>
        </article>
        <article class="stat-item">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <strong class="stat-number">50+</strong>
          <span class="stat-label">Projects Completed</span>
        </article>
        <article class="stat-item">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <strong class="stat-number">30+</strong>
          <span class="stat-label">Happy Clients</span>
        </article>
        <article class="stat-item">
          <div class="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <strong class="stat-number">1000+</strong>
          <span class="stat-label">Hours Coded</span>
        </article>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="services-section">
    <div class="container">
      <div class="section-header">
        <span class="section-kicker">What I Do</span>
        <h2>Professional Services</h2>
        <p>I deliver high-quality digital solutions tailored to your needs, ensuring exceptional results that exceed expectations.</p>
      </div>
      <div class="services-grid">
        <article class="services-card">
          <div class="service-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <h4>Web Development</h4>
          <p>Modern, responsive websites built with cutting-edge technologies for optimal performance.</p>
        </article>
        <article class="services-card">
          <div class="service-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <h4>UI/UX Design</h4>
          <p>Intuitive and beautiful user interfaces that provide seamless user experiences.</p>
        </article>
        <article class="services-card">
          <div class="service-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 20V10"/>
              <path d="M12 20V4"/>
              <path d="M6 20v-6"/>
            </svg>
          </div>
          <h4>Backend APIs</h4>
          <p>Robust and scalable server-side solutions with Node.js and database integration.</p>
        </article>
        <article class="services-card">
          <div class="service-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h4>Full-Stack Solutions</h4>
          <p>End-to-end development from database to frontend, creating complete digital products.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Featured Projects Section -->
  <section class="featured-section">
    <div class="container">
      <div class="section-header">
        <span class="section-kicker">Portfolio</span>
        <h2>Featured Projects</h2>
        <p>A selection of my recent work showcasing creativity and technical expertise.</p>
      </div>
      <div class="featured-grid">
        <article class="featured-card">
          <div class="card-image">
            <img src="/img/portfolio/portfolio-1.jpg" alt="Project One" />
          </div>
          <div class="card-content">
            <h4>E-Commerce Platform</h4>
            <p>A full-featured online shopping platform with secure payments.</p>
            <div class="card-tags">
              <span>Vue.js</span>
              <span>Node.js</span>
              <span>MySQL</span>
            </div>
          </div>
        </article>
        <article class="featured-card">
          <div class="card-image">
            <img src="/img/portfolio/portfolio-2.jpg" alt="Project Two" />
          </div>
          <div class="card-content">
            <h4>Portfolio Dashboard</h4>
            <p>Dynamic admin dashboard for content management.</p>
            <div class="card-tags">
              <span>Vue.js</span>
              <span>API</span>
              <span>Auth</span>
            </div>
          </div>
        </article>
        <article class="featured-card">
          <div class="card-image">
            <img src="/img/portfolio/portfolio-3.jpg" alt="Project Three" />
          </div>
          <div class="card-content">
            <h4>Business Website</h4>
            <p>Professional corporate website with modern design.</p>
            <div class="card-tags">
              <span>HTML/CSS</span>
              <span>JavaScript</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="testimonials-section">
    <div class="container">
      <div class="section-header">
        <span class="section-kicker">Testimonials</span>
        <h2>Client Reviews</h2>
        <p>What my clients say about working with me.</p>
      </div>
      <div class="testimonials-grid">
        <article class="testimonial-card">
          <div class="quote-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v10h4l-2 4zm8 0h3l2-4V7h-10v10h4l-2 4z"/>
            </svg>
          </div>
          <blockquote>
            Excellent work! The project was delivered on time and exceeded our expectations. Very professional approach.
          </blockquote>
          <cite>
            <img class="avatar" src="/img/testimonial/ta-1.jpg" alt="Client One" />
            <div>
              <strong>John Smith</strong>
              <span>CEO, TechCorp</span>
            </div>
          </cite>
        </article>
        <article class="testimonial-card">
          <div class="quote-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v10h4l-2 4zm8 0h3l2-4V7h-10v10h4l-2 4z"/>
            </svg>
          </div>
          <blockquote>
            Great communication and technical skills. The website looks amazing and works perfectly across all devices.
          </blockquote>
          <cite>
            <img class="avatar" src="/img/testimonial/ta-2.jpg" alt="Client Two" />
            <div>
              <strong>Sarah Johnson</strong>
              <span>Marketing Director</span>
            </div>
          </cite>
        </article>
        <article class="testimonial-card">
          <div class="quote-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 17h3l2-4V7H5v10h4l-2 4zm8 0h3l2-4V7h-10v10h4l-2 4z"/>
            </svg>
          </div>
          <blockquote>
            Very reliable and skilled developer. Delivered exactly what we needed. Would highly recommend!
          </blockquote>
          <cite>
            <img class="avatar" src="/img/testimonial/ta-3.jpg" alt="Client Three" />
            <div>
              <strong>Michael Brown</strong>
              <span>Startup Founder</span>
            </div>
          </cite>
        </article>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="container">
      <h2>Let's Build Something Amazing Together</h2>
      <p>Ready to start your next project? Let's discuss how I can help bring your vision to life.</p>
      <div class="cta-buttons">
        <RouterLink to="/contact" class="cta-primary">
          Start a Project
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </RouterLink>
        <RouterLink to="/projects" class="cta-secondary">
          View All Work
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue';
</script>
