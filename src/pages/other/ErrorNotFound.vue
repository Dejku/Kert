<template>
  <q-page class="flex-center">
    <div
      class="text-bold text-error"
      style="font-size: 25vw; letter-spacing: 5px"
    >
      4<span class="text-errorContainer">0</span>4
    </div>

    <h6 class="no-margin text-bold text-size-7">
      Strona nie została odnaleziona
    </h6>
    <p class="no-margin text-center text-weight-200">
      Kliknij poniższy przycisk aby wrócić na poprzednią stronę
    </p>

    <BaseButton
      label="Cofnij"
      :icon-right="iconsStore.icons.arrowUpLeft"
      class="absolute-bottom q-mx-auto"
      style="margin-bottom: 10vh"
      @click="router.replace('/home')"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useIconsStore } from 'src/stores/iconsStore';
import { useRouter } from 'vue-router';

const iconsStore = useIconsStore();
const router = useRouter();
</script>
