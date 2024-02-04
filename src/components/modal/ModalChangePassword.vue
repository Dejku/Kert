<template>
  <div class="column gap-sm">
    <div class="text-center">
      <p>Zmień hasło do swojego konta</p>
      <p>Powinno ono zawierać minimum 6 znaków</p>
    </div>

    <base-input
      class="q-px-sm"
      v-model="modalStore.component.user.password"
      type="password"
      :icon="iconStore.icon.lock"
      label="Nowe Hasło"
      placeholder="Wpisz swoje nowe hasło"
      :minlength="6"
      :required="true"
      bg-color="surfaceVariant"
      autocomplete="new-password"
      @has-error="(value: boolean) => {modalStore.modal.buttons.isDisabled = value}"
    />
  </div>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { useModalStore } from 'stores/modalStore';

const iconStore = useIconStore();
const modalStore = useModalStore();
</script>
