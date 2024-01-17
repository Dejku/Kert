<template>
  <q-page class="flex-center gap-sm">
    <q-spinner-hourglass color="primary" size="2em" />
    <base-title title="Ładowanie..." size="7" />
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

setTimeout(() => {
  router.replace('/landing');
}, 1000);
</script>
