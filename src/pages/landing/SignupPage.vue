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

    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <base-otp v-if="codeStage" :length="6" @update:modelValue="checkCode" />

      <div
        v-else
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
          autocomplete="nickname"
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
          @update:model-value="checkPassword"
          type="password"
          :icon="iconStore.icon.lock"
          :minlength="6"
          label="Hasło"
          placeholder="Wpisz swoje hasło"
          :required="true"
          bg-color="surfaceVariant"
          autocomplete="new-password"
          :custom-error="isSamePassword ? '' : 'Hasła się nie zgadzają'"
          @has-error="(value: boolean) => (passwordError = value)"
        />

        <base-input
          v-model="confirmPassword"
          @update:model-value="checkPassword"
          type="password"
          :icon="iconStore.icon.lock"
          :minlength="6"
          label="Powtórz hasło"
          placeholder="Powtórz hasło"
          :required="true"
          bg-color="surfaceVariant"
          autocomplete="new-password"
          :custom-error="isSamePassword ? '' : 'Hasła się nie zgadzają'"
          @has-error="(value: boolean) => (confirmPasswordError = value)"
        />

        <base-button
          label="Stwórz konto"
          :icon-right="iconStore.icon.login"
          :disabled="!checkValidation()"
          loading-state
          corner-small
          @click="signup"
        />
      </div>
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { fireEvent } from 'utils';

import { useIconStore } from 'stores/iconStore';
import { useAccountStore } from 'stores/accountStore';
import { useAlertStore } from 'stores/alertStore';
import { useAppStore } from 'src/stores/appStore';

import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const iconStore = useIconStore();
const { createAlert, formatMessage } = useAlertStore();
const accountStore = useAccountStore();
const appStore = useAppStore();
const router = useRouter();

const codeStage = ref<boolean>(true);
const nick = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

const nameError = ref<boolean>(true);
const emailError = ref<boolean>(true);
const passwordError = ref<boolean>(true);
const confirmPasswordError = ref<boolean>(true);
const isSamePassword = ref<boolean>(true);

const checkCode = (value: string) => {
  console.log(value);

  codeStage.value = false;
};

const checkValidation = () => {
  return (
    !nameError.value ||
    !emailError.value ||
    !passwordError.value ||
    !confirmPasswordError.value ||
    !isSamePassword.value
  );
};

const checkPassword = () =>
  (isSamePassword.value = password.value === confirmPassword.value);

const signup = () => {
  if (!checkValidation() || !checkPassword()) return;
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

      accountStore.saveUser({
        id: user.uid,
        displayName: nick.value,
        photoURL: null,
      });

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
