<template>
  <q-page class="flex-center">
    <base-button
      :iconRight="iconStore.icon.arrowUpLeft"
      label="Wróc"
      color="secondary"
      class="absolute-top-left q-pa-xs"
      style="margin-top: 2vh; padding: 5px 10px; border-radius: 0 10px 10px 0"
      no-border
      :shadow="false"
      @click="router.push('/login')"
    />

    <div
      class="column items-center q-pa-lg full-width bg-surface rounded-borders gap-lg box-shadow"
    >
      <base-title title="Zresetuj hasło" size="10" />

      <base-input
        v-model="email"
        type="email"
        :icon="iconStore.icon.email"
        label="E-mail"
        placeholder="Wpisz swój e-mail"
        :required="true"
        bg-color="surfaceVariant"
        autocomplete="email"
        @has-error="(value: boolean) => (emailError = value)"
      />

      <base-button
        label="Zresetuj hasło"
        :icon-right="iconStore.icon.sync"
        :disabled="emailError"
        loading
        corner-small
        @click="resetPass"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { fireEvent } from 'utils';

import { useIconStore } from 'stores/iconStore';
import { useAlertStore } from 'stores/alertStore';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const iconStore = useIconStore();
const { createAlert, formatMessage } = useAlertStore();
const router = useRouter();

const email = ref<string>('');
const emailError = ref<boolean>(true);

const resetPass = async () => {
  const auth = getAuth();
  auth.useDeviceLanguage();

  await sendPasswordResetEmail(auth, email.value)
    .then(() => {
      createAlert({
        status: 'success',
        message: 'Sprawdź swojego e-maila',
        duration: 5,
      });
    })
    .catch((error) => {
      console.error(error);

      createAlert({
        message: formatMessage(error),
        status: 'error',
        duration: 5,
      });
    });

  fireEvent('base__button--loadingComplete');
};
</script>
