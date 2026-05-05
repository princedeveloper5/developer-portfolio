<template>
  <div class="file-upload">
    <label class="file-upload-label">
      <span class="file-upload-text">{{ label }}</span>
      <div class="file-upload-area" :class="{ 'has-file': modelValue, 'is-dragging': isDragging }" 
           @dragenter.prevent="isDragging = true" @dragleave.prevent="isDragging = false" 
           @dragover.prevent @drop.prevent="handleDrop">
        <input ref="fileInput" type="file" :accept="accept" @change="handleFileChange" class="file-input" />
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
                <path d="M6 3v12"/><path d="M18 9v12"/><path d="M3 6h12"/><path d="M15 18h6"/>
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

    <ImageCropper :show="showCropper" :image-url="modelValue" :default-aspect-ratio="defaultAspectRatio" 
                  @close="showCropper = false" @cropped="handleCropped" />
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
  if (file) await uploadFile(file);
};

const handleDrop = async (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) await uploadFile(file);
};

const uploadFile = async (file) => {
  if (!file.type.startsWith('image/')) {
    error.value = 'Please upload an image file';
    return;
  }
  
  isUploading.value = true;
  error.value = '';
  
  try {
    const reader = new FileReader();
    reader.onload = (e) => {
      emit('update:modelValue', e.target.result);
      fileName.value = file.name;
      isUploading.value = false;
    };
    reader.readAsDataURL(file);
  } catch (err) {
    error.value = 'Upload failed. Please try again.';
    isUploading.value = false;
  }
};

const clearFile = () => {
  emit('update:modelValue', '');
  fileName.value = '';
  if (fileInput.value) fileInput.value.value = '';
};

const openCropper = () => {
  if (!props.modelValue) return;
  showCropper.value = true;
};

const handleCropped = (croppedImageData) => {
  emit('update:modelValue', croppedImageData);
};
</script>
