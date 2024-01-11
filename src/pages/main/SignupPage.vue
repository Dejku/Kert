<template>
  <q-page class="flex-center">
    <BaseButton
      label="Zaloguj się"
      :iconRight="iconsStore.icons.arrowUpLeft"
      class="base__button--color-secondary absolute-top-left q-pa-xs"
      style="padding: 5px 10px; border-radius: 0 10px 10px 0"
      noBorder
      :shadow="false"
      @click="router.push('/login')"
    />

    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <div
        v-if="codeStage"
        class="column items-center q-pa-lg full-width bg-surface rounded-borders gap-lg shadow"
      >
        <h6 class="main-title text-size-10">Wpisz kod</h6>
        <div class="row flex-center full-width gap-sm">
          <input
            v-for="(el, ind) in inputs"
            v-model="inputs[ind]"
            :id="`input${ind}`"
            :key="ind"
            class="codesContainer__input text-weight-600 text-center rounded-borders--small q-py-xs q-px-sm overflow-hidden shadow"
            placeholder="0"
            maxlength="1"
            @keyup="handleKeyUp($event, ind)"
            @click="inputs[ind] = null"
          />
        </div>

        {{ code }}
      </div>

      <div
        v-else
        class="column items-center q-pa-lg full-width bg-surface rounded-borders gap-lg shadow"
      >
        <h6 class="main-title text-size-10">Stwórz konto</h6>

        <div class="full-width">
          <label class="q-ml-xs text-size-6">Nazwa</label>
          <BaseInput
            v-model="nick"
            :type="'text'"
            :icon="iconsStore.icons.person"
            :placeholder="'Wpisz swoją nazwę'"
            :minlength="3"
            :isRequired="true"
            :altColor="true"
            @has-error="(value: boolean) => (nameError = value)"
          />
        </div>

        <div class="full-width">
          <label class="q-ml-xs text-size-6">E-mail</label>
          <BaseInput
            v-model="email"
            :type="'email'"
            :icon="iconsStore.icons.mail"
            :placeholder="'Wpisz swój e-mail'"
            :isRequired="true"
            :altColor="true"
            @has-error="(value: boolean) => (emailError = value)"
          />
        </div>

        <div class="full-width">
          <label class="q-ml-xs text-size-6">Hasło</label>
          <BaseInput
            v-model="password"
            @update:model-value="checkPassword"
            :type="'password'"
            :icon="iconsStore.icons.lock"
            :minlength="6"
            :placeholder="'Wpisz swoje hasło'"
            :isRequired="true"
            :altColor="true"
            :custom-error="isSamePassword ? '' : 'Hasła się nie zgadzają'"
            @has-error="(value: boolean) => (passwordError = value)"
          />
        </div>

        <div class="full-width">
          <label class="q-ml-xs text-size-6">Powtórz hasło</label>
          <BaseInput
            v-model="confirmPassword"
            @update:model-value="checkPassword"
            :type="'password'"
            :icon="iconsStore.icons.lock"
            :minlength="6"
            :placeholder="'Powtórz hasło'"
            :isRequired="true"
            :altColor="true"
            :custom-error="isSamePassword ? '' : 'Hasła się nie zgadzają'"
            @has-error="(value: boolean) => (confirmPasswordError = value)"
          />
        </div>

        <BaseButton
          label="Stwórz konto"
          :iconRight="iconsStore.icons.login"
          :disabled="!checkValidation()"
          cornerSmall
          @click="signup"
        />
      </div>
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useIconsStore } from 'stores/iconsStore';
import { useAlertsStore } from 'stores/alertsStore';
import { useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';

const iconsStore = useIconsStore();
const { createAlert, formatMessage } = useAlertsStore();
const router = useRouter();

const nameError = ref<boolean>(true);
const emailError = ref<boolean>(true);
const passwordError = ref<boolean>(true);
const confirmPasswordError = ref<boolean>(true);
const isSamePassword = ref<boolean>(true);

const code = ref();
const codeStage = ref<boolean>(true);

const nick = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

const inputCount = 6;
const inputs = reactive([null]);

for (let i = 0; i < inputCount; i++) inputs[i] = null;

onMounted(() => {
  const input = document.getElementById('input0') as HTMLInputElement;
  if (input) input.focus();
});

function handleKeyUp(event: KeyboardEvent, number: number) {
  const input = document.getElementById(`input${number}`) as HTMLInputElement;

  const { key } = event;
  if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft') {
    const prev = input.previousElementSibling as HTMLInputElement;
    if (prev) prev.focus();

    return;
  }

  const next = input.nextElementSibling as HTMLInputElement;
  if (next) next.focus();

  if (isDigitsFull()) checkCode();
}

const isDigitsFull = () => {
  for (const elem of inputs)
    if (elem == null || elem == undefined) return false;

  return true;
};

const checkCode = () => {
  code.value = inputs.join('');

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
    .then(() => {
      if (auth.currentUser)
        updateProfile(auth.currentUser, {
          displayName: nick.value,
        });
    })
    .catch((error) => {
      console.log(error);

      createAlert({
        message: formatMessage(error),
        state: 'error',
        duration: 5,
      });
    });
};
</script>

<style lang="scss" scoped>
.codesContainer__input {
  width: calc(100% / 6 - 10px);
  background-color: var(--surfaceVariant) !important;

  input::placeholder {
    color: var(--onSurfaceVariant);
    opacity: 0.75;
  }
}
</style>
