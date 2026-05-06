<template>
  <div class="file-upload">
    <label class="file-upload-label">
      <span class="file-upload-text">{{ label }}</span>
      <div class="file-upload-area" :class="{ 'has-file': modelValue, 'is-dragging': isDragging }" @dragenter.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @dragover.prevent @drop.prevent="handleDrop">
        <input
          ref="fileInput"
          type="file"
          :accept="accept"
          @change="handleFileChange"
          class="file-input"
        />
        <div class="file-upload-content">
          <svg v-if="!modelValue && !isUploading" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <svg v-else-if="isUploading" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="upload-spinner">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M9 15l2 2 4-4"/>
          </svg>
          <span class="file-upload-placeholder">
            {{ isUploading ? 'Uploading...' : modelValue ? fileName || 'File selected' : placeholder }}
          </span>
          <div v-if="modelValue && !isUploading" class="file-actions">
            <button type="button" class="crop-btn" @click.prevent="openCropper" title="Crop & Resize">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 3v12"/>
                <path d="M18 9v12"/>
                <path d="M3 6h12"/>
                <path d="M15 18h6"/>
              </svg>
              Crop
            </button>
            <button type="button" class="file-remove-btn" @click.prevent="clearFile" title="Remove file">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </label>
    <p v-if="error" class="file-upload-error">{{ error }}</p>

    <!-- Image Cropper Modal -->
    <ImageCropper
      :show="showCropper"
      :image-url="modelValue"
      :default-aspect-ratio="defaultAspectRatio"
      @close="showCropper = false"
      @cropped="handleCropped"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { api } from '../services/api';
import ImageCropper from './ImageCropper.vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: 'Upload File' },
  placeholder: { type: String, default: 'Click or drag file here' },
  accept: { type: String, default: 'image/*' },
  defaultAspectRatio: { type: Number, default: 16/9 }
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);
const isDragging = ref(false);
const isUploading = ref(false);
const error = ref('');
const fileName = ref('');
const showCropper = ref(false);

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await uploadFile(file);
  }
};

const handleDrop = async (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    await uploadFile(file);
  }
};

const uploadFile = async (file) => {
  error.value = '';
  isUploading.value = true;
  fileName.value = file.name;

  try {
    const payload = await api.uploadFile(file);
    emit('update:modelValue', payload.data.url);
  } catch (err) {
    error.value = err.message || 'Upload failed';
  } finally {
    isUploading.value = false;
  }
};

const clearFile = () => {
  emit('update:modelValue', '');
  fileName.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const openCropper = () => {
  if (!props.modelValue) return;
  showCropper.value = true;
};

const handleCropped = (croppedImageData) => {
  emit('update:modelValue', croppedImageData);
};
</script>

<style scoped>
.file-upload {
  margin-bottom: 1rem;
}

.file-upload-label {
  display: block;
}

.file-upload-text {
  display: block;
  font-size: 0.85rem;
  color: var(--muted, #6a6f76);
  margin-bottom: 0.5rem;
}

.file-upload-area {
  position: relative;
  border: 2px dashed var(--line, rgba(16, 16, 16, 0.16));
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: var(--mint, #f2f2f2);
}

.file-upload-area:hover,
.file-upload-area.is-dragging {
  border-color: var(--accent, #f2cf5b);
  background: rgba(242, 207, 91, 0.1);
}

.file-upload-area.has-file {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.1);
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.file-upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted, #6a6f76);
}

.file-upload-area.has-file .file-upload-content {
  color: #22c55e;
}

.file-upload-placeholder {
  font-size: 0.9rem;
  text-align: center;
}

.file-remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #ffffff;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #dc2626;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.file-remove-btn:hover {
  background: #dc2626;
  color: #ffffff;
}

.file-upload-error {
  color: #dc2626;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.upload-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
