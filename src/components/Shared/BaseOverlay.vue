<template>
  <div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-if="isOverlayVisible"
        class="fullscreen"
        style="backdrop-filter: brightness(0.75)"
        @click="fireEvent('showOverlay', false)"
      ></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { fireEvent } from '../utils';

const isOverlayVisible = ref<boolean>(false);

onMounted(() =>
  window.addEventListener('showOverlay', (e) =>
    overlayListener(e as CustomEvent)
  )
);
onUnmounted(() =>
  window.removeEventListener('showOverlay', (e) =>
    overlayListener(e as CustomEvent)
  )
);

const overlayListener = (e: CustomEvent) =>
  (isOverlayVisible.value = e.detail as boolean);
</script>
