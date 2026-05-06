<template>
  <div v-if="show" class="image-cropper-modal" @click.self="close">
    <div class="cropper-container">
      <div class="cropper-header">
        <h3>Crop & Resize Image</h3>
        <button type="button" class="close-btn" @click="close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="cropper-body">
        <div class="canvas-wrapper">
          <canvas
            ref="canvas"
            class="crop-canvas"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
            @wheel="onZoom"
          ></canvas>
          <div class="crop-overlay" :style="cropOverlayStyle"></div>
        </div>

        <div class="crop-controls">
          <div class="control-group">
            <label>Zoom</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.01"
              :value="zoom"
              @input="e => updateZoom(parseFloat(e.target.value))"
            />
          </div>

          <div class="control-group">
            <label>Aspect Ratio</label>
            <div class="ratio-buttons">
              <button
                type="button"
                :class="{ active: aspectRatio === 16/9 }"
                @click="setAspectRatio(16/9)"
              >16:9</button>
              <button
                type="button"
                :class="{ active: aspectRatio === 4/3 }"
                @click="setAspectRatio(4/3)"
              >4:3</button>
              <button
                type="button"
                :class="{ active: aspectRatio === 1 }"
                @click="setAspectRatio(1)"
              >1:1</button>
              <button
                type="button"
                :class="{ active: aspectRatio === 3/4 }"
                @click="setAspectRatio(3/4)"
              >3:4</button>
            </div>
          </div>

          <div class="control-group">
            <label>Output Size</label>
            <div class="size-inputs">
              <input
                type="number"
                v-model.number="outputWidth"
                min="100"
                max="2000"
                placeholder="Width"
              />
              <span>×</span>
              <input
                type="number"
                v-model.number="outputHeight"
                min="100"
                max="2000"
                placeholder="Height"
              />
            </div>
          </div>

          <div class="control-group">
            <label>Rotation</label>
            <div class="rotate-buttons">
              <button type="button" @click="rotate(-90)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                -90°
              </button>
              <button type="button" @click="rotate(90)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                </svg>
                +90°
              </button>
              <button type="button" @click="flipHorizontal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20v-8m0 0V4m0 8h-4m4 0h4"/>
                  <path d="M4 4v16M20 4v16"/>
                </svg>
                Flip H
              </button>
              <button type="button" @click="flipVertical">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 12H4m0 0h16m-8-4v8m0-8V4m0 16v-4"/>
                  <path d="M4 4h16M4 20h16"/>
                </svg>
                Flip V
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="cropper-footer">
        <button type="button" class="btn-secondary" @click="close">Cancel</button>
        <button type="button" class="btn-primary" @click="crop" :disabled="processing">
          <span v-if="processing">Processing...</span>
          <span v-else>Apply Crop</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  show: Boolean,
  imageUrl: String,
  defaultAspectRatio: {
    type: Number,
    default: 16/9
  }
});

const emit = defineEmits(['close', 'cropped']);

const canvas = ref(null);
const ctx = ref(null);
const image = ref(null);
const zoom = ref(1);
const rotation = ref(0);
const flipH = ref(1);
const flipV = ref(1);
const aspectRatio = ref(props.defaultAspectRatio);
const outputWidth = ref(800);
const outputHeight = ref(450);
const processing = ref(false);

// Pan/drag state
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });
const panOffset = ref({ x: 0, y: 0 });

// Crop box
const cropBox = computed(() => {
  if (!canvas.value) return { x: 0, y: 0, width: 0, height: 0 };
  const canvasWidth = canvas.value.width;
  const canvasHeight = canvas.value.height;
  let width = canvasWidth * 0.8;
  let height = width / aspectRatio.value;

  if (height > canvasHeight * 0.8) {
    height = canvasHeight * 0.8;
    width = height * aspectRatio.value;
  }

  return {
    x: (canvasWidth - width) / 2 + panOffset.value.x,
    y: (canvasHeight - height) / 2 + panOffset.value.y,
    width,
    height
  };
});

const cropOverlayStyle = computed(() => ({
  left: `${cropBox.value.x}px`,
  top: `${cropBox.value.y}px`,
  width: `${cropBox.value.width}px`,
  height: `${cropBox.value.height}px`
}));

function loadImage() {
  if (!props.imageUrl) return;

  image.value = new Image();
  image.value.crossOrigin = 'anonymous';
  image.value.onload = () => {
    nextTick(() => {
      initCanvas();
    });
  };
  image.value.src = props.imageUrl;
}

function initCanvas() {
  if (!canvas.value || !image.value) return;

  const container = canvas.value.parentElement;
  canvas.value.width = container.clientWidth;
  canvas.value.height = container.clientHeight;

  ctx.value = canvas.value.getContext('2d');
  drawImage();

  // Set initial output size based on image
  outputWidth.value = Math.min(1200, image.value.naturalWidth);
  outputHeight.value = Math.round(outputWidth.value / aspectRatio.value);
}

function drawImage() {
  if (!ctx.value || !image.value || !canvas.value) return;

  const canvasWidth = canvas.value.width;
  const canvasHeight = canvas.value.height;

  // Clear canvas
  ctx.value.clearRect(0, 0, canvasWidth, canvasHeight);

  // Save context
  ctx.value.save();

  // Move to center
  ctx.value.translate(canvasWidth / 2 + panOffset.value.x, canvasHeight / 2 + panOffset.value.y);

  // Apply zoom
  ctx.value.scale(zoom.value, zoom.value);

  // Apply rotation
  ctx.value.rotate((rotation.value * Math.PI) / 180);

  // Apply flips
  ctx.value.scale(flipH.value, flipV.value);

  // Draw image centered
  ctx.value.drawImage(
    image.value,
    -image.value.naturalWidth / 2,
    -image.value.naturalHeight / 2
  );

  // Restore context
  ctx.value.restore();
}

function updateZoom(newZoom) {
  zoom.value = Math.max(0.1, Math.min(3, newZoom));
  drawImage();
}

function onZoom(e) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  updateZoom(zoom.value + delta);
}

function setAspectRatio(ratio) {
  aspectRatio.value = ratio;
  outputHeight.value = Math.round(outputWidth.value / ratio);
  panOffset.value = { x: 0, y: 0 };
  drawImage();
}

function rotate(deg) {
  rotation.value = (rotation.value + deg) % 360;
  drawImage();
}

function flipHorizontal() {
  flipH.value *= -1;
  drawImage();
}

function flipVertical() {
  flipV.value *= -1;
  drawImage();
}

function startDrag(e) {
  isDragging.value = true;
  dragStart.value = { x: e.clientX - panOffset.value.x, y: e.clientY - panOffset.value.y };
}

function onDrag(e) {
  if (!isDragging.value) return;
  panOffset.value = {
    x: e.clientX - dragStart.value.x,
    y: e.clientY - dragStart.value.y
  };
  drawImage();
}

function stopDrag() {
  isDragging.value = false;
}

function crop() {
  if (!image.value || processing.value) return;
  processing.value = true;

  nextTick(() => {
    try {
      // Create output canvas
      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = outputWidth.value;
      outputCanvas.height = outputHeight.value;
      const outputCtx = outputCanvas.getContext('2d');

      // Calculate crop coordinates
      const canvasWidth = canvas.value.width;
      const canvasHeight = canvas.value.height;
      const cropX = cropBox.value.x;
      const cropY = cropBox.value.y;
      const cropW = cropBox.value.width;
      const cropH = cropBox.value.height;

      // Fill white background
      outputCtx.fillStyle = '#ffffff';
      outputCtx.fillRect(0, 0, outputWidth.value, outputHeight.value);

      // Enable high quality image rendering
      outputCtx.imageSmoothingEnabled = true;
      outputCtx.imageSmoothingQuality = 'high';

      // Create temporary canvas for transformed image
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvasWidth;
      tempCanvas.height = canvasHeight;
      const tempCtx = tempCanvas.getContext('2d');

      // Apply same transformations as displayed
      tempCtx.translate(canvasWidth / 2 + panOffset.value.x, canvasHeight / 2 + panOffset.value.y);
      tempCtx.scale(zoom.value, zoom.value);
      tempCtx.rotate((rotation.value * Math.PI) / 180);
      tempCtx.scale(flipH.value, flipV.value);
      tempCtx.drawImage(
        image.value,
        -image.value.naturalWidth / 2,
        -image.value.naturalHeight / 2
      );

      // Draw cropped region to output
      outputCtx.drawImage(
        tempCanvas,
        cropX, cropY, cropW, cropH,
        0, 0, outputWidth.value, outputHeight.value
      );

      // Convert to blob
      outputCanvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          emit('cropped', reader.result);
          processing.value = false;
          close();
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.92);
    } catch (err) {
      console.error('Crop error:', err);
      processing.value = false;
    }
  });
}

function close() {
  emit('close');
  // Reset state
  zoom.value = 1;
  rotation.value = 0;
  flipH.value = 1;
  flipV.value = 1;
  panOffset.value = { x: 0, y: 0 };
}

function handleResize() {
  if (props.show && image.value) {
    nextTick(() => initCanvas());
  }
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    nextTick(() => loadImage());
  }
});

watch([outputWidth], (newVal) => {
  if (newVal[0]) {
    outputHeight.value = Math.round(newVal[0] / aspectRatio.value);
  }
});

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
