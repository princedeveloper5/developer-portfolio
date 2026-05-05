<template>
  <section v-if="!isAuthenticated" class="admin-login-page">
    <form class="admin-login-card" @submit.prevent="login">
      <RouterLink to="/">Back to portfolio</RouterLink>
      <h1>Admin login</h1>
      <label>Username<input v-model.trim="credentials.username" type="text" autocomplete="username" /></label>
      <label>Password<input v-model="credentials.password" type="password" autocomplete="current-password" /></label>
      <button type="submit" :disabled="status === 'loading'">{{ status === 'loading' ? 'Checking...' : 'Login' }}</button>
      <p v-if="notice">{{ notice }}</p>
    </form>
  </section>

  <section v-else :class="['admin-dashboard', { 'dark-theme': isDarkMode }]">
    <!-- Toast Container -->
    <Toast ref="toastRef" />
    
    <!-- Mobile Menu Toggle -->
    <button class="mobile-menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle menu">
      <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    
    <aside :class="{ 'mobile-open': mobileMenuOpen }">
      <RouterLink class="admin-brand" to="/"><span>MP</span><strong>Portavia</strong></RouterLink>
      <p>Menu</p>
      <button v-for="item in sections" :key="item.id" :class="{ active: active === item.id }" @click="active = item.id">
        <span class="menu-icon" v-html="icons[item.icon]"></span>{{ item.label }}
      </button>
      <p>General</p>
      <RouterLink to="/" class="menu-link">
        <span class="menu-icon" v-html="icons['external-link']"></span>View public site
      </RouterLink>
      <button @click="logout" class="menu-link">
        <span class="menu-icon" v-html="icons['logout']"></span>Logout
      </button>
      <article class="download-card">
        <strong>Download Our Mobile App</strong>
        <small>Get easy in another way!</small>
      </article>
    </aside>

    <main>
      <header class="admin-top">
        <div class="header-content">
          <h1>{{ active === 'overview' ? `Welcome, ${firstName}` : currentSection.label }}</h1>
          <span>{{ active === 'overview' ? 'Your personal dashboard overview' : 'Manage portfolio content' }}</span>
        </div>
        <div class="header-actions">
          <div class="search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="search" v-model="searchQuery" placeholder="Search projects..." />
          </div>
          <button class="notification-btn" @click="showNotifications = !showNotifications" :title="messages.filter(m => !m.is_read).length + ' unread messages'" :class="{ active: showNotifications }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span v-if="messages.filter(m => !m.is_read).length" class="badge">{{ messages.filter(m => !m.is_read).length }}</span>
          </button>
          
          <!-- Notification Dropdown -->
          <div v-if="showNotifications" class="notification-dropdown">
            <div class="notification-header">
              <strong>Notifications</strong>
              <button v-if="messages.length" @click="markAllRead" class="mark-read-btn">Mark all read</button>
            </div>
            <div v-if="messages.length === 0" class="notification-empty">
              No new notifications
            </div>
            <div v-else class="notification-list">
              <div v-for="msg in messages.slice(0, 5)" :key="msg.id" :class="['notification-item', { unread: !msg.is_read }]">
                <div class="notification-content">
                  <strong>{{ msg.name }}</strong>
                  <p>{{ msg.message.substring(0, 60) }}{{ msg.message.length > 60 ? '...' : '' }}</p>
                  <small>{{ formatTimeAgo(new Date(msg.created_at)) }}</small>
                </div>
                <button v-if="!msg.is_read" @click="markMessageRead(msg.id)" class="notification-mark" title="Mark as read">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="notification-footer">
              <button @click="active = 'messages'; showNotifications = false" class="view-all-btn">View all messages</button>
            </div>
          </div>
          <button class="theme-toggle" @click="toggleTheme" :title="isDarkMode ? 'Light mode' : 'Dark mode'">
            <svg v-if="isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
      </header>

      <section v-if="active === 'overview'" class="overview">
        <!-- Loading Skeletons -->
        <div v-if="loading" class="metric-row">
          <article v-for="i in 4" :key="i" class="skeleton-card">
            <div class="skeleton-line short"></div>
            <div class="skeleton-line large"></div>
            <div class="skeleton-line short"></div>
          </article>
        </div>
        <div v-else class="metric-row">
          <article v-for="(stat, index) in stats" :key="stat.label" :class="{ featured: index === 0 }">
            <span>{{ stat.label }}</span>
            <strong>{{ stat.value }}</strong>
            <small>{{ stat.note }}</small>
          </article>
        </div>

        <div class="dashboard-grid">
          <article class="chart-card">
            <h3>Home Visits</h3>
            <div v-if="loading" class="skeleton-chart"></div>
            <div v-else class="line-chart">
              <svg viewBox="0 0 700 230" role="img" aria-label="Seven day home visit chart">
                <polyline :points="visitChartPoints" />
              </svg>
              <div class="days"><span v-for="day in visitChartLabels" :key="day">{{ day }}</span></div>
            </div>
          </article>

          <!-- Activity Log -->
          <article class="side-card activity-log">
            <h3>Activity Log</h3>
            <div v-if="activityLog.length === 0" class="empty-state">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <p>No activity yet</p>
            </div>
            <div v-else class="activity-list">
              <div v-for="activity in (showAllActivity ? activityLog : activityLog.slice(0, 5))" :key="activity.id" class="activity-item">
                <div :class="['activity-icon', activity.type]">
                  <svg v-if="activity.type === 'add'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <svg v-else-if="activity.type === 'edit'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  <svg v-else-if="activity.type === 'delete'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  <svg v-else-if="activity.type === 'archive'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>
                  </svg>
                  <svg v-else-if="activity.type === 'reorder'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                  <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </div>
                <div class="activity-content">
                  <p>{{ activity.message }}</p>
                  <small>{{ formatTimeAgo(activity.timestamp) }}</small>
                </div>
              </div>
            </div>
            <button v-if="activityLog.length > 5" @click="showAllActivity = !showAllActivity" class="show-more-btn">
              {{ showAllActivity ? 'Show less' : 'Show all activity' }}
            </button>
          </article>
        </div>
      </section>

      <section v-if="active === 'profile'" class="admin-panel">
        <h2>Profile Settings</h2>
        <form class="admin-form" @submit.prevent="saveProfile">
          <div class="form-grid two-col">
            <div class="form-group">
              <label>Full Name</label>
              <input v-model.trim="profile.name" placeholder="John Doe" />
            </div>
            <div class="form-group">
              <label>Headline</label>
              <input v-model.trim="profile.headline" placeholder="Full Stack Developer" />
            </div>
          </div>

          <div class="form-group">
            <label>Introduction</label>
            <textarea v-model.trim="profile.intro" rows="4" placeholder="Brief introduction about yourself..."></textarea>
          </div>

          <div class="form-grid two-col">
            <div class="form-group">
              <label>Role (Left)</label>
              <input v-model.trim="profile.role_left" placeholder="Frontend Developer" />
            </div>
            <div class="form-group">
              <label>Role (Right)</label>
              <input v-model.trim="profile.role_right" placeholder="UI/UX Designer" />
            </div>
          </div>

          <div class="form-grid two-col">
            <div class="form-group">
              <label>Left Role Description</label>
              <textarea v-model.trim="profile.role_left_description" rows="3" placeholder="Describe your primary role..."></textarea>
            </div>
            <div class="form-group">
              <label>Right Role Description</label>
              <textarea v-model.trim="profile.role_right_description" rows="3" placeholder="Describe your secondary role..."></textarea>
            </div>
          </div>

          <div class="form-grid two-col">
            <FileUpload v-model="profile.portrait_url" label="Portrait Image" accept="image/*" />
            <FileUpload v-model="profile.og_image_url" label="OpenGraph Image" accept="image/*" />
          </div>

          <div class="form-grid two-col">
            <div class="form-group">
              <label>Portrait Alt Text</label>
              <input v-model.trim="profile.alt_text" placeholder="Professional headshot of John Doe" />
            </div>
            <div class="form-group">
              <label>Location</label>
              <input v-model.trim="profile.location" placeholder="San Francisco, CA" />
            </div>
          </div>

          <div class="form-group">
            <label>Contact Email</label>
            <input v-model.trim="profile.email" type="email" placeholder="john@example.com" />
          </div>

          <div class="form-group">
            <label>Phone Number</label>
            <input v-model.trim="profile.phone" placeholder="+250 7xx xxx xxx" />
          </div>

          <div class="admin-form-section">
            <h3>Social Media Links</h3>
            <p>Add the links once here, then the public contact page and footer will use them automatically.</p>
          </div>

          <div class="form-grid two-col">
            <div class="form-group">
              <label><i class="fa fa-github" aria-hidden="true"></i> GitHub URL</label>
              <input v-model.trim="profile.github_url" type="url" placeholder="https://github.com/username" />
            </div>
            <div class="form-group">
              <label><i class="fa fa-linkedin" aria-hidden="true"></i> LinkedIn URL</label>
              <input v-model.trim="profile.linkedin_url" type="url" placeholder="https://www.linkedin.com/in/username" />
            </div>
          </div>

          <div class="form-grid two-col">
            <div class="form-group">
              <label><i class="fa fa-instagram" aria-hidden="true"></i> Instagram URL</label>
              <input v-model.trim="profile.instagram_url" type="url" placeholder="https://www.instagram.com/username" />
            </div>
            <div class="form-group">
              <label><i class="fa fa-twitter" aria-hidden="true"></i> Twitter URL</label>
              <input v-model.trim="profile.twitter_url" type="url" placeholder="https://x.com/username" />
            </div>
          </div>

          <div class="form-grid two-col">
            <div class="form-group">
              <label><i class="fa fa-facebook" aria-hidden="true"></i> Facebook URL</label>
              <input v-model.trim="profile.facebook_url" type="url" placeholder="https://www.facebook.com/username" />
            </div>
            <div class="form-group">
              <label><i class="fa fa-download" aria-hidden="true"></i> CV / Resume URL</label>
              <input v-model.trim="profile.cv_url" placeholder="/Mugisha_Prince_CV.pdf or https://..." />
            </div>
          </div>

          <button :disabled="saving">
            <span v-if="saving">Saving...</span>
            <span v-else>Save Profile</span>
          </button>
        </form>
      </section>

      <section v-if="active === 'projects'" class="admin-editor-grid">
        <article class="admin-panel">
          <h2>{{ projectForm.id ? 'Edit project' : 'Add project' }}</h2>
          <form class="admin-form" @submit.prevent="saveProject">
            <div class="form-grid two-col">
              <div class="form-group">
                <label>Project Title</label>
                <input v-model.trim="projectForm.title" placeholder="My Awesome Project" />
              </div>
              <div class="form-group">
                <label>Tech Stack</label>
                <input v-model.trim="projectForm.tech_stack" placeholder="Vue, Node.js, MySQL" />
              </div>
            </div>

            <div class="form-grid two-col">
              <div class="form-group">
                <label>Status</label>
                <select v-model="projectForm.status">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div class="form-group">
                <label>Homepage Position</label>
                <input v-model.number="projectForm.position" type="number" min="0" placeholder="0" />
              </div>
            </div>

            <div class="form-group">
              <FileUpload v-model="projectForm.image_url" label="Project Image" accept="image/*" :default-aspect-ratio="16/9" />
            </div>

            <div class="form-group">
              <FileUpload v-model="projectForm.preview_video_url" label="Preview Video" accept="video/*" />
            </div>

            <div class="form-group">
              <label>Image Alt Text</label>
              <input v-model.trim="projectForm.alt_text" placeholder="Screenshot of project dashboard" />
            </div>

            <div class="form-group">
              <label>Short Description (for cards)</label>
              <textarea v-model.trim="projectForm.description_summary" rows="3" placeholder="Brief summary for project cards..."></textarea>
            </div>

            <div class="form-group">
              <label class="flex-label">
                Full Description
                <button type="button" class="preview-toggle" @click="showDescriptionPreview = !showDescriptionPreview">
                  {{ showDescriptionPreview ? 'Edit' : 'Preview' }}
                </button>
              </label>
              <div v-if="showDescriptionPreview" class="markdown-preview" v-html="formatMarkdown(projectForm.description)"></div>
              <textarea v-else v-model.trim="projectForm.description" rows="8" placeholder="Use **bold**, *italic*, or # headings"></textarea>
            </div>

            <div class="form-grid two-col">
              <div class="form-group">
                <label>Problem Statement</label>
                <textarea v-model.trim="projectForm.problem" rows="3" placeholder="What problem does this solve?"></textarea>
              </div>
              <div class="form-group">
                <label>Solution</label>
                <textarea v-model.trim="projectForm.solution" rows="3" placeholder="How does it solve it?"></textarea>
              </div>
            </div>

            <div class="form-group">
              <label>Key Features</label>
              <textarea v-model.trim="projectForm.features" rows="3" placeholder="List main features (one per line)"></textarea>
            </div>

            <div class="form-grid two-col">
              <div class="form-group">
                <label>Live URL</label>
                <input v-model.trim="projectForm.live_url" placeholder="https://example.com" />
              </div>
              <div class="form-group">
                <label>GitHub URL</label>
                <input v-model.trim="projectForm.github_url" placeholder="https://github.com/..." />
              </div>
            </div>

            <label class="check-row">
              <input v-model="projectForm.is_featured" type="checkbox" />
              <span>Featured project (appears on homepage)</span>
            </label>

            <!-- SEO Preview Panel -->
            <div class="seo-preview-section">
              <h4>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                SEO Preview
              </h4>

              <div class="seo-preview-tabs">
                <button :class="['seo-tab-btn', { active: activeSeoTab === 'google' }]" @click="activeSeoTab = 'google'">Google</button>
                <button :class="['seo-tab-btn', { active: activeSeoTab === 'twitter' }]" @click="activeSeoTab = 'twitter'">Twitter/X</button>
                <button :class="['seo-tab-btn', { active: activeSeoTab === 'linkedin' }]" @click="activeSeoTab = 'linkedin'">LinkedIn</button>
              </div>

              <div class="seo-score-card">
                <div :class="['seo-score-circle', seoScore.score >= 80 ? 'excellent' : seoScore.score >= 60 ? 'good' : seoScore.score >= 40 ? 'fair' : 'poor']">
                  {{ seoScore.score }}<span class="seo-score-label">Score</span>
                </div>
                <div class="seo-checklist">
                  <span v-for="check in seoScore.checks" :key="check" :class="['seo-check-item', { missing: check.startsWith('missing-') }]">
                    <svg v-if="!check.startsWith('missing-')" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {{ check.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                  </span>
                </div>
              </div>

              <div class="seo-preview-content">
                <!-- Google Preview -->
                <div v-if="activeSeoTab === 'google'" class="google-preview">
                  <div class="url">{{ seoUrl }} <span>> More results</span></div>
                  <a class="title">{{ seoTitle }}</a>
                  <div class="description">{{ seoDescription }}</div>
                </div>

                <!-- Twitter Preview -->
                <div v-if="activeSeoTab === 'twitter'" class="twitter-preview">
                  <div class="card-image">
                    <img v-if="seoImage" :src="seoImage" alt="" />
                    <span v-else>No image</span>
                  </div>
                  <div class="card-content">
                    <div class="card-title">{{ seoTitle }}</div>
                    <div class="card-description">{{ seoDescription }}</div>
                    <div class="card-url">{{ seoUrl }}</div>
                  </div>
                </div>

                <!-- LinkedIn Preview -->
                <div v-if="activeSeoTab === 'linkedin'" class="linkedin-preview">
                  <div class="post-header">
                    <div class="avatar">{{ profile.name?.charAt(0) || 'A' }}</div>
                    <div class="author-info">
                      <div class="author-name">{{ profile.name || 'Admin' }}</div>
                      <div class="author-headline">{{ profile.headline || 'Developer' }}</div>
                      <div class="post-time">Just now</div>
                    </div>
                  </div>
                  <div class="post-content">{{ seoDescription }}</div>
                  <div class="link-card">
                    <div class="link-image">
                      <img v-if="seoImage" :src="seoImage" alt="" />
                      <span v-else>No image</span>
                    </div>
                    <div class="link-title">{{ seoTitle }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button :disabled="saving">
                <span v-if="saving">Saving...</span>
                <span v-else>Save project</span>
              </button>
              <button v-if="projectForm.id" type="button" @click="resetProject">Cancel edit</button>
            </div>
          </form>
        </article>

        <!-- Project List -->
        <article class="admin-panel">
          <h2>Project list</h2>

          <!-- Filter & Reorder Controls -->
          <div class="list-controls">
            <div class="filter-tabs">
              <button :class="['filter-btn', { active: projectFilter === 'all' }]" @click="projectFilter = 'all'">All</button>
              <button :class="['filter-btn', { active: projectFilter === 'published' }]" @click="projectFilter = 'published'">Published</button>
              <button :class="['filter-btn', { active: projectFilter === 'draft' }]" @click="projectFilter = 'draft'">Drafts</button>
              <button :class="['filter-btn', { active: projectFilter === 'archived' }]" @click="projectFilter = 'archived'">Archived</button>
            </div>
            <button :class="['reorder-toggle', { active: reorderMode }]" @click="reorderMode = !reorderMode">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/>
                <circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>
              </svg>
              {{ reorderMode ? 'Done' : 'Reorder' }}
            </button>
          </div>

          <!-- Bulk Actions -->
          <div v-if="selectedProjects.length > 0" class="bulk-actions">
            <span class="bulk-count">{{ selectedProjects.length }} selected</span>
            <button @click="bulkToggleFeatured" title="Toggle featured status">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
            <button @click="bulkArchive" title="Archive selected">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/>
              </svg>
            </button>
            <button @click="bulkDelete" class="danger" title="Delete selected">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>

          <!-- Reorder Mode -->
          <div v-if="reorderMode" class="reorder-container">
            <div class="reorder-hint">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Drag items to reorder projects
            </div>
            <SortableList :items="filteredProjects" @update:items="handleReorder">
              <template #default="{ item }">
                <div class="reorder-project-item">
                  <img v-if="item.image_url" :src="item.image_url" class="reorder-thumb" alt="" />
                  <div v-else class="reorder-thumb-placeholder">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>
                  <div class="reorder-project-info">
                    <strong>{{ item.title }}</strong>
                    <div class="reorder-meta">
                      <span :class="['status-badge', 'mini', item.status || 'draft']">{{ item.status || 'draft' }}</span>
                      <span v-if="item.is_featured" class="featured-badge mini">Featured</span>
                    </div>
                  </div>
                </div>
              </template>
            </SortableList>
          </div>

          <!-- Normal Project List -->
          <div v-else class="admin-list">
            <div class="list-header">
              <label class="checkbox-wrapper">
                <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll">
              </label>
              <span>Project</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            <div v-if="loading" class="skeleton-list">
              <article v-for="i in 5" :key="i" class="skeleton-list-item">
                <div class="skeleton-thumb"></div>
                <div class="skeleton-text">
                  <div class="skeleton-line"></div>
                  <div class="skeleton-line short"></div>
                </div>
              </article>
            </div>
            <template v-else>
              <article v-for="project in paginatedProjects" :key="project.id">
                <label class="checkbox-wrapper">
                  <input type="checkbox" :value="project.id" v-model="selectedProjects">
                </label>
                <div class="project-info">
                  <strong>{{ project.title }}</strong>
                  <span class="project-meta">#{{ project.position || 0 }} / {{ project.tech_stack || 'No tech stack' }}</span>
                </div>
                <div class="project-status">
                  <span :class="['status-badge', project.status || 'draft']">{{ project.status || 'draft' }}</span>
                  <span v-if="project.is_featured" class="featured-badge">Featured</span>
                </div>
                <div class="project-actions">
                  <button @click="editProject(project)" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                  <button @click="confirmDelete('project', project)" title="Delete" class="danger">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </article>
            </template>
          </div>

          <!-- Pagination -->
          <div v-if="!reorderMode && totalPages > 1" class="pagination">
            <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
            <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </article>
      </section>

      <section v-if="active === 'skills'" class="admin-editor-grid">
        <EditorPanel title="Skills" :items="skills" :form="skillForm" name-label="Language or tool" value-label="Level" @save="saveSkill" @edit="editSkill" @remove="(id) => confirmDelete('skill', { id, title: 'this skill' })" @reset="resetSkill" />
      </section>

      <section v-if="active === 'facts'" class="admin-editor-grid">
        <EditorPanel title="Facts" :items="facts" :form="factForm" name-label="Label" value-label="Value" @save="saveFact" @edit="editFact" @remove="(id) => confirmDelete('fact', { id, title: 'this fact' })" @reset="resetFact" />
      </section>

      <section v-if="active === 'testimonials'" class="admin-editor-grid">
        <article class="admin-panel">
          <h2>{{ testimonialForm.id ? 'Edit testimonial' : 'Add testimonial' }}</h2>
          <form class="admin-form" @submit.prevent="saveTestimonial">
            <input v-model.trim="testimonialForm.name" placeholder="Name" />
            <input v-model.trim="testimonialForm.role" placeholder="Role" />
            <textarea v-model.trim="testimonialForm.quote" rows="5" placeholder="Quote"></textarea>
            <button>Save testimonial</button>
            <button v-if="testimonialForm.id" type="button" @click="resetTestimonial">Cancel edit</button>
          </form>
        </article>
        <article class="admin-panel">
          <h2>Testimonials</h2>
          <div class="admin-list">
            <article v-for="item in testimonials" :key="item.id">
              <div><strong>{{ item.name }}</strong><span>{{ item.role }}</span></div>
              <div><button @click="editTestimonial(item)">Edit</button><button @click="confirmDelete('testimonial', item)">Delete</button></div>
            </article>
          </div>
        </article>
      </section>

      <section v-if="active === 'messages'" class="admin-panel">
        <h2>Messages</h2>
        <div class="admin-list">
          <article v-for="message in messages" :key="message.id">
            <div><strong>{{ message.name }}</strong><span>{{ message.email }}</span><p>{{ message.message }}</p></div>
            <button @click="confirmDelete('message', message)">Delete</button>
          </article>
        </div>
      </section>
    </main>

    <div v-if="pendingDelete" class="modal-backdrop" role="dialog" aria-modal="true">
      <article class="confirm-modal">
        <h2>Confirm action</h2>
        <p>Delete {{ pendingDelete.label }}? This cannot be undone.</p>
        <div>
          <button type="button" @click="runDelete">Delete</button>
          <button type="button" @click="pendingDelete = null">Cancel</button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, reactive, ref, watch } from 'vue';
import { api } from '../services/api';
import FileUpload from '../components/FileUpload.vue';
import SortableList from '../components/SortableList.vue';
import Toast from '../components/Toast.vue';

const EditorPanel = defineComponent({
  props: {
    title: String,
    items: Array,
    form: Object,
    nameLabel: String,
    valueLabel: String
  },
  emits: ['save', 'edit', 'remove', 'reset'],
  setup(props, { emit }) {
    return () => [
      h('article', { class: 'admin-panel' }, [
        h('h2', props.form.id ? `Edit ${props.title}` : `Add ${props.title}`),
        h('form', { class: 'admin-form', onSubmit: (event) => { event.preventDefault(); emit('save'); } }, [
          h('input', { value: props.form.name || props.form.label, placeholder: props.nameLabel, onInput: (event) => { if ('name' in props.form) props.form.name = event.target.value; else props.form.label = event.target.value; } }),
          h('input', { value: props.form.level || props.form.value, placeholder: props.valueLabel, onInput: (event) => { if ('level' in props.form) props.form.level = event.target.value; else props.form.value = event.target.value; } }),
          h('button', 'Save'),
          props.form.id ? h('button', { type: 'button', onClick: () => emit('reset') }, 'Cancel edit') : null
        ])
      ]),
      h('article', { class: 'admin-panel' }, [
        h('h2', props.title),
        h('div', { class: 'admin-list' }, props.items.map((item) =>
          h('article', { key: item.id }, [
            h('div', [h('strong', item.name || item.label), h('span', item.level || item.value)]),
            h('div', [h('button', { onClick: () => emit('edit', item) }, 'Edit'), h('button', { onClick: () => emit('remove', item.id) }, 'Delete')])
          ])
        ))
      ])
    ];
  }
});

const credentials = reactive({ username: 'admin', password: '' });
const token = ref(window.localStorage.getItem('portfolio_admin_token') || '');
const isAuthenticated = computed(() => Boolean(token.value));
const status = ref('idle');
const notice = ref('');
const saving = ref(false);
const loading = ref(true);
const showDescriptionPreview = ref(false);
const showAllActivity = ref(false);
const activeSeoTab = ref('google');
const analyticsPeriod = ref('7d');
const reorderMode = ref(false);
const projectFilter = ref('all');
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const selectedProjects = ref([]);
const isDarkMode = ref(window.localStorage.getItem('portfolio_theme') === 'dark');
const active = ref('overview');

// Sync dark mode with document
watch(isDarkMode, (val) => {
  if (val) {
    document.documentElement.classList.add('dark-admin');
  } else {
    document.documentElement.classList.remove('dark-admin');
  }
}, { immediate: true });
const activityLog = ref([]);
const sections = [
  { id: 'overview', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'projects', label: 'Projects', icon: 'folder-kanban' },
  { id: 'skills', label: 'Skills', icon: 'zap' },
  { id: 'facts', label: 'Facts', icon: 'info' },
  { id: 'testimonials', label: 'Testimonials', icon: 'quote' },
  { id: 'messages', label: 'Messages', icon: 'mail' },
  { id: 'profile', label: 'Settings', icon: 'settings' }
];

// Icon SVG components
const icons = {
  'layout-dashboard': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
  'folder-kanban': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/></svg>',
  'zap': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  'info': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
  'quote': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>',
  'mail': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  'settings': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
  'external-link': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  'logout': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>'
};
const profile = reactive({
  name: 'Admin',
  headline: '',
  intro: '',
  role_left: '',
  role_left_description: '',
  role_right: '',
  role_right_description: '',
  portrait_url: '',
  og_image_url: '',
  alt_text: '',
  location: '',
  email: '',
  phone: '',
  github_url: '',
  linkedin_url: '',
  instagram_url: '',
  twitter_url: '',
  facebook_url: '',
  cv_url: ''
});
const projects = ref([]);
const skills = ref([]);
const facts = ref([]);
const testimonials = ref([]);
const messages = ref([]);
const emptyProject = () => ({ id: null, title: '', description: '[{"type":"text","content":""}]', description_summary: '', tech_stack: '', image_url: '', preview_video_url: '', alt_text: '', problem: '', solution: '', features: '', live_url: '', github_url: '', position: 0, is_featured: false });
const projectForm = reactive(emptyProject());
const projectImage = ref(null);
const projectVideo = ref(null);
const profileImage = ref(null);
const ogImage = ref(null);
const skillForm = reactive({ id: null, name: '', level: 80 });
const factForm = reactive({ id: null, label: '', value: '' });
const testimonialForm = reactive({ id: null, name: '', role: '', quote: '' });
const firstName = computed(() => (profile.name || 'Admin').split(' ')[0]);
const currentSection = computed(() => sections.find((section) => section.id === active.value) || sections[0]);
const stats = computed(() => [
  { label: 'Total Projects', value: projects.value.length || 104, note: 'Increased from last month' },
  { label: 'Pending Projects', value: projects.value.filter((project) => !project.is_featured).length || 12, note: 'Project on Discuss' },
  { label: 'Total Visits', value: analytics.value.totalVisits, note: 'Tracked from home page visits' },
  { label: 'Total Clients', value: 370 + messages.value.length, note: 'Increased from last month' }
]);
const analytics = ref({ totalVisits: 0, dailyVisits: [] });
const pendingDelete = ref(null);

// Toast reference
const toastRef = ref(null);

// UI State
const mobileMenuOpen = ref(false);
const showNotifications = ref(false);

// Toast helper
function showToast(message, type = 'info', duration = 4000) {
  toastRef.value?.addToast(message, type, duration);
}

// Notification functions
async function markMessageRead(id) {
  try {
    await api.markMessageRead(id);
    const msg = messages.value.find(m => m.id === id);
    if (msg) msg.is_read = true;
    showToast('Message marked as read', 'success');
  } catch (err) {
    showToast('Failed to mark message as read', 'error');
  }
}

async function markAllRead() {
  try {
    await api.markAllMessagesRead();
    messages.value.forEach(m => m.is_read = true);
    showToast('All messages marked as read', 'success');
  } catch (err) {
    showToast('Failed to mark messages as read', 'error');
  }
}

// Activity logging
function addActivity(type, message) {
  activityLog.value.unshift({
    id: Date.now(),
    type,
    message,
    timestamp: new Date()
  });
}

function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
const visitChartLabels = computed(() => {
  const rows = analytics.value.dailyVisits || [];
  return rows.length ? rows.map((row) => String(row.date).slice(5, 10)) : ['01', '02', '03', '04', '05', '06', '07'];
});
const visitChartPoints = computed(() => {
  const rows = analytics.value.dailyVisits || [];
  const visits = rows.length ? rows.map((row) => Number(row.visits || 0)) : [0, 0, 0, 0, 0, 0, 0];
  const max = Math.max(1, ...visits);
  return visits.map((value, index) => `${8 + index * (684 / Math.max(1, visits.length - 1))},${210 - (value / max) * 168}`).join(' ');
});

// Project filtering and pagination
const filteredProjects = computed(() => {
  let result = projects.value;
  if (projectFilter.value !== 'all') {
    result = result.filter(p => (p.status || 'draft') === projectFilter.value);
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter(p => p.title?.toLowerCase().includes(q) || p.tech_stack?.toLowerCase().includes(q));
  }
  return result;
});

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage));
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProjects.value.slice(start, start + itemsPerPage);
});
const isAllSelected = computed(() => paginatedProjects.value.length > 0 && paginatedProjects.value.every(p => selectedProjects.value.includes(p.id)));

// SEO Preview computed
const seoTitle = computed(() => projectForm.title || 'Untitled Project');
const seoDescription = computed(() => projectForm.description_summary || projectForm.description?.substring(0, 160) || 'No description available');
const seoUrl = computed(() => `https://yourdomain.com/projects/${projectForm.title?.toLowerCase().replace(/\s+/g, '-') || 'untitled'}`);
const seoImage = computed(() => projectForm.image_url || '/default-og-image.jpg');

const seoScore = computed(() => {
  let score = 0;
  const checks = [];
  if (seoTitle.value.length >= 30 && seoTitle.value.length <= 60) { score += 25; checks.push('optimal-title'); }
  else if (seoTitle.value.length > 0) { score += 15; checks.push('has-title'); }
  else { checks.push('missing-title'); }
  if (seoDescription.value.length >= 120 && seoDescription.value.length <= 160) { score += 25; checks.push('optimal-description'); }
  else if (seoDescription.value.length > 0) { score += 15; checks.push('has-description'); }
  else { checks.push('missing-description'); }
  if (projectForm.image_url) { score += 25; checks.push('has-image'); }
  else { checks.push('missing-image'); }
  if (projectForm.is_featured) { score += 15; checks.push('is-featured'); }
  else { checks.push('not-featured'); }
  if (projectForm.tech_stack) { score += 10; checks.push('has-keywords'); }
  return { score, checks };
});

// Analytics computed
const analyticsData = computed(() => {
  const days = analyticsPeriod.value === '7d' ? 7 : analyticsPeriod.value === '30d' ? 30 : 90;
  const baseViews = Math.floor(Math.random() * 500) + 100;
  const dailyViews = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dailyViews.push({ label: date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }), views: Math.floor(Math.random() * baseViews) + 50 });
  }
  return { dailyViews, viewsGrowth: Math.floor(Math.random() * 30) + 5, avgTime: `${Math.floor(Math.random() * 4) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`, newVisitors: Math.floor(Math.random() * 40) + 30, returnVisitors: Math.floor(Math.random() * 30) + 20, mobileTraffic: Math.floor(Math.random() * 50) + 30 };
});

const maxViews = computed(() => Math.max(...analyticsData.value.dailyViews.map(d => d.views), 1));
const totalViews = computed(() => analyticsData.value.dailyViews.reduce((sum, d) => sum + d.views, 0).toLocaleString());
const trafficSources = computed(() => [{ name: 'Direct', percentage: 35, color: '#0b87f4' }, { name: 'Search', percentage: 28, color: '#22c55e' }, { name: 'Social', percentage: 22, color: '#f59e0b' }, { name: 'Referral', percentage: 15, color: '#8b5cf6' }]);
const topProjectViews = computed(() => {
  const sorted = [...projects.value].sort((a, b) => (b.view_count || 0) - (a.view_count || 0)).slice(0, 5);
  const max = Math.max(...sorted.map(p => p.view_count || 0), 1);
  return sorted.map(p => ({ name: p.title?.substring(0, 25) + (p.title?.length > 25 ? '...' : '') || 'Untitled', views: (p.view_count || 0).toLocaleString(), percentage: Math.round(((p.view_count || 0) / max) * 100) }));
});

function getDonutOffset(index) {
  let offset = 0;
  for (let i = 0; i < index; i++) offset -= trafficSources.value[i].percentage * 2.51;
  return offset;
}

async function loadDashboard() {
  loading.value = true;
  try {
    const [profilePayload, projectPayload, skillPayload, factPayload, testimonialPayload, messagePayload, analyticsPayload] = await Promise.all([
      api.getProfile(), api.getProjects(), api.getSkills(), api.getFacts(), api.getTestimonials(), api.getMessages(), api.getAnalytics()
    ]);
    Object.assign(profile, profilePayload.data);
    projects.value = projectPayload.data;
    skills.value = skillPayload.data;
    facts.value = factPayload.data;
    testimonials.value = testimonialPayload.data;
    messages.value = messagePayload.data;
    analytics.value = analyticsPayload.data;
    addActivity('info', `Dashboard loaded. Welcome back, ${firstName.value}!`);
  } catch (error) {
    notice.value = error.message;
  } finally {
    loading.value = false;
  }
}

// Helper functions
function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  window.localStorage.setItem('portfolio_theme', isDarkMode.value ? 'dark' : 'light');
}

function formatMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n/gim, '<br>');
}

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedProjects.value = selectedProjects.value.filter(id => !paginatedProjects.value.find(p => p.id === id));
  } else {
    const newIds = paginatedProjects.value.map(p => p.id).filter(id => !selectedProjects.value.includes(id));
    selectedProjects.value = [...selectedProjects.value, ...newIds];
  }
}

function bulkArchive() {
  const count = selectedProjects.value.length;
  if (count === 0) return;
  projects.value = projects.value.map(p => selectedProjects.value.includes(p.id) ? { ...p, status: 'archived' } : p);
  addActivity('archive', `Archived ${count} project${count > 1 ? 's' : ''}`);
  selectedProjects.value = [];
}

function bulkDelete() {
  const count = selectedProjects.value.length;
  if (count === 0) return;
  projects.value = projects.value.filter(p => !selectedProjects.value.includes(p.id));
  addActivity('delete', `Deleted ${count} project${count > 1 ? 's' : ''}`);
  selectedProjects.value = [];
}

function bulkToggleFeatured() {
  const count = selectedProjects.value.length;
  if (count === 0) return;
  projects.value = projects.value.map(p => selectedProjects.value.includes(p.id) ? { ...p, is_featured: !p.is_featured } : p);
  addActivity('edit', `Toggled featured status for ${count} project${count > 1 ? 's' : ''}`);
  selectedProjects.value = [];
}

function handleReorder({ items }) {
  projects.value = items.map((p, i) => ({ ...p, position: i + 1 }));
  api.reorderProjects(items.map(p => p.id));
  addActivity('reorder', 'Project order updated');
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
}
async function login() {
  status.value = 'loading';
  notice.value = '';
  try {
    const payload = await api.login(credentials);
    token.value = payload.data.token;
    window.localStorage.setItem('portfolio_admin_token', token.value);
    await loadDashboard();
  } catch (error) {
    notice.value = error.message;
  } finally {
    status.value = 'idle';
  }
}
function logout() { token.value = ''; window.localStorage.removeItem('portfolio_admin_token'); }
function upsert(list, item) { const index = list.value.findIndex((old) => old.id === item.id); if (index >= 0) list.value[index] = item; else list.value.unshift(item); }
function resetProject() { Object.assign(projectForm, emptyProject()); projectImage.value = null; projectVideo.value = null; }
function editProject(project) {
  Object.assign(projectForm, {
    ...emptyProject(),
    ...project,
    description: JSON.stringify(project.description || [{ type: 'text', content: project.description_summary || '' }], null, 2),
    is_featured: Boolean(project.is_featured)
  });
  projectImage.value = null;
  projectVideo.value = null;
}
function onProjectImageChange(event) { projectImage.value = event.target.files?.[0] || null; }
function onProjectVideoChange(event) { projectVideo.value = event.target.files?.[0] || null; }
function onProfileImageChange(event) { profileImage.value = event.target.files?.[0] || null; }
function onOgImageChange(event) { ogImage.value = event.target.files?.[0] || null; }
function toProjectFormData() {
  const data = new FormData();
  Object.entries(projectForm).forEach(([key, value]) => data.append(key, value ?? ''));
  if (projectImage.value) data.append('image', projectImage.value);
  if (projectVideo.value) data.append('preview_video', projectVideo.value);
  return data;
}
function toProfileFormData() {
  const data = new FormData();
  Object.entries(profile).forEach(([key, value]) => data.append(key, value ?? ''));
  if (profileImage.value) data.append('portrait', profileImage.value);
  if (ogImage.value) data.append('og_image', ogImage.value);
  return data;
}
async function saveProject() {
  saving.value = true;
  try {
    const payload = projectForm.id
      ? await api.updateProjectWithUpload(projectForm.id, toProjectFormData())
      : await api.createProjectWithUpload(toProjectFormData());
    upsert(projects, payload.data);
    addActivity(projectForm.id ? 'edit' : 'add', `${projectForm.id ? 'Updated' : 'Created'} project "${projectForm.title}"`);
    resetProject();
  } finally {
    saving.value = false;
  }
}
async function removeProject(id) {
  const project = projects.value.find(p => p.id === id);
  await api.deleteProject(id);
  projects.value = projects.value.filter((item) => item.id !== id);
  addActivity('delete', `Deleted project "${project?.title || 'Untitled'}"`);
}
async function saveProfile() {
  saving.value = true;
  try {
    const payload = await api.updateProfileWithUpload(toProfileFormData());
    Object.assign(profile, payload.data);
    profileImage.value = null;
    ogImage.value = null;
    addActivity('edit', 'Updated profile settings');
  } finally {
    saving.value = false;
  }
}
const draggedProjectIndex = ref(null);
async function dropProject(index) {
  if (draggedProjectIndex.value === null || draggedProjectIndex.value === index) return;
  const nextProjects = [...projects.value];
  const [moved] = nextProjects.splice(draggedProjectIndex.value, 1);
  nextProjects.splice(index, 0, moved);
  projects.value = nextProjects.map((project, projectIndex) => ({ ...project, position: projectIndex + 1 }));
  draggedProjectIndex.value = null;
  await api.reorderProjects(projects.value.map((project) => project.id));
}
function resetSkill() { Object.assign(skillForm, { id: null, name: '', level: 80 }); }
function editSkill(skill) { Object.assign(skillForm, skill); }
async function saveSkill() {
  const payload = skillForm.id ? await api.updateSkill(skillForm) : await api.createSkill(skillForm);
  upsert(skills, payload.data);
  addActivity(skillForm.id ? 'edit' : 'add', `${skillForm.id ? 'Updated' : 'Created'} skill "${skillForm.name}"`);
  resetSkill();
}
async function removeSkill(id) {
  const skill = skills.value.find(s => s.id === id);
  await api.deleteSkill(id);
  skills.value = skills.value.filter((item) => item.id !== id);
  addActivity('delete', `Deleted skill "${skill?.name || 'Untitled'}"`);
}
function resetFact() { Object.assign(factForm, { id: null, label: '', value: '' }); }
function editFact(fact) { Object.assign(factForm, fact); }
async function saveFact() {
  const payload = factForm.id ? await api.updateFact(factForm) : await api.createFact(factForm);
  upsert(facts, payload.data);
  addActivity(factForm.id ? 'edit' : 'add', `${factForm.id ? 'Updated' : 'Created'} fact "${factForm.label}"`);
  resetFact();
}
async function removeFact(id) {
  const fact = facts.value.find(f => f.id === id);
  await api.deleteFact(id);
  facts.value = facts.value.filter((item) => item.id !== id);
  addActivity('delete', `Deleted fact "${fact?.label || 'Untitled'}"`);
}
function resetTestimonial() { Object.assign(testimonialForm, { id: null, name: '', role: '', quote: '' }); }
function editTestimonial(testimonial) { Object.assign(testimonialForm, testimonial); }
async function saveTestimonial() {
  const payload = testimonialForm.id ? await api.updateTestimonial(testimonialForm) : await api.createTestimonial(testimonialForm);
  upsert(testimonials, payload.data);
  addActivity(testimonialForm.id ? 'edit' : 'add', `${testimonialForm.id ? 'Updated' : 'Created'} testimonial from "${testimonialForm.name}"`);
  resetTestimonial();
}
async function removeTestimonial(id) {
  const testimonial = testimonials.value.find(t => t.id === id);
  await api.deleteTestimonial(id);
  testimonials.value = testimonials.value.filter((item) => item.id !== id);
  addActivity('delete', `Deleted testimonial from "${testimonial?.name || 'Unknown'}"`);
}
async function removeMessage(id) {
  const message = messages.value.find(m => m.id === id);
  await api.deleteMessage(id);
  messages.value = messages.value.filter((item) => item.id !== id);
  addActivity('delete', `Deleted message from "${message?.name || 'Unknown'}"`);
}
function confirmDelete(type, item) {
  pendingDelete.value = { type, id: item.id, label: item.title || item.name || item.label || item.email || 'this item' };
}
async function runDelete() {
  const action = pendingDelete.value;
  pendingDelete.value = null;
  if (!action) return;
  if (action.type === 'project') await removeProject(action.id);
  if (action.type === 'skill') await removeSkill(action.id);
  if (action.type === 'fact') await removeFact(action.id);
  if (action.type === 'testimonial') await removeTestimonial(action.id);
  if (action.type === 'message') await removeMessage(action.id);
}

onMounted(async () => {
  if (isAuthenticated.value) {
    try { await loadDashboard(); } catch { logout(); }
  }
});
</script>
