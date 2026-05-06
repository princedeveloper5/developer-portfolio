<template>
  <section class="breadcrumb-option" style="background-image: url('/img/breadcrumb-bg.jpg')">
    <div class="breadcrumb__text">
      <h2>About</h2>
      <div class="breadcrumb__links">
        <RouterLink to="/">Home</RouterLink>
        <span>About</span>
      </div>
    </div>
  </section>

  <section class="about spad">
    <div class="container split-section">
      <div class="image-stack">
        <img src="/img/prince-images/pic1.jpg" alt="Mugisha Prince portrait" />
        <img src="/img/prince-images/profile-image.png" alt="Mugisha Prince profile cutout" />
      </div>
      <div class="about__text">
        <div class="section-title">
          <span>Software developer</span>
          <h2>Mugisha Prince</h2>
        </div>
        <p>
          This Vue portfolio follows the original Videograph page structure while turning it into a
          dynamic application. Projects, languages, and messages can be managed from the backend
          database.
        </p>
        <div class="stats-row">
          <article>
            <strong>Vue</strong>
            <span>Frontend</span>
          </article>
          <article>
            <strong>Node</strong>
            <span>API</span>
          </article>
          <article>
            <strong>MySQL</strong>
            <span>Database</span>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
