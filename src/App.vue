<template>
  <Alerts />

  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>

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
import { useAlertsStore } from 'stores/alertsStore';
import { useIconsStore } from 'stores/iconsStore';

import { onMounted, onUnmounted } from 'vue';

import 'database/firebase';
import authStart from 'database/auth';

const appStore = useAppStore();
const alertsStore = useAlertsStore();
const iconsStore = useIconsStore();

onMounted(() => {
  authStart();

  window.addEventListener('showOverlay', (e) => closePopUps(e as CustomEvent));
  window.addEventListener('online', HandleNetworkChange);
  window.addEventListener('offline', HandleNetworkChange);
});

onUnmounted(() => {
  window.removeEventListener('showOverlay', (e) =>
    closePopUps(e as CustomEvent)
  );
  window.removeEventListener('online', HandleNetworkChange);
  window.removeEventListener('offline', HandleNetworkChange);
});

const closePopUps = (e: CustomEvent) =>
  e.detail == false || 'failed' ? appStore.closeAllPopUps() : null;

const HandleNetworkChange = () => {
  if (navigator.onLine) {
    alertsStore.createAlert({
      message: 'Połączono z internetem',
      state: 'info',
      duration: 3,
    });

    alertsStore.deleteHeaderAlert('noWifi');
  } else {
    alertsStore.createAlert({
      message: 'Brak połączenia z internetem',
      state: 'noWifi',
      duration: 5,
    });

    alertsStore.createHeaderAlert({
      id: 'noWifi',
      icon: iconsStore.icons.noWifi,
    });
  }
};
</script>
