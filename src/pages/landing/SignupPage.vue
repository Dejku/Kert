<template>
  <q-page class="flex-center">
    <base-button
      :iconRight="iconStore.icon.arrowUpLeft"
      label="Zaloguj się"
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
      <base-title title="Stwórz konto" size="10" />

      <base-input
        v-model="nick"
        type="text"
        :icon="iconStore.icon.person"
        label="Nazwa"
        placeholder="Wpisz swoją nazwę"
        :minlength="3"
        :required="true"
        bg-color="surfaceVariant"
        autocomplete="username"
        @has-error="(value: boolean) => (nameError = value)"
      />

      <base-input
        v-model="email"
        type="email"
        :icon="iconStore.icon.mail"
        label="E-mail"
        placeholder="Wpisz swój e-mail"
        :required="true"
        bg-color="surfaceVariant"
        autocomplete="email"
        @has-error="(value: boolean) => (emailError = value)"
      />

      <base-input
        v-model="password"
        type="password"
        :icon="iconStore.icon.lock"
        :minlength="6"
        label="Hasło"
        placeholder="Wpisz swoje hasło"
        :required="true"
        bg-color="surfaceVariant"
        autocomplete="new-password"
        @has-error="(value: boolean) => (passwordError = value)"
      />

      <base-button
        label="Stwórz konto"
        :icon-right="iconStore.icon.login"
        :disabled="!checkValidation()"
        loading
        corner-small
        @click="signup"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { fireEvent } from 'utils';

import { useIconStore } from 'stores/iconStore';
import { useAccountStore } from 'stores/accountStore';
import { useAlertStore } from 'stores/alertStore';
import { useAppStore } from 'stores/appStore';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const iconStore = useIconStore();
const { createAlert, formatMessage } = useAlertStore();
const accountStore = useAccountStore();
const appStore = useAppStore();
const router = useRouter();

const nick = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');

const nameError = ref<boolean>(true);
const emailError = ref<boolean>(true);
const passwordError = ref<boolean>(true);

const checkValidation = () =>
  !nameError.value && !emailError.value && !passwordError.value;

const signup = () => {
  if (!checkValidation()) return;
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (result) => {
      const user = result.user;
      const db = getFirestore();

      await setDoc(doc(db, 'vacationStore', user.uid), {
        currentYear: appStore.todayDate.getFullYear(),
        overdueVacationDays: 0,
        numberOfVacationDaysPerYear: 20,
        availableLimitsForUser: {
          'Urlop wypoczynkowy': 20,
          'Na żądanie': 4,
          'Siła wyższa': 16,
        },
        claimedVacationDays: [] as ClaimedVacationDays[],
      });

      await setDoc(doc(db, 'newsStore', user.uid), {
        news: [] as News[],
      });

      await setDoc(doc(db, 'preferenceStore', user.uid), {
        preference: {
          notification: {
            volume: 0,
          },
        } as Preference,
      });

      if (auth.currentUser)
        await updateProfile(auth.currentUser, {
          displayName: nick.value,
        });

      accountStore.user.displayName = nick.value;

      router.push('/home');
    })
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
