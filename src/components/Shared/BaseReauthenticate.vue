<template>
  <transition name="reauthenticate-fade">
    <div
      v-if="reauthenticateStore.isShowed"
      class="fullscreen"
      style="z-index: 3250; backdrop-filter: blur(1px) brightness(0.75)"
    >
      <div
        class="absolute-center column items-center q-mx-auto q-pa-lg bg-surface rounded-borders gap-sm box-shadow"
        style="width: max(320px, 90%); z-index: 3500"
      >
        <div class="column items-center gap-xs">
          <base-title title="Weryfikacja" size="10" />

          <p>Wpisz swoje aktualne hasło</p>
        </div>

        <base-input
          v-model="reauthenticateStore.password"
          type="password"
          :icon="iconStore.icon.lock"
          :minlength="5"
          label="Hasło"
          placeholder="Wpisz swoje aktualne hasło"
          :required="true"
          bg-color="surfaceVariant"
          autocomplete="current-password"
          @has-error="(value: boolean) => (reauthenticateStore.passwordError = value)"
        />

        <q-space />

        <div class="row gap-md">
          <base-button
            label="Anuluj"
            corner-small
            transparent
            @click="reauthenticateStore.canceled"
          />

          <base-button
            label="Zaloguj się"
            :disabled="reauthenticateStore.passwordError"
            loading
            corner-small
            @click="reauthenticateStore.reauthenticate"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { useReauthenticateStore } from 'stores/reauthenticateStore';

const iconStore = useIconStore();
const reauthenticateStore = useReauthenticateStore();
</script>
