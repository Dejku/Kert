<template>
  <q-page class="flex-center">
    <BaseButton
      :icon-left="iconsStore.icons.arrowUpRight"
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
      <h6 class="main-title text-size-10">Zaloguj się</h6>

      <BaseInput
        v-model="email"
        type="email"
        :icon="iconsStore.icons.mail"
        label="E-mail"
        placeholder="Wpisz swój e-mail"
        :is-required="true"
        :alt-color="true"
        autocomplete="email"
        @has-error="(value: boolean) => (emailError = value)"
      />

      <BaseInput
        v-model="password"
        type="password"
        :icon="iconsStore.icons.lock"
        :minlength="5"
        label="Hasło"
        placeholder="Wpisz swoje hasło"
        :is-required="true"
        :alt-color="true"
        autocomplete="current-password"
        @has-error="(value: boolean) => (passwordError = value)"
      />

      <q-space />

      <BaseButton
        label="Zaloguj się"
        :icon-right="iconsStore.icons.login"
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

import { useIconsStore } from 'stores/iconsStore';
import { useAlertsStore } from 'stores/alertsStore';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const iconsStore = useIconsStore();
const { createAlert, formatMessage } = useAlertsStore();
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
        state: 'error',
        duration: 5,
      });

      fireEvent('base__button--loadingComplete');
    });
};
</script>
