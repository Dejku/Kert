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
import { useAccountStore } from 'stores/accountStore';
import { useAlertsStore } from 'stores/alertsStore';
import { useIconsStore } from 'stores/iconsStore';
import { useResetStore } from 'utils';

import {
  getAuth,
  onAuthStateChanged,
  connectAuthEmulator,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { onMounted, onUnmounted } from 'vue';

const appStore = useAppStore();
const accountStore = useAccountStore();
const alertsStore = useAlertsStore();
const iconsStore = useIconsStore();
const resetStore = useResetStore();

onMounted(() => {
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

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};
initializeApp(firebaseConfig);

const auth = getAuth();

if (location.hostname === 'localhost') {
  const db = getFirestore();
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', {
    disableWarnings: true,
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    accountStore.isLogged = true;

    accountStore.saveUser({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });

    appStore.fetchData();
  } else {
    accountStore.isLogged = false;

    setTimeout(() => resetStore.all(), 500);
  }
});
</script>
