<template>
  <transition name="fade">
    <div
      v-if="isOverlayVisible"
      class="fullscreen"
      style="z-index: 2500; backdrop-filter: blur(1px) brightness(0.75)"
      @click="fireEvent('hideOverlay')"
    ></div>
  </transition>
</template>

<script setup lang="ts">
import { fireEvent } from 'utils';
import { onMounted, onUnmounted, ref } from 'vue';
const isOverlayVisible = ref<boolean>(false);

onMounted(() => {
  window.addEventListener('showOverlay', () => (isOverlayVisible.value = true));
  window.addEventListener(
    'hideOverlay',
    () => (isOverlayVisible.value = false)
  );
});

onUnmounted(() => {
  window.removeEventListener(
    'showOverlay',
    () => (isOverlayVisible.value = true)
  );
  window.removeEventListener(
    'hideOverlay',
    () => (isOverlayVisible.value = false)
  );
});
</script>
