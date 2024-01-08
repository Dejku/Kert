<template>
  <Alerts />

  <router-view />

  <BaseOverlay />
  <BaseModal />
  <BaseDialog />
</template>

<script setup lang="ts">
import BaseModal from 'components/Shared/BaseModal.vue';
import BaseOverlay from 'components/Shared/BaseOverlay.vue';
import BaseDialog from 'components/Shared/BaseDialog.vue';
import Alerts from 'components/alerts/AlertsContainer.vue';

import { useAppStore } from 'stores/appStore';
const appStore = useAppStore();

import { onMounted, onUnmounted } from 'vue';

onMounted(() =>
  window.addEventListener('showOverlay', (e) => closePopUps(e as CustomEvent))
);

onUnmounted(() =>
  window.addEventListener('showOverlay', (e) => closePopUps(e as CustomEvent))
);

const closePopUps = (e: CustomEvent) =>
  e.detail == false ? appStore.closeAllPopUps() : null;
</script>
