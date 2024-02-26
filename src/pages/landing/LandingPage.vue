<template>
  <q-page class="flex-center gap-sm">
    <q-spinner-hourglass color="primary" size="2em" />
    <base-title title="Ładowanie..." size="7" />
  </q-page>
</template>

<script setup lang="ts">
import { useAccountStore } from 'stores/accountStore';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore();
const router = useRouter();

onMounted(() =>
  window.addEventListener('firebase--auth-ready', () => loadApp())
);

onUnmounted(() =>
  window.removeEventListener('firebase--auth-ready', () => loadApp())
);

const loadApp = () =>
  setTimeout(
    () =>
      accountStore.isLogged
        ? router.replace('/home')
        : router.replace('/login'),
    2000
  );
</script>
