<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div
      v-if="appStore.isOverlayShowed"
      class="fullscreen"
      style="z-index: 2500; backdrop-filter: brightness(0.75)"
      @click="fireEvent('showOverlay', { status: 'failed' })"
    ></div>
  </transition>
</template>

<script setup lang="ts">
import { fireEvent } from 'utils';

import { useAppStore } from 'stores/appStore';
const appStore = useAppStore();
</script>
