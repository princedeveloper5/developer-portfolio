<template>
  <section class="split-auth-page">
    <div class="split-left">
      <div class="split-left-content">
        <h1>Welcome to<br/>your Dashboard</h1>
        <p>Access your portfolio admin panel to manage projects, testimonials, and profile settings.</p>
        <div class="split-socials">
          <a href="#" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
            </svg>
          </a>
          <a href="#" aria-label="Pinterest">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <line x1="12" y1="8" x2="12" y2="21"/>
              <path d="M6 12a6 6 0 0 1 12 0c0 2.5-1.5 4-3 5.5"/>
              <circle cx="12" cy="8" r="6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="split-right">
      <div class="split-form-container">
        <h2>Sign in</h2>

        <form @submit.prevent="handleLogin">
          <label class="split-label">
            <span>Username</span>
            <div class="split-input-wrapper">
              <span class="split-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                v-model.trim="form.username"
                type="text"
                placeholder="admin"
                autocomplete="username"
                required
              />
            </div>
          </label>

          <label class="split-label">
            <span>Password</span>
            <div class="split-input-wrapper">
              <span class="split-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                </svg>
              </span>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="split-password-toggle"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </label>

          <label class="split-checkbox">
            <input type="checkbox" v-model="form.rememberMe" />
            <span>I agree with Privacy policy</span>
          </label>

          <button class="split-btn" type="submit" :disabled="isLoading">
            {{ isLoading ? 'Checking...' : 'Sign in' }}
          </button>

          <p v-if="error" class="split-error">{{ error }}</p>
        </form>

        <RouterLink to="/" class="split-back-link">← Back to portfolio</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../services/api';

const router = useRouter();
const isLoading = ref(false);
const error = ref('');
const showPassword = ref(false);

const form = reactive({
  username: '',
  password: '',
  rememberMe: false
});

// Check if already logged in on mount
onMounted(() => {
  const token = window.localStorage.getItem('portfolio_admin_token') ||
                window.sessionStorage.getItem('portfolio_admin_token');
  if (token) {
    router.push('/admin');
  }
});

async function handleLogin() {
  isLoading.value = true;
  error.value = '';

  try {
    const credentials = {
      username: form.username,
      password: form.password
    };
    const payload = await api.login(credentials);

    if (form.rememberMe) {
      window.localStorage.setItem('portfolio_admin_token', payload.data.token);
    } else {
      window.sessionStorage.setItem('portfolio_admin_token', payload.data.token);
    }

    router.push('/admin');
  } catch (err) {
    error.value = err.message || 'Invalid credentials';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.split-auth-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: #1a1a2e;
}

/* Left side - Dark image area */
.split-left {
  position: relative;
  background:
    linear-gradient(135deg, rgba(26, 26, 46, 0.85) 0%, rgba(22, 33, 62, 0.9) 100%),
    url('/img/prince-images/profile-image.png') center/cover no-repeat;
  display: flex;
  align-items: flex-end;
  padding: 3rem;
}

.split-left-content {
  color: #ffffff;
  max-width: 400px;
}

.split-left-content h1 {
  font-size: 2.5rem;
  font-weight: 300;
  line-height: 1.2;
  margin: 0 0 1rem 0;
  color: #ffffff;
}

.split-left-content p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 2rem 0;
}

.split-socials {
  display: flex;
  gap: 1rem;
}

.split-socials a {
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
}

.split-socials a:hover {
  color: #ffffff;
}

/* Right side - Form area */
.split-right {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2d2d44 0%, #1a1a2e 100%);
  padding: 2rem;
}

.split-form-container {
  width: 100%;
  max-width: 360px;
}

.split-form-container h2 {
  font-size: 2rem;
  font-weight: 300;
  color: #ffffff;
  margin: 0 0 2rem 0;
}

.split-label {
  display: block;
  margin-bottom: 1.5rem;
}

.split-label > span:first-child {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.split-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.split-input-icon {
  position: absolute;
  left: 0;
  bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.split-input-wrapper input {
  width: 100%;
  padding: 0.75rem 0 0.75rem 2.5rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.split-input-wrapper input:focus {
  border-bottom-color: #ffffff;
}

.split-input-wrapper input:focus + .split-input-icon,
.split-input-wrapper:focus-within .split-input-icon {
  color: #ffffff;
}

.split-input-wrapper input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.split-password-toggle {
  position: absolute;
  right: 0;
  bottom: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.split-password-toggle:hover {
  color: rgba(255, 255, 255, 0.9);
}

.split-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
  cursor: pointer;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.split-checkbox input {
  width: 16px;
  height: 16px;
  accent-color: #ffffff;
}

.split-btn {
  width: auto;
  padding: 0.75rem 2rem;
  background: #ffffff;
  color: #1a1a2e;
  border: none;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.split-btn:hover:not(:disabled) {
  background: #f0f0f0;
  transform: translateY(-1px);
}

.split-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.split-error {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 1rem;
  text-align: center;
}

.split-back-link {
  display: block;
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.split-back-link:hover {
  color: #ffffff;
}

/* Responsive */
@media (max-width: 768px) {
  .split-auth-page {
    grid-template-columns: 1fr;
  }

  .split-left {
    min-height: 40vh;
    padding: 2rem;
  }

  .split-left-content h1 {
    font-size: 1.75rem;
  }

  .split-right {
    padding: 2rem;
  }
}
</style>
