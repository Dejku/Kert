<template>
  <q-page class="flex-center">
    <div
      class="text-bold text-error"
      style="font-size: 25vw; letter-spacing: 5px"
    >
      4<span class="text-errorContainer">0</span>4
    </div>

    <base-title
      title="Strona nie została odnaleziona"
      size="7"
      :letter-spacing="false"
    />

    <p class="no-margin text-center text-weight-200">
      Kliknij poniższy przycisk aby wrócić na poprzednią stronę
    </p>

    <base-button
      label="Cofnij"
      :icon-right="iconStore.icon.arrowUpLeft"
      class="absolute-bottom q-mx-auto"
      style="margin-bottom: 10vh"
      @click="router.back()"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { useRouter } from 'vue-router';

const iconStore = useIconStore();
const router = useRouter();
</script>
