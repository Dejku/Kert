<template>
  <Alerts />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <AppBlock />
  <BaseDialog />
  <BaseModal />
  <BaseOverlay />
  <BaseReauthenticate />
</template>

<script setup lang="ts">
import Alerts from 'components/alerts/AlertsContainer.vue';
import AppBlock from 'components/Shared/AppBlock.vue';
import BaseDialog from 'components/Shared/BaseDialog.vue';
import BaseModal from 'components/Shared/BaseModal.vue';
import BaseOverlay from 'components/Shared/BaseOverlay.vue';
import BaseReauthenticate from 'components/Shared/BaseReauthenticate.vue';

import { useAppStore } from 'stores/appStore';
const appStore = useAppStore();

import 'database/firebase';
import authStart from 'database/auth';
import { handleAppAvailability } from 'helpers/functions/app';

import { onMounted, onUnmounted } from 'vue';
import { QSpinnerRadio, useQuasar } from 'quasar';
const $q = useQuasar();

const navigatorStart = () => {
  window.addEventListener('online', handleNetworkChange, false);
  window.addEventListener('offline', handleNetworkChange, false);
};

const navigatorStop = () => {
  window.removeEventListener('online', handleNetworkChange, false);
  window.removeEventListener('offline', handleNetworkChange, false);
};

const handleNetworkChange = () => {
  if (navigator.onLine) $q.loading.hide();
  else
    $q.loading.show({
      spinner: QSpinnerRadio,
      spinnerSize: 75,
      message: 'Brak połączenia z internetem...',
    });
};

onMounted(() => {
  appStore.startClock();
  authStart();
  navigatorStart();
  handleAppAvailability();

  if (process.env.PROD) window.screen.orientation.lock('portrait');
});

onUnmounted(() => {
  appStore.stopClock();
  navigatorStop();
});
</script>
