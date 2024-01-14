<template>
  <q-page class="flex-center">
    <BaseButton
      label="Utwórz konto"
      :iconLeft="iconsStore.icons.arrowUpRight"
      class="base__button--color-secondary absolute-top-right q-pa-xs"
      style="margin-top: 2vh; padding: 5px 10px; border-radius: 10px 0 0 10px"
      noBorder
      :shadow="false"
      @click="router.push('/signup')"
    />

    <div
      class="column items-center q-pa-lg full-width bg-surface rounded-borders gap-lg shadow"
    >
      <h6 class="main-title text-size-10">Zaloguj się</h6>

      <BaseInput
        v-model="email"
        type="email"
        :icon="iconsStore.icons.mail"
        label="E-mail"
        placeholder="Wpisz swój e-mail"
        :isRequired="true"
        :altColor="true"
        @has-error="(value: boolean) => (emailError = value)"
      />

      <BaseInput
        v-model="password"
        type="password"
        :icon="iconsStore.icons.lock"
        :minlength="5"
        label="Hasło"
        placeholder="Wpisz swoje hasło"
        :isRequired="true"
        :altColor="true"
        @has-error="(value: boolean) => (passwordError = value)"
      />

      <q-space />

      <BaseButton
        label="Zaloguj się"
        :iconRight="iconsStore.icons.login"
        :disabled="emailError || passwordError"
        cornerSmall
        @click="login"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
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
    .catch((error) =>
      createAlert({
        message: formatMessage(error),
        state: 'error',
        duration: 5,
      })
    );
};
</script>
