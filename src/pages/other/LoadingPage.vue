<template>
  <q-page class="flex-center gap-sm">
    <q-spinner-hourglass color="primary" size="2em" />
    <base-title title="Ładowanie..." size="7" />
  </q-page>
</template>

<script setup lang="ts">
import { useAccountStore } from 'stores/accountStore';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const accountStore = useAccountStore();
const router = useRouter();

const interval = setInterval(
  () =>
    accountStore.isLogged ? router.replace('/home') : router.replace('/login'),
  1000
);

onBeforeRouteLeave(() => clearInterval(interval));
</script>
