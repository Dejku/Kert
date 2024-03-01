<template>
  <Alerts />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <BaseDialog />
  <BaseModal />
  <BaseOverlay />
  <BaseReauthenticate />
</template>

<script setup lang="ts">
import Alerts from 'components/alerts/AlertsContainer.vue';
import BaseDialog from 'components/Shared/BaseDialog.vue';
import BaseModal from 'components/Shared/BaseModal.vue';
import BaseOverlay from 'components/Shared/BaseOverlay.vue';
import BaseReauthenticate from 'components/Shared/BaseReauthenticate.vue';

import { useAppStore } from 'stores/appStore';
import { onMounted, onUnmounted } from 'vue';
import { QSpinnerRadio, useQuasar } from 'quasar';

import 'database/firebase';
import authStart from 'database/auth';

const appStore = useAppStore();
const $q = useQuasar();

onMounted(() => {
  appStore.startClock();
  authStart();

  window.addEventListener('online', HandleNetworkChange, false);
  window.addEventListener('offline', HandleNetworkChange, false);

  if (process.env.PROD) window.screen.orientation.lock('portrait');
});

onUnmounted(() => {
  appStore.stopClock();

  window.removeEventListener('online', HandleNetworkChange, false);
  window.removeEventListener('offline', HandleNetworkChange, false);
});

const HandleNetworkChange = () => {
  if (navigator.onLine) $q.loading.hide();
  else
    $q.loading.show({
      spinner: QSpinnerRadio,
      spinnerSize: 75,
      message: 'Brak połączenia z internetem...',
    });
};
</script>
