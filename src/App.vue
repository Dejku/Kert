<template>
  <Alerts />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
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
import { useAlertStore } from 'stores/alertStore';
import { useIconStore } from 'stores/iconStore';

import { onMounted, onUnmounted } from 'vue';
import { QSpinnerRadio, useQuasar } from 'quasar';

import 'database/firebase';
import authStart from 'database/auth';

const appStore = useAppStore();
const alertStore = useAlertStore();
const iconStore = useIconStore();

const $q = useQuasar();

onMounted(() => {
  appStore.startClock();
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
    alertStore.createAlert({
      message: 'Ponownie połączono z internetem',
      status: 'info',
      duration: 3,
    });

    alertStore.deleteHeaderAlert('noWifi');

    $q.loading.hide();
  } else {
    alertStore.createHeaderAlert({
      id: 'noWifi',
      icon: iconStore.icon.noWifi,
    });

    $q.loading.show({
      spinner: QSpinnerRadio,
      spinnerSize: 75,
      message: 'Brak połączenia z internetem...',
    });
  }
};
</script>
