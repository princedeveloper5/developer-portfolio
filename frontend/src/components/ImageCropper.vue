<template>
  <div v-if="show" class="cropper-modal-overlay" @click.self="close">
    <div class="cropper-modal">
      <div class="cropper-header">
        <h3>Crop & Resize Image</h3>
        <button class="close-btn" @click="close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="cropper-main">
        <div class="canvas-container" ref="containerRef">
          <canvas ref="canvasRef" @mousedown="startPan" @mousemove="pan" @mouseup="endPan" @mouseleave="endPan"
                  @wheel="handleZoom"></canvas>
          <div class="crop-overlay" :style="overlayStyle">
            <div class="crop-frame">
              <div class="corner tl"></div>
              <div class="corner tr"></div>
              <div class="corner bl"></div>
              <div class="corner br"></div>
            </div>
          </div>
        </div>

        <div class="cropper-controls">
          <div class="control-group">
            <label>Zoom</label>
            <input type="range" min="0.5" max="3" step="0.1" v-model="scale" @input="render">
          </div>

          <div class="control-group">
            <label>Rotation</label>
            <div class="btn-row">
              <button @click="rotate(-90)" title="Rotate left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
              </button>
              <button @click="rotate(90)" title="Rotate right">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="control-group">
            <label>Flip</label>
            <div class="btn-row">
              <button @click="flipH" title="Flip horizontal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 20h9M12 4h9M4 9l5 5-5 5"/>
                </svg>
              </button>
              <button @click="flipV" title="Flip vertical">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 12h16M4 18h9M9 4l5 5 5-5"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="control-group">
            <label>Aspect Ratio</label>
            <select v-model="aspectRatio" @change="updateCropArea">
              <option :value="16/9">16:9 (Wide)</option>
              <option :value="4/3">4:3 (Standard)</option>
              <option :value="1">1:1 (Square)</option>
              <option :value="3/4">3:4 (Portrait)</option>
              <option :value="0">Free</option>
            </select>
          </div>

          <div class="control-group">
            <label>Output Size</label>
            <div class="size-inputs">
              <input type="number" v-model="outputWidth" min="100" max="2000" placeholder="Width">
              <span>x</span>
              <input type="number" v-model="outputHeight" min="100" max="2000" placeholder="Height">
            </div>
          </div>
        </div>
      </div>

      <div class="cropper-footer">
        <button class="secondary" @click="reset">Reset</button>
        <button class="primary" @click="applyCrop">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Apply Crop
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  show: Boolean,
  imageUrl: String,
  defaultAspectRatio: { type: Number, default: 16/9 }
});

const emit = defineEmits(['close', 'cropped']);

const canvasRef = ref(null);
const containerRef = ref(null);
const image = ref(null);
const scale = ref(1);
const rotation = ref(0);
const flipX = ref(1);
const flipY = ref(1);
const panX = ref(0);
const panY = ref(0);
const isPanning = ref(false);
const startX = ref(0);
const startY = ref(0);
const aspectRatio = ref(props.defaultAspectRatio);
const outputWidth = ref(800);
const outputHeight = ref(450);
const cropX = ref(0);
const cropY = ref(0);
const cropW = ref(0);
const cropH = ref(0);

const overlayStyle = computed(() => ({
  left: `${cropX.value}px`,
  top: `${cropY.value}px`,
  width: `${cropW.value}px`,
  height: `${cropH.value}px`
}));

function loadImage() {
  if (!props.imageUrl) return;
  image.value = new Image();
  image.value.crossOrigin = 'anonymous';
  image.value.onload = () => {
    nextTick(() => {
      initCanvas();
      updateCropArea();
    });
  };
  image.value.src = props.imageUrl;
}

function initCanvas() {
  const canvas = canvasRef.value;
  const container = containerRef.value;
  if (!canvas || !container || !image.value) return;

  canvas.width = container.clientWidth;
  canvas.height = container.clientHeight;
  render();
}

function render() {
  const canvas = canvasRef.value;
  if (!canvas || !image.value) return;
  const ctx = canvas.getContext('2d');
  const cw = canvas.width;
  const ch = canvas.height;

  ctx.clearRect(0, 0, cw, ch);
  ctx.save();

  const cx = cw / 2 + panX.value;
  const cy = ch / 2 + panY.value;

  ctx.translate(cx, cy);
  ctx.scale(scale.value * flipX.value, scale.value * flipY.value);
  ctx.rotate((rotation.value * Math.PI) / 180);
  ctx.drawImage(image.value, -image.value.width / 2, -image.value.height / 2);

  ctx.restore();
}

function updateCropArea() {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const cw = canvas.width;
  const ch = canvas.height;

  if (aspectRatio.value === 0) {
    cropW.value = Math.min(cw * 0.8, 600);
    cropH.value = Math.min(ch * 0.8, 400);
  } else if (cw / ch > aspectRatio.value) {
    cropH.value = Math.min(ch * 0.8, 400);
    cropW.value = cropH.value * aspectRatio.value;
  } else {
    cropW.value = Math.min(cw * 0.8, 600);
    cropH.value = cropW.value / aspectRatio.value;
  }

  cropX.value = (cw - cropW.value) / 2;
  cropY.value = (ch - cropH.value) / 2;
}

function startPan(e) {
  isPanning.value = true;
  startX.value = e.clientX - panX.value;
  startY.value = e.clientY - panY.value;
}

function pan(e) {
  if (!isPanning.value) return;
  panX.value = e.clientX - startX.value;
  panY.value = e.clientY - startY.value;
  render();
}

function endPan() {
  isPanning.value = false;
}

function handleZoom(e) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  scale.value = Math.max(0.5, Math.min(3, scale.value + delta));
  render();
}

function rotate(deg) {
  rotation.value += deg;
  render();
}

function flipH() {
  flipX.value *= -1;
  render();
}

function flipV() {
  flipY.value *= -1;
  render();
}

function reset() {
  scale.value = 1;
  rotation.value = 0;
  flipX.value = 1;
  flipY.value = 1;
  panX.value = 0;
  panY.value = 0;
  aspectRatio.value = props.defaultAspectRatio;
  updateCropArea();
  render();
}

function applyCrop() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = outputWidth.value;
  canvas.height = outputHeight.value;

  const sourceCanvas = canvasRef.value;
  if (!sourceCanvas || !image.value) return;

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const scaleX = image.value.naturalWidth / sourceCanvas.width;
  const scaleY = image.value.naturalHeight / sourceCanvas.height;

  const sx = (cropX.value - (sourceCanvas.width / 2 + panX.value - (image.value.width * scale.value) / 2)) / scale.value * scaleX;
  const sy = (cropY.value - (sourceCanvas.height / 2 + panY.value - (image.value.height * scale.value) / 2)) / scale.value * scaleY;
  const sw = (cropW.value / scale.value) * scaleX;
  const sh = (cropH.value / scale.value) * scaleY;

  ctx.drawImage(
    image.value,
    Math.max(0, sx), Math.max(0, sy), sw, sh,
    0, 0, canvas.width, canvas.height
  );

  const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
  emit('cropped', croppedDataUrl);
  close();
}

function close() {
  emit('close');
}

watch(() => props.show, (val) => {
  if (val) {
    reset();
    loadImage();
  }
});

onMounted(() => {
  if (props.show) loadImage();
});
</script>
