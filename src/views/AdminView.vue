<template>
  <section v-if="!isAuthenticated" class="admin-redirect">
    <p>Redirecting to login...</p>
  </section>

  <section v-else class="admin-dashboard-shell">
    <button
      type="button"
      class="admin-mobile-toggle"
      @click="sidebarOpen = !sidebarOpen"
      aria-label="Toggle menu"
    >
      <svg v-if="!sidebarOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div
      v-if="sidebarOpen"
      class="admin-sidebar-overlay visible"
      @click="sidebarOpen = false"
    ></div>

    <aside class="admin-sidebar" :class="sidebarOpen ? 'mobile-visible' : ''">
      <RouterLink class="admin-logo" to="/">
        <span class="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </span>
        <strong>B PRINCE</strong>
      </RouterLink>

      <p class="admin-menu-label">Menu</p>
      <nav class="admin-menu" aria-label="Admin sections">
        <button
          v-for="item in adminSections"
          :key="item.id"
          type="button"
          :class="{ active: activeSection === item.id }"
          @click="activeSection = item.id; sidebarOpen = false"
        >
          <span class="admin-menu-icon">
            <svg v-if="item.icon === 'dashboard'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <svg v-else-if="item.icon === 'folder'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <svg v-else-if="item.icon === 'image'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <svg v-else-if="item.icon === 'message'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <svg v-else-if="item.icon === 'users'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <svg v-else-if="item.icon === 'file-text'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <svg v-else-if="item.icon === 'zap'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <svg v-else-if="item.icon === 'bar-chart'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="20" x2="12" y2="10"/>
              <line x1="18" y1="20" x2="18" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="16"/>
            </svg>
            <svg v-else-if="item.icon === 'info'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <svg v-else-if="item.icon === 'quote'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3"/>
            </svg>
            <svg v-else-if="item.icon === 'mail'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <svg v-else-if="item.icon === 'settings'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </span>
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div class="admin-sidebar-actions">
        <p class="admin-menu-label">General</p>
        <RouterLink to="/" class="sidebar-action">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          Help
        </RouterLink>
        <button type="button" class="sidebar-action logout" @click="logout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>

      <article class="admin-app-card">
        <span>down</span>
        <strong>Download Our Mobile App</strong>
        <small>Get easy in another way!</small>
      </article>
    </aside>

    <main class="admin-workspace">
      <!-- Notification Banner -->
      <div v-if="notice" class="admin-notification" :class="{ 'notification-success': notice.includes('saved') || notice.includes('Success'), 'notification-error': notice.includes('error') || notice.includes('Failed') }">
        <span>{{ notice }}</span>
        <button type="button" class="notification-close" @click="notice = ''">×</button>
      </div>

      <header class="admin-topbar">
        <div class="admin-welcome">
          <img :src="profileForm.portrait_url || '/img/prince-images/profile-image.png'" alt="Profile" />
          <div class="welcome-text">
            <h1>
              <span class="wave-emoji">👋</span>
              {{ activeSection === 'overview' ? `Welcome, ${firstName}` : currentSectionLabel }}
            </h1>
            <span class="welcome-subtitle">{{ activeSection === 'overview' ? 'Your Personal Dashboard Overview' : 'Manage portfolio content' }}</span>
          </div>
        </div>
        <div class="admin-topbar-actions">
          <!-- Global Search -->
          <div class="admin-search">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              v-model="adminSearch"
              type="text"
              placeholder="Search projects, skills..."
              @keyup.enter="handleSearch"
            />
          </div>

          <!-- Dark Mode Toggle -->
          <button
            type="button"
            class="theme-toggle"
            @click="toggleDarkMode"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>

          <!-- Messages Notification Bell -->
          <button
            type="button"
            class="notification-bell"
            :class="{ 'has-unread': unreadMessagesCount > 0 }"
            @click="activeSection = 'messages'"
            title="Messages"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span v-if="unreadMessagesCount > 0" class="notification-badge">{{ unreadMessagesCount }}</span>
          </button>

          <button type="button" class="quick-action-btn" @click="activeSection = 'projects'; resetProject()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Project
          </button>
          <div class="admin-profile-dropdown">
            <button
              type="button"
              class="admin-profile-btn"
              @click="profileDropdownOpen = !profileDropdownOpen"
            >
              <img :src="profileForm.portrait_url || '/img/prince-images/profile-image.png'" alt="Profile" />
              <span>{{ firstName }}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div v-if="profileDropdownOpen" class="admin-dropdown-menu">
              <button type="button" @click="activeSection = 'profile'; profileDropdownOpen = false">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
                Settings
              </button>
              <button type="button" @click="logout">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Breadcrumbs -->
      <nav class="admin-breadcrumbs" v-if="activeSection !== 'overview'">
        <span class="breadcrumb-item" @click="activeSection = 'overview'">Dashboard</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item active">{{ currentSectionLabel }}</span>
      </nav>

      <section v-if="activeSection === 'overview'" class="admin-overview">
        <!-- Loading Skeleton for Stats -->
        <div v-if="loading" class="admin-stats-grid">
          <article v-for="n in 4" :key="n" class="stat-card skeleton-card">
            <div class="skeleton-header">
              <div class="skeleton-text short"></div>
              <div class="skeleton-icon"></div>
            </div>
            <div class="skeleton-number"></div>
            <div class="skeleton-bar"></div>
          </article>
        </div>

        <!-- Actual Stats -->
        <div v-else class="admin-stats-grid">
          <article v-for="(stat, index) in dashboardStats" :key="stat.label" class="stat-card" :class="{ 'stat-featured': index === 0 }">
            <div class="stat-header">
              <span class="stat-label">{{ stat.label }}</span>
              <span class="stat-trend" :class="{ 'trend-up': stat.trend === 'up', 'trend-down': stat.trend === 'down' }">
                <svg v-if="stat.trend === 'up'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
                <svg v-else-if="stat.trend === 'down'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="7" y1="7" x2="17" y2="17"/>
                  <polyline points="17 7 17 17 7 17"/>
                </svg>
              </span>
            </div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-footer">
              <span v-if="stat.badge" class="stat-badge" :class="stat.badgeClass">{{ stat.badge }}</span>
              <span class="stat-note">{{ stat.note }}</span>
            </div>
          </article>
        </div>

        <!-- Analytics Section -->
        <div v-if="!loading" class="analytics-section">
          <div class="analytics-header">
            <h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 20V10"/>
                <path d="M12 20V4"/>
                <path d="M6 20v-6"/>
              </svg>
              Analytics Overview
            </h2>
            <div class="analytics-filters">
              <button
                v-for="period in ['7d', '30d', '90d']"
                :key="period"
                type="button"
                :class="['filter-btn', { active: analyticsPeriod === period }]"
                @click="analyticsPeriod = period"
              >
                {{ period === '7d' ? 'Last 7 Days' : period === '30d' ? 'Last 30 Days' : 'Last 90 Days' }}
              </button>
            </div>
          </div>

          <div class="analytics-grid">
            <!-- Views Chart -->
            <article class="admin-card analytics-card wide">
              <div class="admin-card-heading">
                <h3>Page Views</h3>
                <span class="trend-up">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                  +{{ analyticsData.viewsGrowth }}%
                </span>
              </div>
              <div class="chart-container">
                <div class="bar-chart">
                  <div
                    v-for="(day, index) in analyticsData.dailyViews"
                    :key="index"
                    class="bar-item"
                  >
                    <div class="bar" :style="{ height: `${(day.views / maxViews) * 100}%` }">
                      <span class="bar-value">{{ day.views }}</span>
                    </div>
                    <span class="bar-label">{{ day.label }}</span>
                  </div>
                </div>
              </div>
            </article>

            <!-- Traffic Sources -->
            <article class="admin-card analytics-card">
              <div class="admin-card-heading">
                <h3>Traffic Sources</h3>
              </div>
              <div class="donut-chart">
                <svg viewBox="0 0 100 100" class="donut">
                  <circle
                    v-for="(source, index) in trafficSources"
                    :key="source.name"
                    class="donut-segment"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    :stroke="source.color"
                    :stroke-width="20"
                    :stroke-dasharray="`${source.percentage * 2.51} ${251 - source.percentage * 2.51}`"
                    :stroke-dashoffset="getDonutOffset(index)"
                  />
                  <text x="50" y="50" text-anchor="middle" class="donut-center">
                    {{ totalViews }}
                  </text>
                  <text x="50" y="58" text-anchor="middle" class="donut-label">Total</text>
                </svg>
              </div>
              <div class="legend">
                <div v-for="source in trafficSources" :key="source.name" class="legend-item">
                  <span class="legend-color" :style="{ background: source.color }"></span>
                  <span class="legend-name">{{ source.name }}</span>
                  <span class="legend-value">{{ source.percentage }}%</span>
                </div>
              </div>
            </article>

            <!-- Top Projects Bar Chart -->
            <article class="admin-card analytics-card">
              <div class="admin-card-heading">
                <h3>Project Views</h3>
              </div>
              <div class="horizontal-bars">
                <div
                  v-for="project in topProjectViews"
                  :key="project.name"
                  class="h-bar-item"
                >
                  <div class="h-bar-label">
                    <span class="project-name">{{ project.name }}</span>
                    <span class="project-value">{{ project.views }}</span>
                  </div>
                  <div class="h-bar-track">
                    <div class="h-bar-fill" :style="{ width: `${project.percentage}%` }"></div>
                  </div>
                </div>
              </div>
            </article>

            <!-- Key Metrics -->
            <article class="admin-card analytics-card metrics-card">
              <div class="admin-card-heading">
                <h3>Key Metrics</h3>
              </div>
              <div class="metrics-grid">
                <div class="metric-item">
                  <div class="metric-icon bounce">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </div>
                  <div class="metric-info">
                    <span class="metric-value">{{ analyticsData.avgTime }}</span>
                    <span class="metric-label">Avg. Time on Site</span>
                  </div>
                </div>
                <div class="metric-item">
                  <div class="metric-icon new">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="8.5" cy="7" r="4"/>
                      <line x1="20" y1="8" x2="20" y2="14"/>
                      <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                  </div>
                  <div class="metric-info">
                    <span class="metric-value">{{ analyticsData.newVisitors }}%</span>
                    <span class="metric-label">New Visitors</span>
                  </div>
                </div>
                <div class="metric-item">
                  <div class="metric-icon return">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 14 4 9l5-5"/>
                      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/>
                    </svg>
                  </div>
                  <div class="metric-info">
                    <span class="metric-value">{{ analyticsData.returnVisitors }}%</span>
                    <span class="metric-label">Return Visitors</span>
                  </div>
                </div>
                <div class="metric-item">
                  <div class="metric-icon mobile">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  </div>
                  <div class="metric-info">
                    <span class="metric-value">{{ analyticsData.mobileTraffic }}%</span>
                    <span class="metric-label">Mobile Traffic</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="admin-dashboard-grid">
          <div class="admin-main-column">
            <article class="admin-card admin-chart-card">
              <div class="admin-card-heading">
                <h3>Top Performing Projects</h3>
                <span>01-07 May</span>
              </div>
              <div class="admin-line-chart" aria-label="Top performing projects chart">
                <div class="admin-chart-y">
                  <span>10h</span>
                  <span>8h</span>
                  <span>6h</span>
                  <span>4h</span>
                  <span>2h</span>
                  <span>0h</span>
                </div>
                <div class="admin-chart-stage">
                  <svg viewBox="0 0 700 230" role="img" aria-label="Project performance trend">
                    <path class="chart-area" d="M8 180 C90 105 138 124 205 152 C255 174 292 92 340 116 C392 144 442 134 484 126 C540 112 552 34 610 50 C650 62 658 50 692 42 L692 230 L8 230 Z" />
                    <path class="chart-line" d="M8 180 C90 105 138 124 205 152 C255 174 292 92 340 116 C392 144 442 134 484 126 C540 112 552 34 610 50 C650 62 658 50 692 42" />
                    <path class="chart-line-alt" d="M8 185 C84 202 110 146 178 166 C240 184 250 114 312 132 C388 144 412 185 468 146 C516 110 550 166 600 72 C635 38 660 120 692 106" />
                    <circle cx="292" cy="92" r="7" />
                  </svg>
                  <div class="admin-tooltip-card">
                    <strong>03 May 2025</strong>
                    <span><i></i>This Month <b>6 Hours</b></span>
                    <span><i></i>Last Month <b>3 Hours</b></span>
                  </div>
                  <div class="admin-chart-days">
                    <span>01</span>
                    <span>02</span>
                    <span class="active">03</span>
                    <span>04</span>
                    <span>05</span>
                    <span>06</span>
                    <span>07</span>
                  </div>
                </div>
              </div>
            </article>

            <article class="admin-card admin-table-card">
              <div class="admin-card-heading">
                <h3>Blogs</h3>
                <button type="button">View All</button>
              </div>
              <div class="admin-blog-table">
                <div class="admin-blog-head">
                  <span>Title</span>
                  <span>Date</span>
                  <span>Categories</span>
                  <span>Viewers</span>
                  <span>Last Edit</span>
                </div>
                <article v-for="blog in blogRows" :key="blog.title">
                  <strong>{{ blog.title }}</strong>
                  <span>{{ blog.date }}</span>
                  <span>{{ blog.category }}</span>
                  <span>{{ blog.viewers }}</span>
                  <span>{{ blog.updated }}</span>
                </article>
              </div>
            </article>
          </div>

          <aside class="admin-right-rail">
            <article class="admin-card admin-activity-card">
              <div class="admin-card-heading">
                <h3>Projects</h3>
              </div>
              <div class="admin-project-feed">
                <article v-for="(project, index) in topProjects" :key="project.id">
                  <span :class="`project-feed-icon tone-${index % 5}`">{{ project.title.charAt(0) }}</span>
                  <div>
                    <strong>{{ project.title }}</strong>
                    <small>{{ project.is_featured ? 'Completed' : 'Under Review' }}</small>
                  </div>
                </article>
                <p v-if="!topProjects.length">No projects yet.</p>
              </div>
            </article>

            <article class="admin-card admin-reminder-card">
              <h3>Reminders</h3>
              <div class="admin-reminder">
                <b></b>
                <div>
                  <strong>Carefully craft at 2:00PM</strong>
                  <span>Check messages and portfolio updates.</span>
                </div>
              </div>
            </article>

            <article class="admin-card admin-activity-log">
              <div class="admin-card-heading">
                <h3>Activity Log</h3>
                <span class="activity-count">{{ activityLog.length }} recent</span>
              </div>
              <div class="activity-list">
                <div v-for="activity in activityLog.slice(0, 8)" :key="activity.id" class="activity-item">
                  <div class="activity-icon" :class="`activity-${activity.type}`">
                    <svg v-if="activity.type === 'create'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <svg v-else-if="activity.type === 'update'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    <svg v-else-if="activity.type === 'delete'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <div class="activity-content">
                    <p class="activity-text">{{ activity.text }}</p>
                    <span class="activity-time">{{ formatActivityTime(activity.timestamp) }}</span>
                  </div>
                </div>
                <p v-if="!activityLog.length" class="activity-empty">No recent activity</p>
              </div>
              <button v-if="activityLog.length > 8" type="button" class="view-all-activity" @click="showAllActivity = true">
                View all activity
              </button>
            </article>
          </aside>
        </div>

        <article class="admin-card admin-table-card admin-message-card">
          <div class="admin-card-heading">
            <h3>Latest Messages</h3>
            <button type="button" @click="activeSection = 'messages'">View all</button>
          </div>
          <div class="admin-table">
            <div class="admin-table-head">
              <span>Name</span>
              <span>Email</span>
              <span>Message</span>
            </div>
            <article v-for="message in latestMessages" :key="message.id">
              <strong>{{ message.name }}</strong>
              <span>{{ message.email }}</span>
              <p>{{ message.message }}</p>
            </article>
            <p v-if="!latestMessages.length" class="admin-empty">No messages yet.</p>
          </div>
        </article>
      </section>

      <section v-if="activeSection === 'profile'" class="admin-card admin-form-card">
        <div class="admin-card-heading">
          <h3>Profile Settings</h3>
          <span v-if="profileForm.updated_at" class="last-updated">Last saved: {{ new Date(profileForm.updated_at).toLocaleString() }}</span>
        </div>
        <form class="stack-form admin-profile-form" @submit.prevent="saveProfile">
          <!-- Basic Info Section -->
          <div class="form-section">
            <h4 class="form-section-title">Basic Information</h4>

            <div class="profile-photo-section">
              <div class="photo-preview-wrapper">
                <img
                  :src="profileForm.portrait_url || '/img/prince-images/profile-image.png'"
                  alt="Profile Preview"
                  class="profile-photo-preview"
                />
                <button
                  v-if="profileForm.portrait_url"
                  type="button"
                  class="remove-photo-btn"
                  @click="profileForm.portrait_url = ''"
                  title="Remove photo"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div class="photo-upload-area">
                <label class="field-label" style="margin-bottom: 0;">
                  <span>Profile Photo</span>
                  <FileUpload
                    v-model="profileForm.portrait_url"
                    label=""
                    placeholder="Click or drag to upload photo (JPG, PNG, max 2MB)"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <label class="field-label">
              <span>Full Name <span class="required">*</span></span>
              <input v-model.trim="profileForm.name" type="text" placeholder="e.g., Mugisha Prince" required />
            </label>

            <label class="field-label">
              <span>Professional Headline <span class="required">*</span></span>
              <input v-model.trim="profileForm.headline" type="text" placeholder="e.g., Developer who designs useful web systems..." required />
            </label>

            <label class="field-label">
              <span>Bio / Introduction <span class="required">*</span></span>
              <textarea v-model.trim="profileForm.intro" rows="4" placeholder="Write a short introduction about yourself and your work..." required></textarea>
              <span class="char-counter">{{ profileForm.intro?.length || 0 }} characters</span>
            </label>
          </div>

          <!-- Hero Roles Section -->
          <div class="form-section">
            <h4 class="form-section-title">Homepage Hero Roles</h4>
            <p class="section-hint">These appear on your portfolio homepage as your two main roles/specialties.</p>

            <div class="form-row">
              <label class="field-label half">
                <span>Left Role Title</span>
                <input v-model.trim="profileForm.role_left" type="text" placeholder="e.g., Designer" />
              </label>

              <label class="field-label half">
                <span>Right Role Title</span>
                <input v-model.trim="profileForm.role_right" type="text" placeholder="e.g., Coder" />
              </label>
            </div>

            <label class="field-label">
              <span>Left Role Description</span>
              <textarea v-model.trim="profileForm.role_left_description" rows="3" placeholder="Describe what you do as a designer..."></textarea>
            </label>

            <label class="field-label">
              <span>Right Role Description</span>
              <textarea v-model.trim="profileForm.role_right_description" rows="3" placeholder="Describe what you do as a developer..."></textarea>
            </label>
          </div>

          <!-- Social Links Section -->
          <div class="form-section">
            <h4 class="form-section-title">Social Links</h4>
            <p class="section-hint">Add your social media and professional profiles.</p>

            <div class="form-row">
              <label class="field-label half">
                <span>GitHub</span>
                <input v-model.trim="profileForm.github_url" type="url" placeholder="https://github.com/username" />
              </label>

              <label class="field-label half">
                <span>LinkedIn</span>
                <input v-model.trim="profileForm.linkedin_url" type="url" placeholder="https://linkedin.com/in/username" />
              </label>
            </div>

            <div class="form-row">
              <label class="field-label half">
                <span>Twitter / X</span>
                <input v-model.trim="profileForm.twitter_url" type="url" placeholder="https://twitter.com/username" />
              </label>

              <label class="field-label half">
                <span>Website / Portfolio</span>
                <input v-model.trim="profileForm.website_url" type="url" placeholder="https://yourwebsite.com" />
              </label>
            </div>
          </div>

          <!-- Contact Info Section -->
          <div class="form-section">
            <h4 class="form-section-title">Contact Information</h4>

            <div class="form-row">
              <label class="field-label half">
                <span>Location</span>
                <input v-model.trim="profileForm.location" type="text" placeholder="e.g., Rwanda" />
              </label>

              <label class="field-label half">
                <span>Email <span class="required">*</span></span>
                <input v-model.trim="profileForm.email" type="email" placeholder="your@email.com" required />
              </label>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="form-actions">
            <button class="site-btn" type="submit" :disabled="saving">
              <span v-if="saving">Saving...</span>
              <span v-else>Save Profile</span>
            </button>
            <button class="ghost-button" type="button" @click="loadDashboard">Reset Changes</button>
            <a href="/" target="_blank" class="preview-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Public Profile
            </a>
          </div>
        </form>
      </section>

      <section v-if="activeSection === 'projects'" class="admin-management-grid">
        <article class="admin-card admin-form-card">
          <h3>{{ projectForm.id ? 'Edit project' : 'Add new project' }}</h3>
          <form class="stack-form admin-project-form" @submit.prevent="saveProject">
            <!-- Basic Info Section -->
            <div class="form-section">
              <h4 class="form-section-title">Basic Information</h4>

              <label class="field-label">
                <span>Project Title <span class="required">*</span></span>
                <input v-model.trim="projectForm.title" type="text" placeholder="e.g., E-Commerce Dashboard" required />
              </label>

              <label class="field-label">
                <span>Project Category</span>
                <select v-model="projectForm.category" class="form-select">
                  <option value="fullstack">Full Stack</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="api">API</option>
                  <option value="mobile">Mobile App</option>
                  <option value="gallery">Gallery</option>
                  <option value="message">Message</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label class="field-label">
                <span>Project Image</span>
                <FileUpload
                  v-model="projectForm.image_url"
                  label=""
                  placeholder="Click or drag to upload project thumbnail"
                  accept="image/*"
                />
              </label>

              <label class="field-label">
                <span class="field-header">
                  Short Description <span class="required">*</span>
                  <button type="button" class="preview-toggle" @click="showDescriptionPreview = !showDescriptionPreview">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    {{ showDescriptionPreview ? 'Edit' : 'Preview' }}
                  </button>
                </span>
                <textarea
                  v-if="!showDescriptionPreview"
                  v-model.trim="projectForm.description"
                  rows="4"
                  placeholder="Brief overview of what this project does (supports **bold**, *italic*, [links](url))"
                  required
                ></textarea>
                <div v-else class="markdown-preview">
                  <div v-if="projectForm.description" v-html="formatMarkdown(projectForm.description)"></div>
                  <p v-else class="preview-empty">No description to preview. Switch back to edit mode to add content.</p>
                </div>
              </label>
            </div>

            <!-- Project Details Section -->
            <div class="form-section">
              <h4 class="form-section-title">Project Details</h4>

              <label class="field-label">
                <span>Problem Statement</span>
                <textarea v-model.trim="projectForm.problem" rows="3" placeholder="What problem does this project solve?"></textarea>
              </label>

              <label class="field-label">
                <span>Solution / Approach</span>
                <textarea v-model.trim="projectForm.solution" rows="4" placeholder="How did you build it? Tech stack, architecture, key decisions"></textarea>
              </label>

              <label class="field-label">
                <span>Key Features</span>
                <textarea v-model.trim="projectForm.features" rows="3" placeholder="List main features separated by commas"></textarea>
              </label>

              <label class="field-label">
                <span>Outcomes / Results</span>
                <textarea v-model.trim="projectForm.outcomes" rows="3" placeholder="What value did this project deliver? Metrics, achievements"></textarea>
              </label>
            </div>

            <!-- Links Section -->
            <div class="form-section">
              <h4 class="form-section-title">Links</h4>

              <label class="field-label">
                <span>Tech Stack</span>
                <input v-model.trim="projectForm.tech_stack" type="text" placeholder="React, Node.js, PostgreSQL, AWS" />
              </label>

              <label class="field-label">
                <span>Live Demo URL</span>
                <input v-model.trim="projectForm.live_url" type="url" placeholder="https://your-project.com" />
              </label>

              <label class="field-label">
                <span>GitHub Repository</span>
                <input v-model.trim="projectForm.github_url" type="url" placeholder="https://github.com/username/repo" />
              </label>
            </div>

            <!-- Settings Section -->
            <div class="form-section">
              <h4 class="form-section-title">Settings</h4>

              <div class="form-row">
                <label class="field-label half">
                  <span>Status</span>
                  <select v-model="projectForm.status" class="form-select">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>

                <label class="field-label half">
                  <span>Visibility</span>
                  <select v-model="projectForm.visibility" class="form-select">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </label>
              </div>

              <label class="field-label half">
                <span>Completion Date</span>
                <input v-model="projectForm.completed_date" type="date" />
              </label>

              <label class="checkbox-row featured-checkbox">
                <input v-model="projectForm.is_featured" type="checkbox" />
                <span>Featured project (show on homepage)</span>
              </label>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button class="site-btn" type="submit">
                {{ projectForm.id ? 'Update Project' : 'Create Project' }}
              </button>
              <button v-if="projectForm.id" class="ghost-button" type="button" @click="resetProject">
                Cancel
              </button>
              <button v-else class="ghost-button" type="button" @click="resetProject">
                Clear Form
              </button>
            </div>
          </form>
        </article>

        <!-- SEO Preview Panel -->
        <article v-if="projectForm.title || projectForm.description" class="admin-card seo-preview-card">
          <div class="admin-card-heading">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              SEO & Social Preview
            </h3>
            <span class="seo-status" :class="seoScoreClass">{{ seoScore }}/100</span>
          </div>

          <div class="seo-tabs">
            <button
              type="button"
              class="seo-tab"
              :class="{ active: activeSeoTab === 'google' }"
              @click="activeSeoTab = 'google'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              class="seo-tab"
              :class="{ active: activeSeoTab === 'twitter' }"
              @click="activeSeoTab = 'twitter'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X/Twitter
            </button>
            <button
              type="button"
              class="seo-tab"
              :class="{ active: activeSeoTab === 'linkedin' }"
              @click="activeSeoTab = 'linkedin'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
          </div>

          <!-- Google Preview -->
          <div v-if="activeSeoTab === 'google'" class="seo-preview google-preview">
            <div class="google-url">
              <span class="site-name">princesingh.com</span>
              <span class="path">/projects/{{ projectSlug }}</span>
            </div>
            <div class="google-title">{{ truncatedTitle }}</div>
            <div class="google-description">{{ truncatedDescription }}</div>
            <div class="google-meta">
              <span v-if="projectForm.is_featured" class="google-badge">★ Featured</span>
              <span v-if="projectForm.status === 'published'" class="google-date">{{ formatDate(new Date()) }}</span>
            </div>
          </div>

          <!-- Twitter/X Preview -->
          <div v-else-if="activeSeoTab === 'twitter'" class="seo-preview twitter-preview">
            <div class="twitter-card">
              <img v-if="projectForm.image_url" :src="projectForm.image_url" alt="" class="twitter-image">
              <div v-else class="twitter-image-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div class="twitter-content">
                <div class="twitter-title">{{ truncatedTitle }}</div>
                <div class="twitter-description">{{ truncatedDescription }}</div>
                <div class="twitter-domain">princesingh.com</div>
              </div>
            </div>
          </div>

          <!-- LinkedIn Preview -->
          <div v-else-if="activeSeoTab === 'linkedin'" class="seo-preview linkedin-preview">
            <div class="linkedin-card">
              <img v-if="projectForm.image_url" :src="projectForm.image_url" alt="" class="linkedin-image">
              <div v-else class="linkedin-image-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <div class="linkedin-content">
                <div class="linkedin-title">{{ truncatedTitle }}</div>
                <div class="linkedin-description">{{ truncatedDescription }}</div>
                <div class="linkedin-footer">
                  <span class="linkedin-author">{{ profileForm.name || 'Prince Singh' }}</span>
                  <span class="linkedin-dot">•</span>
                  <span class="linkedin-domain">princesingh.com</span>
                </div>
              </div>
            </div>
          </div>

          <!-- SEO Score & Tips -->
          <div class="seo-tips">
            <h4>SEO Checklist</h4>
            <ul>
              <li :class="{ pass: projectForm.title?.length >= 30 && projectForm.title?.length <= 60 }">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline v-if="projectForm.title?.length >= 30 && projectForm.title?.length <= 60" points="20 6 9 17 4 12"/>
                  <circle v-else cx="12" cy="12" r="10"/>
                </svg>
                Title length (30-60 chars): {{ projectForm.title?.length || 0 }}
              </li>
              <li :class="{ pass: projectForm.description?.length >= 120 && projectForm.description?.length <= 160 }">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline v-if="projectForm.description?.length >= 120 && projectForm.description?.length <= 160" points="20 6 9 17 4 12"/>
                  <circle v-else cx="12" cy="12" r="10"/>
                </svg>
                Description (120-160 chars): {{ projectForm.description?.length || 0 }}
              </li>
              <li :class="{ pass: projectForm.image_url }">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline v-if="projectForm.image_url" points="20 6 9 17 4 12"/>
                  <circle v-else cx="12" cy="12" r="10"/>
                </svg>
                Has thumbnail image
              </li>
              <li :class="{ pass: projectForm.status === 'published' }">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline v-if="projectForm.status === 'published'" points="20 6 9 17 4 12"/>
                  <circle v-else cx="12" cy="12" r="10"/>
                </svg>
                Published status
              </li>
            </ul>
          </div>
        </article>

        <article class="admin-card admin-list-card">
          <div class="admin-card-heading">
            <h3>{{ reorderMode ? 'Reorder Projects' : `Your Projects (${filteredProjects.length})` }}</h3>
            <div class="list-filters">
              <button
                v-if="projectFilter === 'all' && !reorderMode"
                type="button"
                class="filter-btn reorder-toggle"
                :class="{ active: reorderMode }"
                @click="reorderMode = true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
                Reorder
              </button>
              <template v-if="!reorderMode">
                <span
                  class="filter-badge"
                  :class="{ active: projectFilter === 'all' }"
                  @click="projectFilter = 'all'"
                >All</span>
                <span
                  class="filter-badge"
                  :class="{ active: projectFilter === 'published' }"
                  @click="projectFilter = 'published'"
                >Published</span>
                <span
                  class="filter-badge"
                  :class="{ active: projectFilter === 'draft' }"
                  @click="projectFilter = 'draft'"
                >Draft</span>
                <span
                  class="filter-badge"
                  :class="{ active: projectFilter === 'archived' }"
                  @click="projectFilter = 'archived'"
                >Archived</span>
              </template>
              <button
                v-else
                type="button"
                class="filter-btn"
                @click="saveProjectOrder"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Done
              </button>
            </div>
          </div>

          <!-- Bulk Actions Toolbar -->
          <div v-if="selectedProjects.length > 0" class="bulk-actions-bar">
            <span class="bulk-count">{{ selectedProjects.length }} selected</span>
            <div class="bulk-buttons">
              <button type="button" class="bulk-btn" @click="bulkPublish">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Publish
              </button>
              <button type="button" class="bulk-btn" @click="bulkDraft">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                </svg>
                Draft
              </button>
              <button type="button" class="bulk-btn" @click="bulkArchive">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="21 8 21 21 3 21 3 8"/>
                  <rect x="1" y="3" width="22" height="5"/>
                  <line x1="10" y1="12" x2="14" y2="12"/>
                </svg>
                Archive
              </button>
              <button type="button" class="bulk-btn delete" @click="bulkDelete">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Delete
              </button>
              <button type="button" class="bulk-btn ghost" @click="selectedProjects = []">
                Clear
              </button>
            </div>
          </div>

          <!-- Loading Skeleton for Projects -->
          <div v-if="loading" class="admin-list project-list">
            <div v-for="n in 5" :key="n" class="admin-row skeleton-row">
              <div class="skeleton-project-info">
                <div class="skeleton-checkbox"></div>
                <div class="skeleton-thumb"></div>
                <div class="skeleton-project-details">
                  <div class="skeleton-text medium"></div>
                  <div class="skeleton-text short"></div>
                </div>
              </div>
              <div class="skeleton-actions">
                <div class="skeleton-icon"></div>
                <div class="skeleton-icon"></div>
              </div>
            </div>
          </div>

          <div v-else class="admin-list project-list">
            <!-- Select All Header -->
            <div v-if="paginatedProjects.length > 0" class="list-header">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                />
                <span>Select all on page</span>
              </label>
            </div>

            <article v-for="project in paginatedProjects" :key="project.id" class="admin-row project-row" :class="{ selected: selectedProjects.includes(project.id) }">
              <div class="project-info">
                <label class="row-checkbox">
                  <input
                    type="checkbox"
                    :value="project.id"
                    v-model="selectedProjects"
                  />
                </label>
                <img v-if="project.image_url" :src="project.image_url" alt="" class="project-thumb" />
                <div class="project-details">
                  <div class="project-header">
                    <strong>{{ project.title || 'Untitled Project' }}</strong>
                    <span class="status-badge" :class="`status-${project.status || 'draft'}`">{{ (project.status || 'draft').toUpperCase() }}</span>
                    <span v-if="project.is_featured" class="featured-badge">★ Featured</span>
                  </div>
                  <div class="project-meta">
                    <span class="category-tag">{{ project.category || 'Other' }}</span>
                    <span v-if="project.tech_stack" class="tech-stack">{{ project.tech_stack }}</span>
                    <span v-if="project.visibility === 'private'" class="visibility-badge">🔒 Private</span>
                  </div>
                </div>
              </div>
              <div class="row-actions">
                <button type="button" class="action-icon-btn" @click="editProject(project)" title="Edit project">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button type="button" class="action-icon-btn delete" @click="removeProject(project.id)" title="Delete project">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            </article>
            <p v-if="!filteredProjects.length && !reorderMode" class="admin-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; opacity: 0.3;">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
              <br>No projects yet. Create your first project above!
            </p>

            <!-- Reorder Mode Sortable List -->
            <div v-if="reorderMode" class="reorder-container">
              <div class="reorder-hint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Drag and drop items to reorder them
              </div>
              <SortableList
                v-model:items="projects"
                :item-key="item => item.id"
                @reorder="onProjectsReordered"
              >
                <template #default="{ item }">
                  <div class="reorder-project-item">
                    <img v-if="item.image_url" :src="item.image_url" alt="" class="reorder-thumb">
                    <div v-else class="reorder-thumb-placeholder">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                    <div class="reorder-project-info">
                      <strong>{{ item.title || 'Untitled Project' }}</strong>
                      <span class="reorder-meta">
                        <span :class="`status-badge mini status-${item.status || 'draft'}`">{{ (item.status || 'draft').toUpperCase() }}</span>
                        <span class="category-tag mini">{{ item.category || 'Other' }}</span>
                      </span>
                    </div>
                  </div>
                </template>
              </SortableList>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="pagination">
              <button
                type="button"
                class="pagination-btn"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
                Previous
              </button>
              <div class="pagination-pages">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  type="button"
                  class="pagination-page"
                  :class="{ active: page === currentPage }"
                  @click="currentPage = page"
                >
                  {{ page }}
                </button>
              </div>
              <button
                type="button"
                class="pagination-btn"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </article>
      </section>

      <section v-if="activeSection === 'skills'" class="admin-management-grid">
        <article class="admin-card admin-form-card">
          <h3>{{ skillForm.id ? 'Edit skill' : 'Add new skill' }}</h3>
          <form class="stack-form admin-skill-form" @submit.prevent="saveSkill">
            <label class="field-label">
              <span>Skill Name <span class="required">*</span></span>
              <input v-model.trim="skillForm.name" type="text" placeholder="e.g., JavaScript, React, Node.js" required />
            </label>
            <label class="field-label">
              <span>Proficiency Level (0-100)</span>
              <div class="level-input-wrapper">
                <input v-model.number="skillForm.level" type="range" min="0" max="100" class="level-slider" />
                <span class="level-value">{{ skillForm.level }}%</span>
              </div>
            </label>
            <div class="form-actions">
              <button class="site-btn" type="submit">{{ skillForm.id ? 'Update Skill' : 'Add Skill' }}</button>
              <button v-if="skillForm.id" class="ghost-button" type="button" @click="resetSkill">Cancel</button>
              <button v-else class="ghost-button" type="button" @click="resetSkill">Clear</button>
            </div>
          </form>
        </article>
        <AdminList title="Skills" :items="skills" value-key="level" suffix="%" @edit="editSkill" @remove="removeSkill" />
      </section>

      <section v-if="activeSection === 'facts'" class="admin-management-grid">
        <article class="admin-card admin-form-card">
          <h3>{{ factForm.id ? 'Edit fact' : 'Add new fact' }}</h3>
          <form class="stack-form admin-fact-form" @submit.prevent="saveFact">
            <label class="field-label">
              <span>Fact Label <span class="required">*</span></span>
              <input v-model.trim="factForm.label" type="text" placeholder="e.g., Years Experience, Projects Completed" required />
            </label>
            <label class="field-label">
              <span>Fact Value <span class="required">*</span></span>
              <input v-model.trim="factForm.value" type="text" placeholder="e.g., 5+ years, 50+ projects" required />
            </label>
            <div class="form-actions">
              <button class="site-btn" type="submit">{{ factForm.id ? 'Update Fact' : 'Add Fact' }}</button>
              <button v-if="factForm.id" class="ghost-button" type="button" @click="resetFact">Cancel</button>
              <button v-else class="ghost-button" type="button" @click="resetFact">Clear</button>
            </div>
          </form>
        </article>
        <AdminList title="Facts" :items="facts" value-key="value" @edit="editFact" @remove="removeFact" />
      </section>

      <section v-if="activeSection === 'testimonials'" class="admin-management-grid">
        <article class="admin-card admin-form-card">
          <h3>{{ testimonialForm.id ? 'Edit testimonial' : 'Add new testimonial' }}</h3>
          <form class="stack-form admin-testimonial-form" @submit.prevent="saveTestimonial">
            <label class="field-label">
              <span>Client Name <span class="required">*</span></span>
              <input v-model.trim="testimonialForm.name" type="text" placeholder="e.g., John Smith" required />
            </label>
            <label class="field-label">
              <span>Client Role / Company</span>
              <input v-model.trim="testimonialForm.role" type="text" placeholder="e.g., CEO at TechCorp" />
            </label>
            <label class="field-label">
              <span>Testimonial Quote <span class="required">*</span></span>
              <textarea v-model.trim="testimonialForm.quote" rows="5" placeholder="What did they say about your work?" required></textarea>
            </label>
            <div class="form-actions">
              <button class="site-btn" type="submit">{{ testimonialForm.id ? 'Update Testimonial' : 'Add Testimonial' }}</button>
              <button v-if="testimonialForm.id" class="ghost-button" type="button" @click="resetTestimonial">Cancel</button>
              <button v-else class="ghost-button" type="button" @click="resetTestimonial">Clear</button>
            </div>
          </form>
        </article>
        <AdminList
          title="Testimonials"
          :items="testimonials"
          value-key="role"
          @edit="editTestimonial"
          @remove="removeTestimonial"
        />
      </section>

      <section v-if="activeSection === 'messages'" class="admin-card admin-list-card">
        <div class="admin-card-heading">
          <h3>Contact Messages ({{ messages.length }})</h3>
        </div>
        <div class="admin-list message-list">
          <article v-for="message in messages" :key="message.id" class="admin-row message-row">
            <div class="message-content">
              <div class="message-header">
                <strong>{{ message.name }}</strong>
                <span class="message-email">{{ message.email }}</span>
                <span class="message-date">{{ message.created_at ? new Date(message.created_at).toLocaleDateString() : 'Recently' }}</span>
              </div>
              <p class="message-text">{{ message.message }}</p>
            </div>
            <div class="row-actions">
              <a v-if="message.email" :href="`mailto:${message.email}`" class="action-btn reply" title="Reply via email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <button type="button" class="action-btn delete" @click="removeMessage(message.id)" title="Delete message">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </article>
          <p v-if="!messages.length" class="admin-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; opacity: 0.3;">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <br>No messages yet.
          </p>
        </div>
      </section>
    </main>
  </section>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, reactive, ref, watch } from 'vue';
import { api } from '../services/api';
import FileUpload from '../components/FileUpload.vue';
import SortableList from '../components/SortableList.vue';

const AdminList = defineComponent({
  props: {
    title: { type: String, required: true },
    items: { type: Array, required: true },
    valueKey: { type: String, required: true },
    suffix: { type: String, default: '' }
  },
  emits: ['edit', 'remove'],
  setup(props, { emit }) {
    // Icon mapping for empty states
    const emptyIcons = {
      'Skills': 'zap',
      'Facts': 'info',
      'Testimonials': 'quote'
    };

    return () =>
      h('article', { class: 'admin-card admin-list-card' }, [
        h('h3', props.title),
        h(
          'div',
          { class: 'admin-list' },
          props.items.length
            ? props.items.map((item) =>
                h('article', { class: 'admin-row', key: item.id }, [
                  h('div', { class: 'row-content' }, [
                    h('strong', item.name || item.label || item.title || 'Untitled'),
                    h('span', { class: 'row-value' }, `${item[props.valueKey] || ''}${props.suffix}`)
                  ]),
                  h('div', { class: 'row-actions' }, [
                    h('button', {
                      type: 'button',
                      class: 'action-icon-btn',
                      onClick: () => emit('edit', item),
                      title: 'Edit'
                    }, [
                      h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
                        h('path', { d: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }),
                        h('path', { d: 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' })
                      ])
                    ]),
                    h('button', {
                      type: 'button',
                      class: 'action-icon-btn delete',
                      onClick: () => emit('remove', item.id),
                      title: 'Delete'
                    }, [
                      h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
                        h('polyline', { points: '3 6 5 6 21 6' }),
                        h('path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' })
                      ])
                    ])
                  ])
                ])
              )
            : [
                h('div', { class: 'admin-empty-state' }, [
                  h('div', { class: 'empty-icon' }, [
                    h('svg', { width: 64, height: 64, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 1 }, [
                      // Default empty icon
                      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2, ry: 2 }),
                      h('line', { x1: 12, y1: 8, x2: 12, y2: 16 }),
                      h('line', { x1: 8, y1: 12, x2: 16, y2: 12 })
                    ])
                  ]),
                  h('p', { class: 'empty-title' }, `No ${props.title.toLowerCase()} yet`),
                  h('p', { class: 'empty-hint' }, `Create your first ${props.title.toLowerCase().slice(0, -1)} using the form above.`)
                ])
              ]
        )
      ]);
  }
});

const adminSections = [
  { id: 'overview', label: 'Dashboard', icon: 'dashboard' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'skills', label: 'Skills', icon: 'zap' },
  { id: 'facts', label: 'Facts', icon: 'info' },
  { id: 'testimonials', label: 'Testimonials', icon: 'quote' },
  { id: 'messages', label: 'Messages', icon: 'mail' },
  { id: 'profile', label: 'Settings', icon: 'settings' }
];

const token = ref(window.localStorage.getItem('portfolio_admin_token') || window.sessionStorage.getItem('portfolio_admin_token') || '');
const isAuthenticated = computed(() => Boolean(token.value));
const activeSection = ref('overview');
const notice = ref('');
const adminSearch = ref('');
const sidebarOpen = ref(false);
const profileDropdownOpen = ref(false);
const saving = ref(false);
const loading = ref(true);
const showDescriptionPreview = ref(false);
const showAllActivity = ref(false);
const activeSeoTab = ref('google');
const analyticsPeriod = ref('7d');
const reorderMode = ref(false);
const isDarkMode = ref(window.localStorage.getItem('portfolio_theme') === 'dark' ||
  (!window.localStorage.getItem('portfolio_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches));

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  window.localStorage.setItem('portfolio_theme', isDarkMode.value ? 'dark' : 'light');
  // Apply theme to body
  if (isDarkMode.value) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

// Apply initial theme
onMounted(() => {
  if (isDarkMode.value) {
    document.body.classList.add('dark-theme');
  }
});

const formErrors = reactive({
  profile: {},
  project: {},
  skill: {},
  fact: {},
  testimonial: {}
});

// Validation helper
function validateField(formName, field, value, rules) {
  const errors = [];
  if (rules.required && !value) {
    errors.push(`${field} is required`);
  }
  if (rules.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errors.push('Please enter a valid email address');
  }
  if (rules.url && value && !/^https?:\/\/.+/.test(value)) {
    errors.push('URL must start with http:// or https://');
  }
  if (rules.minLength && value && value.length < rules.minLength) {
    errors.push(`${field} must be at least ${rules.minLength} characters`);
  }

  formErrors[formName][field] = errors;
  return errors.length === 0;
}

function clearFormErrors(formName) {
  Object.keys(formErrors[formName]).forEach(key => {
    formErrors[formName][key] = [];
  });
}

const profileForm = reactive({
  name: '',
  role_left: '',
  role_left_description: '',
  role_right: '',
  role_right_description: '',
  headline: '',
  intro: '',
  portrait_url: '',
  location: '',
  email: '',
  github_url: '',
  linkedin_url: '',
  twitter_url: '',
  website_url: '',
  updated_at: null
});
const emptyProject = () => ({
  id: null,
  title: '',
  category: 'fullstack',
  description: '',
  tech_stack: '',
  image_url: '/img/work/work-1.jpg',
  problem: '',
  solution: '',
  features: '',
  outcomes: '',
  live_url: '',
  github_url: '',
  completed_date: '',
  status: 'draft',
  visibility: 'public',
  is_featured: false
});
const projectForm = reactive(emptyProject());
const skillForm = reactive({ id: null, name: '', level: 80 });
const factForm = reactive({ id: null, label: '', value: '' });
const testimonialForm = reactive({ id: null, name: '', role: '', quote: '' });
const projects = ref([]);
const skills = ref([]);
const facts = ref([]);
const testimonials = ref([]);
const messages = ref([]);

const currentSectionLabel = computed(
  () => adminSections.find((section) => section.id === activeSection.value)?.label || 'Dashboard'
);

const dashboardStats = computed(() => [
  { label: 'Total Projects', value: projects.value.length || 104, badge: '+3', badgeClass: 'badge-green', note: 'Increased from last month', trend: 'up' },
  { label: 'Pending Projects', value: pendingProjects.value || 12, badge: '', badgeClass: '', note: 'Project on Discuss', trend: 'up' },
  { label: 'Total Visit', value: totalVisits.value || 1087, badge: '+670', badgeClass: 'badge-green', note: 'Increased from last month', trend: 'up' },
  { label: 'Total Clients', value: totalClients.value || 370, badge: '+12', badgeClass: 'badge-green', note: 'Increased from last month', trend: 'up' }
]);

const topProjects = computed(() => projects.value.slice(0, 5));
const latestMessages = computed(() => messages.value.slice(0, 4));
const pendingProjects = computed(() => projects.value.filter((project) => !project.is_featured).length);
const totalVisits = computed(() => 1087 + projects.value.length * 13 + messages.value.length * 7);
const totalClients = computed(() => 370 + testimonials.value.length + facts.value.length);
const firstName = computed(() => (profileForm.name || 'Prince').split(' ')[0]);
const unreadMessagesCount = computed(() => messages.value.filter(m => !m.read).length || 0);

// Project list filtering, pagination, and bulk actions
const projectFilter = ref('all');
const currentPage = ref(1);
const itemsPerPage = 10;
const selectedProjects = ref([]);

const filteredProjects = computed(() => {
  let filtered = projects.value;
  if (projectFilter.value !== 'all') {
    filtered = filtered.filter(p => p.status === projectFilter.value);
  }
  return filtered;
});

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage));

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProjects.value.slice(start, end);
});

const isAllSelected = computed(() => {
  return paginatedProjects.value.length > 0 &&
    paginatedProjects.value.every(p => selectedProjects.value.includes(p.id));
});

function toggleSelectAll() {
  if (isAllSelected.value) {
    // Deselect all on current page
    paginatedProjects.value.forEach(p => {
      const index = selectedProjects.value.indexOf(p.id);
      if (index > -1) {
        selectedProjects.value.splice(index, 1);
      }
    });
  } else {
    // Select all on current page
    paginatedProjects.value.forEach(p => {
      if (!selectedProjects.value.includes(p.id)) {
        selectedProjects.value.push(p.id);
      }
    });
  }
}

// Bulk actions
async function bulkPublish() {
  if (!confirm(`Publish ${selectedProjects.value.length} projects?`)) return;
  const count = selectedProjects.value.length;
  for (const id of selectedProjects.value) {
    const project = projects.value.find(p => p.id === id);
    if (project) {
      project.status = 'published';
      await api.updateProject(project);
    }
  }
  selectedProjects.value = [];
  notice.value = 'Projects published successfully!';
  addActivity('update', `Bulk published ${count} projects`);
  setTimeout(() => notice.value = '', 3000);
}

async function bulkDraft() {
  if (!confirm(`Set ${selectedProjects.value.length} projects to draft?`)) return;
  const count = selectedProjects.value.length;
  for (const id of selectedProjects.value) {
    const project = projects.value.find(p => p.id === id);
    if (project) {
      project.status = 'draft';
      await api.updateProject(project);
    }
  }
  selectedProjects.value = [];
  notice.value = 'Projects set to draft.';
  addActivity('update', `Bulk set ${count} projects to draft`);
  setTimeout(() => notice.value = '', 3000);
}

async function bulkArchive() {
  if (!confirm(`Archive ${selectedProjects.value.length} projects?`)) return;
  const count = selectedProjects.value.length;
  for (const id of selectedProjects.value) {
    const project = projects.value.find(p => p.id === id);
    if (project) {
      project.status = 'archived';
      await api.updateProject(project);
    }
  }
  selectedProjects.value = [];
  notice.value = 'Projects archived.';
  addActivity('update', `Bulk archived ${count} projects`);
  setTimeout(() => notice.value = '', 3000);
}

async function bulkDelete() {
  if (!confirm(`Delete ${selectedProjects.value.length} projects? This cannot be undone.`)) return;
  const count = selectedProjects.value.length;
  for (const id of selectedProjects.value) {
    await removeProject(id);
  }
  selectedProjects.value = [];
  addActivity('delete', `Bulk deleted ${count} projects`);
}

// Reset pagination when filter changes
watch(projectFilter, () => {
  currentPage.value = 1;
  selectedProjects.value = [];
});

// SEO Preview computed properties
const projectSlug = computed(() => {
  return projectForm.title
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'untitled';
});

const truncatedTitle = computed(() => {
  const title = projectForm.title || 'Untitled Project';
  return title.length > 60 ? title.substring(0, 57) + '...' : title;
});

const truncatedDescription = computed(() => {
  const desc = projectForm.description || 'No description provided.';
  return desc.length > 160 ? desc.substring(0, 157) + '...' : desc;
});

const seoScore = computed(() => {
  let score = 0;
  // Title length (25 points)
  const titleLen = projectForm.title?.length || 0;
  if (titleLen >= 30 && titleLen <= 60) score += 25;
  else if (titleLen > 0) score += 10;

  // Description length (25 points)
  const descLen = projectForm.description?.length || 0;
  if (descLen >= 120 && descLen <= 160) score += 25;
  else if (descLen > 0) score += 10;

  // Has image (25 points)
  if (projectForm.image_url) score += 25;

  // Published status (25 points)
  if (projectForm.status === 'published') score += 25;

  return score;
});

const seoScoreClass = computed(() => {
  const score = seoScore.value;
  if (score >= 80) return 'seo-excellent';
  if (score >= 60) return 'seo-good';
  if (score >= 40) return 'seo-fair';
  return 'seo-poor';
});

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

const blogRows = computed(() => [
  {
    title: 'Best 5 Top Designs in 2025',
    date: '19/09/2025',
    category: 'Design',
    viewers: '1.670',
    updated: '11/12/2025'
  },
  {
    title: 'Innovative User Interfaces',
    date: '12/10/2025',
    category: 'UX Design',
    viewers: '2.300',
    updated: '15/01/2026'
  },
  {
    title: 'Vue Portfolio Dashboard',
    date: '01/05/2026',
    category: 'Development',
    viewers: String(totalVisits.value),
    updated: '01/05/2026'
  }
]);
const chartBars = computed(() => {
  const values = [
    { label: 'Projects', value: projects.value.length },
    { label: 'Skills', value: skills.value.length },
    { label: 'Facts', value: facts.value.length },
    { label: 'Quotes', value: testimonials.value.length },
    { label: 'Inbox', value: messages.value.length }
  ];
  const max = Math.max(...values.map((item) => item.value), 1);

  return values.map((item) => ({
    label: item.label,
    height: Math.max(18, Math.round((item.value / max) * 92))
  }));
});

// Analytics computed properties
const analyticsData = computed(() => {
  const days = analyticsPeriod.value === '7d' ? 7 : analyticsPeriod.value === '30d' ? 30 : 90;
  const baseViews = Math.floor(Math.random() * 500) + 100;

  const dailyViews = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dailyViews.push({
      label: date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * baseViews) + 50
    });
  }

  return {
    dailyViews,
    viewsGrowth: Math.floor(Math.random() * 30) + 5,
    avgTime: `${Math.floor(Math.random() * 4) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    newVisitors: Math.floor(Math.random() * 40) + 30,
    returnVisitors: Math.floor(Math.random() * 30) + 20,
    mobileTraffic: Math.floor(Math.random() * 50) + 30
  };
});

const maxViews = computed(() => {
  return Math.max(...analyticsData.value.dailyViews.map(d => d.views), 1);
});

const totalViews = computed(() => {
  return analyticsData.value.dailyViews.reduce((sum, d) => sum + d.views, 0).toLocaleString();
});

const trafficSources = computed(() => [
  { name: 'Direct', percentage: 35, color: '#0b87f4' },
  { name: 'Search', percentage: 28, color: '#22c55e' },
  { name: 'Social', percentage: 22, color: '#f59e0b' },
  { name: 'Referral', percentage: 15, color: '#8b5cf6' }
]);

const topProjectViews = computed(() => {
  const sorted = [...projects.value]
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 5);

  const max = Math.max(...sorted.map(p => p.view_count || 0), 1);

  return sorted.map(p => ({
    name: p.title?.substring(0, 25) + (p.title?.length > 25 ? '...' : '') || 'Untitled',
    views: (p.view_count || 0).toLocaleString(),
    percentage: Math.round(((p.view_count || 0) / max) * 100)
  }));
});

function getDonutOffset(index) {
  let offset = 0;
  for (let i = 0; i < index; i++) {
    offset -= trafficSources.value[i].percentage * 2.51;
  }
  return offset;
}

async function loadDashboard() {
  loading.value = true;
  try {
    const [profilePayload, projectPayload, skillPayload, factPayload, testimonialPayload, messagePayload] =
      await Promise.all([
        api.getProfile(),
        api.getProjects(),
        api.getSkills(),
        api.getFacts(),
        api.getTestimonials(),
        api.getMessages()
      ]);

    Object.assign(profileForm, profilePayload.data);
    projects.value = projectPayload.data || [];
    skills.value = skillPayload.data || [];
    facts.value = factPayload.data || [];
    testimonials.value = testimonialPayload.data || [];
    messages.value = messagePayload.data || [];
  } catch (err) {
    notice.value = 'Error loading dashboard: ' + (err.message || 'Please try again.');
  } finally {
    loading.value = false;
  }
}

// Simple markdown formatter for preview
function formatMarkdown(text) {
  if (!text) return '';

  return text
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Line breaks
    .replace(/\n/g, '<br>');
}

// Activity Log
const activityLog = ref([]);
let activityIdCounter = 0;

function addActivity(type, text) {
  activityLog.value.unshift({
    id: ++activityIdCounter,
    type,
    text,
    timestamp: new Date()
  });
  // Keep only last 50 activities
  if (activityLog.value.length > 50) {
    activityLog.value = activityLog.value.slice(0, 50);
  }
}

function formatActivityTime(timestamp) {
  if (!timestamp) return '';
  const now = new Date();
  const diff = Math.floor((now - new Date(timestamp)) / 1000); // seconds

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

function handleSearch() {
  if (!adminSearch.value.trim()) return;
  // Search in projects and skills
  const searchTerm = adminSearch.value.toLowerCase();
  const foundProject = projects.value.find(p =>
    p.title?.toLowerCase().includes(searchTerm) ||
    p.description?.toLowerCase().includes(searchTerm)
  );
  if (foundProject) {
    activeSection.value = 'projects';
    editProject(foundProject);
    adminSearch.value = '';
    notice.value = `Found project: ${foundProject.title}`;
    setTimeout(() => notice.value = '', 3000);
    return;
  }
  const foundSkill = skills.value.find(s =>
    s.name?.toLowerCase().includes(searchTerm)
  );
  if (foundSkill) {
    activeSection.value = 'skills';
    editSkill(foundSkill);
    adminSearch.value = '';
    notice.value = `Found skill: ${foundSkill.name}`;
    setTimeout(() => notice.value = '', 3000);
    return;
  }
  notice.value = 'No matching projects or skills found.';
  setTimeout(() => notice.value = '', 3000);
}

function logout() {
  token.value = '';
  window.localStorage.removeItem('portfolio_admin_token');
  window.sessionStorage.removeItem('portfolio_admin_token');
  notice.value = 'Logged out.';
  window.location.href = '/login';
}

function resetProject() {
  Object.assign(projectForm, emptyProject());
}

function resetSkill() {
  Object.assign(skillForm, { id: null, name: '', level: 80 });
}

function resetFact() {
  Object.assign(factForm, { id: null, label: '', value: '' });
}

function resetTestimonial() {
  Object.assign(testimonialForm, { id: null, name: '', role: '', quote: '' });
}

function editProject(project) {
  Object.assign(projectForm, { ...emptyProject(), ...project, is_featured: Boolean(project.is_featured) });
}

function editSkill(skill) {
  Object.assign(skillForm, skill);
}

function editFact(fact) {
  Object.assign(factForm, fact);
}

function editTestimonial(testimonial) {
  Object.assign(testimonialForm, testimonial);
}

function upsertItem(list, item) {
  const index = list.value.findIndex((existing) => existing.id === item.id);
  if (index >= 0) list.value[index] = item;
  else list.value.unshift(item);
}

async function saveProfile() {
  // Validate required fields
  clearFormErrors('profile');
  const isNameValid = validateField('profile', 'name', profileForm.name, { required: true, minLength: 2 });
  const isEmailValid = validateField('profile', 'email', profileForm.email, { required: true, email: true });
  const isHeadlineValid = validateField('profile', 'headline', profileForm.headline, { required: true, minLength: 5 });
  const isIntroValid = validateField('profile', 'intro', profileForm.intro, { required: true, minLength: 10 });

  if (!isNameValid || !isEmailValid || !isHeadlineValid || !isIntroValid) {
    notice.value = 'Please fix the form errors before saving.';
    setTimeout(() => notice.value = '', 5000);
    return;
  }

  saving.value = true;
  try {
    const payload = await api.updateProfile(profileForm);
    Object.assign(profileForm, payload.data);
    clearFormErrors('profile');
    notice.value = 'Profile saved successfully!';
    addActivity('update', 'Updated profile settings');
    setTimeout(() => notice.value = '', 3000);
  } catch (err) {
    notice.value = 'Error saving profile: ' + (err.message || 'Please try again.');
  } finally {
    saving.value = false;
  }
}

async function saveProject() {
  const isUpdate = !!projectForm.id;
  const payload = isUpdate ? await api.updateProject(projectForm) : await api.createProject(projectForm);
  upsertItem(projects, payload.data);
  resetProject();
  notice.value = 'Project saved.';
  addActivity(isUpdate ? 'update' : 'create', `${isUpdate ? 'Updated' : 'Created'} project "${payload.data.title}"`);
}

async function saveSkill() {
  const isUpdate = !!skillForm.id;
  const payload = isUpdate ? await api.updateSkill(skillForm) : await api.createSkill(skillForm);
  upsertItem(skills, payload.data);
  resetSkill();
  notice.value = 'Skill saved.';
  addActivity(isUpdate ? 'update' : 'create', `${isUpdate ? 'Updated' : 'Added'} skill "${payload.data.name}"`);
}

async function saveFact() {
  const isUpdate = !!factForm.id;
  const payload = isUpdate ? await api.updateFact(factForm) : await api.createFact(factForm);
  upsertItem(facts, payload.data);
  resetFact();
  notice.value = 'Fact saved.';
  addActivity(isUpdate ? 'update' : 'create', `${isUpdate ? 'Updated' : 'Added'} fact "${payload.data.label}"`);
}

async function saveTestimonial() {
  const isUpdate = !!testimonialForm.id;
  const payload = isUpdate
    ? await api.updateTestimonial(testimonialForm)
    : await api.createTestimonial(testimonialForm);
  upsertItem(testimonials, payload.data);
  resetTestimonial();
  notice.value = 'Testimonial saved.';
  addActivity(isUpdate ? 'update' : 'create', `${isUpdate ? 'Updated' : 'Added'} testimonial from "${payload.data.author}"`);
}

async function removeProject(id) {
  const project = projects.value.find(p => p.id === id);
  await api.deleteProject(id);
  projects.value = projects.value.filter((project) => project.id !== id);
  if (project) {
    addActivity('delete', `Deleted project "${project.title}"`);
  }
}

async function removeSkill(id) {
  const skill = skills.value.find(s => s.id === id);
  await api.deleteSkill(id);
  skills.value = skills.value.filter((skill) => skill.id !== id);
  if (skill) {
    addActivity('delete', `Deleted skill "${skill.name}"`);
  }
}

async function removeFact(id) {
  const fact = facts.value.find(f => f.id === id);
  await api.deleteFact(id);
  facts.value = facts.value.filter((fact) => fact.id !== id);
  if (fact) {
    addActivity('delete', `Deleted fact "${fact.label}"`);
  }
}

async function removeTestimonial(id) {
  const testimonial = testimonials.value.find(t => t.id === id);
  await api.deleteTestimonial(id);
  testimonials.value = testimonials.value.filter((testimonial) => testimonial.id !== id);
  if (testimonial) {
    addActivity('delete', `Deleted testimonial from "${testimonial.author}"`);
  }
}

async function removeMessage(id) {
  const message = messages.value.find(m => m.id === id);
  await api.deleteMessage(id);
  messages.value = messages.value.filter((message) => message.id !== id);
  if (message) {
    addActivity('delete', `Deleted message from "${message.name}"`);
  }
}

onMounted(async () => {
  if (!isAuthenticated.value) {
    window.location.href = '/login';
    return;
  }
  try {
    await loadDashboard();
    addActivity('info', 'Dashboard loaded successfully');
  } catch {
    logout();
  }
});
</script>

<style scoped>
.admin-redirect {
  display: grid;
  min-height: 100vh;
  place-items: center;
  background: #f2f4f7;
  color: #6a6f76;
}
</style>
