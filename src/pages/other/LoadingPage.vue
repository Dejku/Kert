<template>
  <q-page class="flex-center gap-sm">
    <q-spinner-hourglass color="primary" size="2em" />
    <h6 class="no-margin">Trwa ładowanie...</h6>
  </q-page>
</template>

<script setup lang="ts">
import { useAccountStore } from 'src/stores/accountStore';
import { useRouter } from 'vue-router';

const accountStore = useAccountStore();
const router = useRouter();

setTimeout(() => {
  if (!accountStore.isLogged) router.replace('/landing');
}, 1000);
</script>
