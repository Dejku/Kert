<template>
  <q-page class="flex-center">
    <q-icon
      :name="iconsStore.icons.successCircle"
      size="25vw"
      class="text-success"
    />

    <h6 class="no-margin text-bold text-size-7">Pomyślnie usunięto konto</h6>
    <p class="no-margin text-center text-weight-200">
      Jeśli chcesz stworzyć nowe,<br />kliknij poniższy przycisk
    </p>

    <BaseButton
      label="Stwórz konto"
      :icon-right="iconsStore.icons.login"
      class="absolute-bottom q-mx-auto"
      style="margin-bottom: 10vh"
      @click="router.replace('/signup')"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useIconsStore } from 'src/stores/iconsStore';
import { useRouter } from 'vue-router';

const iconsStore = useIconsStore();
const router = useRouter();
</script>
