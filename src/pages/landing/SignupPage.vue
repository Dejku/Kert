<template>
  <q-page class="flex-center">
    <BaseButton
      :iconRight="iconsStore.icons.arrowUpLeft"
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
      <BaseOTP v-if="codeStage" :length="6" @update:modelValue="checkCode" />

      <div
        v-else
        class="column items-center q-pa-lg full-width bg-surface rounded-borders gap-lg box-shadow"
      >
        <h6 class="main-title text-size-10">Stwórz konto</h6>

        <div class="full-width">
          <BaseInput
            v-model="nick"
            type="text"
            :icon="iconsStore.icons.person"
            label="Nazwa"
            placeholder="Wpisz swoją nazwę"
            :minlength="3"
            :is-required="true"
            :alt-color="true"
            autocomplete="nickname"
            @has-error="(value: boolean) => (nameError = value)"
          />
        </div>

        <div class="full-width">
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
        </div>

        <div class="full-width">
          <BaseInput
            v-model="password"
            @update:model-value="checkPassword"
            type="password"
            :icon="iconsStore.icons.lock"
            :minlength="6"
            label="Hasło"
            placeholder="Wpisz swoje hasło"
            :is-required="true"
            :alt-color="true"
            autocomplete="new-password"
            :custom-error="isSamePassword ? '' : 'Hasła się nie zgadzają'"
            @has-error="(value: boolean) => (passwordError = value)"
          />
        </div>

        <div class="full-width">
          <BaseInput
            v-model="confirmPassword"
            @update:model-value="checkPassword"
            type="password"
            :icon="iconsStore.icons.lock"
            :minlength="6"
            label="Powtórz hasło"
            placeholder="Powtórz hasło"
            :is-required="true"
            :alt-color="true"
            autocomplete="new-password"
            :custom-error="isSamePassword ? '' : 'Hasła się nie zgadzają'"
            @has-error="(value: boolean) => (confirmPasswordError = value)"
          />
        </div>

        <BaseButton
          label="Stwórz konto"
          :icon-right="iconsStore.icons.login"
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
import { useIconsStore } from 'stores/iconsStore';
import { useAccountStore } from 'stores/accountStore';
import { useAlertsStore } from 'stores/alertsStore';

import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const iconsStore = useIconsStore();
const { createAlert, formatMessage } = useAlertsStore();
const accountStore = useAccountStore();
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
        currentYear: new Date().getFullYear(),
        overdueVacationDays: 0,
        numberOfVacationDaysPerYear: 20,
        claimedVacationDays: [],
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
    .catch((error) =>
      createAlert({
        message: formatMessage(error),
        state: 'error',
        duration: 5,
      })
    );
};
</script>
