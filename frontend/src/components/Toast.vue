<template>
  <TransitionGroup name="toast" tag="div" class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', `toast--${toast.type}`]"
    >
      <span class="toast-icon" v-html="icons[toast.type]"></span>
      <span class="toast-message">{{ toast.message }}</span>
      <button class="toast-close" @click="removeToast(toast.id)" aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue';

const icons = {
  success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>',
  error: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  warning: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  info: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
};

const toasts = ref([]);
let toastId = 0;

const addToast = (message, type = 'info', duration = 4000) => {
  const id = ++toastId;
  toasts.value.push({ id, message, type });
  
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }
  
  return id;
};

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
};

// Expose methods for external use
defineExpose({ addToast, removeToast });
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0,0,0,.15), 0 2px 8px rgba(0,0,0,.1);
  min-width: 280px;
  max-width: 400px;
  pointer-events: auto;
  border-left: 4px solid;
}

.toast--success { border-color: #22c55e; }
.toast--error { border-color: #ef4444; }
.toast--warning { border-color: #f59e0b; }
.toast--info { border-color: #3b82f6; }

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.toast--success .toast-icon { color: #22c55e; }
.toast--error .toast-icon { color: #ef4444; }
.toast--warning .toast-icon { color: #f59e0b; }
.toast--info .toast-icon { color: #3b82f6; }

.toast-message {
  flex: 1;
  font-size: 0.9rem;
  color: #1f2937;
  line-height: 1.4;
}

.toast-close {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.toast-close:hover {
  background: #f3f4f6;
  color: #6b7280;
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Dark mode */
:global(.dark-theme) .toast {
  background: #1e293b;
  box-shadow: 0 10px 40px rgba(0,0,0,.3), 0 2px 8px rgba(0,0,0,.2);
}

:global(.dark-theme) .toast-message {
  color: #f1f5f9;
}

:global(.dark-theme) .toast-close:hover {
  background: #334155;
}
</style>
