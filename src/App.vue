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

import { resetPinia } from 'components/utils/stores';
import { useAppStore } from 'stores/appStore';
import { useAccountStore } from 'stores/accountStore';

import {
  getAuth,
  onAuthStateChanged,
  connectAuthEmulator,
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue';

const appStore = useAppStore();
const accountStore = useAccountStore();
const router = useRouter();

onMounted(() =>
  window.addEventListener('showOverlay', (e) => closePopUps(e as CustomEvent))
);

onUnmounted(() =>
  window.addEventListener('showOverlay', (e) => closePopUps(e as CustomEvent))
);

const closePopUps = (e: CustomEvent) =>
  e.detail == false || 'failed' ? appStore.closeAllPopUps() : null;

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
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
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
    router.push('/home');
  } else resetPinia();
});
</script>
