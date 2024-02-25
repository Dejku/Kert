<template>
  <div class="column gap-sm">
    <div class="text-center">
      <p>Ustaw swoją nazwę, która będzie wyświetlana innym użytkownikom.</p>
      <p>Możesz póżniej ponownie ją zmienić</p>
    </div>

    <base-input
      class="q-px-sm"
      v-model="modalStore.component.user.displayName"
      type="text"
      :icon="iconStore.icon.person"
      label="Nazwa"
      placeholder="Wpisz swoją nazwę"
      :minlength="3"
      :required="true"
      bg-color="surfaceVariant"
      autocomplete="nickname"
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
