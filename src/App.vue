<template>
  <router-view />

  <BaseOverlay />
  <BaseModal />
</template>

<script setup lang="ts">
import BaseModal from 'components/Shared/BaseModal.vue';
import BaseOverlay from 'components/Shared/BaseOverlay.vue';

import { useAppStore } from 'stores/appStore';
const appStore = useAppStore();

import { onMounted, onUnmounted } from 'vue';

onMounted(() =>
  window.addEventListener('showOverlay', (e) =>
    (e as CustomEvent).detail == false ? appStore.closeAllPopUps() : null
  )
);

onUnmounted(() =>
  window.addEventListener('showOverlay', (e) =>
    (e as CustomEvent).detail == false ? appStore.closeAllPopUps() : null
  )
);
</script>
