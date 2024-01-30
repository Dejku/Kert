<template>
  <q-page class="flex-center">
    <base-button
      :icon-left="iconStore.icon.arrowUpRight"
      label="Utwórz konto"
      color="secondary"
      class="absolute-top-right q-pa-xs"
      style="margin-top: 2vh; padding: 5px 10px; border-radius: 10px 0 0 10px"
      no-border
      :shadow="false"
      @click="router.push('/signup')"
    />

    <div
      class="column items-center q-pa-lg full-width bg-surface rounded-borders gap-lg box-shadow"
    >
      <base-title title="Zaloguj się" size="10" />

      <base-input
        v-model="email"
        type="email"
        :icon="iconStore.icon.mail"
        label="E-mail"
        placeholder="Wpisz swój e-mail"
        :is-required="true"
        bg-color="surfaceVariant"
        autocomplete="email"
        @has-error="(value: boolean) => (emailError = value)"
      />

      <base-input
        v-model="password"
        type="password"
        :icon="iconStore.icon.lock"
        :minlength="5"
        label="Hasło"
        placeholder="Wpisz swoje hasło"
        :is-required="true"
        bg-color="surfaceVariant"
        autocomplete="current-password"
        @has-error="(value: boolean) => (passwordError = value)"
      />

      <q-space />

      <base-button
        label="Zaloguj się"
        :icon-right="iconStore.icon.login"
        :disabled="emailError || passwordError"
        loading-state
        corner-small
        @click="login"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { fireEvent } from 'utils';

import { useIconStore } from 'stores/iconStore';
import { useAlertStore } from 'stores/alertStore';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const iconStore = useIconStore();
const { createAlert, formatMessage } = useAlertStore();
const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');
const emailError = ref<boolean>(true);
const passwordError = ref<boolean>(true);

const login = () => {
  if (emailError.value || passwordError.value) return;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => router.push('/home'))
    .catch((error) => {
      createAlert({
        message: formatMessage(error),
        status: 'error',
        duration: 5,
      });

      fireEvent('base__button--loadingComplete');
    });
};
</script>
