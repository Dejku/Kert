<template>
  <q-page class="flex-center">
    <q-icon
      :name="iconStore.icon.successCircle"
      size="25vw"
      class="text-success"
    />

    <base-title
      title="Pomyślnie usunięto konto"
      size="7"
      :letter-spacing="false"
    />
    <p class="no-margin text-center text-weight-200">
      Jeśli chcesz stworzyć nowe,<br />kliknij poniższy przycisk
    </p>

    <base-button
      label="Stwórz konto"
      :icon-right="iconStore.icon.login"
      class="absolute-bottom q-mx-auto"
      style="margin-bottom: 10vh"
      @click="router.replace('/signup')"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { useRouter } from 'vue-router';

const iconStore = useIconStore();
const router = useRouter();
</script>
