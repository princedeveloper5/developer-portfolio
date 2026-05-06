<template>
  <div class="sortable-list">
    <div
      v-for="(item, index) in items"
      :key="itemKey(item)"
      class="sortable-item"
      :class="{
        'is-dragging': draggingIndex === index,
        'is-drag-over': dragOverIndex === index && draggingIndex !== index
      }"
      :draggable="true"
      @dragstart="handleDragStart($event, index)"
      @dragend="handleDragEnd"
      @dragenter.prevent="handleDragEnter(index)"
      @dragover.prevent="handleDragOver($event, index)"
      @drop.prevent="handleDrop(index)"
    >
      <div class="drag-handle">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="12" r="1"/>
          <circle cx="9" cy="5" r="1"/>
          <circle cx="9" cy="19" r="1"/>
          <circle cx="15" cy="12" r="1"/>
          <circle cx="15" cy="5" r="1"/>
          <circle cx="15" cy="19" r="1"/>
        </svg>
      </div>
      <div class="sortable-content">
        <slot :item="item" :index="index">
          {{ item.name || item.title }}
        </slot>
      </div>
      <div class="sortable-actions">
        <span class="sort-order">{{ index + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemKey: {
    type: Function,
    default: (item) => item.id || item._key
  }
});

const emit = defineEmits(['update:items', 'reorder']);

const draggingIndex = ref(null);
const dragOverIndex = ref(null);
const dragData = ref(null);

function handleDragStart(event, index) {
  draggingIndex.value = index;
  dragData.value = props.items[index];
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', index);

  // Add a small delay to allow the browser to render the drag ghost
  setTimeout(() => {
    event.target.classList.add('dragging');
  }, 0);
}

function handleDragEnd(event) {
  event.target.classList.remove('dragging');
  draggingIndex.value = null;
  dragOverIndex.value = null;
  dragData.value = null;
}

function handleDragEnter(index) {
  if (draggingIndex.value !== null && draggingIndex.value !== index) {
    dragOverIndex.value = index;
  }
}

function handleDragOver(event, index) {
  event.dataTransfer.dropEffect = 'move';
  if (draggingIndex.value !== null && draggingIndex.value !== index) {
    dragOverIndex.value = index;
  }
}

function handleDrop(targetIndex) {
  if (draggingIndex.value === null || draggingIndex.value === targetIndex) {
    return;
  }

  const newItems = [...props.items];
  const [movedItem] = newItems.splice(draggingIndex.value, 1);
  newItems.splice(targetIndex, 0, movedItem);

  // Update order property if items have it
  const updatedItems = newItems.map((item, index) => ({
    ...item,
    order: index + 1
  }));

  emit('update:items', updatedItems);
  emit('reorder', {
    items: updatedItems,
    movedFrom: draggingIndex.value,
    movedTo: targetIndex,
    item: movedItem
  });

  draggingIndex.value = null;
  dragOverIndex.value = null;
}
</script>

<style scoped>
.sortable-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sortable-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #ffffff;
  border: 1px solid rgba(16, 16, 16, 0.08);
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s ease;
}

.sortable-item:hover {
  border-color: rgba(11, 135, 244, 0.3);
  background: rgba(11, 135, 244, 0.02);
}

.sortable-item.is-dragging {
  opacity: 0.5;
  cursor: grabbing;
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sortable-item.is-drag-over {
  border-color: #0b87f4;
  border-style: dashed;
  background: rgba(11, 135, 244, 0.05);
}

.drag-handle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  cursor: grab;
}

.sortable-item:hover .drag-handle {
  color: #6a6f76;
}

.sortable-content {
  flex: 1;
  min-width: 0;
}

.sortable-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-order {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(16, 16, 16, 0.05);
  color: #6a6f76;
  font-size: 0.75rem;
  font-weight: 600;
}

.sortable-item.is-drag-over .sort-order {
  background: #0b87f4;
  color: #ffffff;
}

.dragging {
  opacity: 0.5;
}
</style>
