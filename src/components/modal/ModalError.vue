<template>
  <div class="row flex-center no-wrap q-py-lg text-size-7 text-error gap-sm">
    <q-icon :name="iconStore.icon.alertCircle" class="text-size-13" />
    <span>Coś poszło nie tak!<br />Spróbuj ponownie później</span>
  </div>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
const iconStore = useIconStore();
</script>
