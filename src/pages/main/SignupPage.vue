<template>
  <q-page class="flex-center">
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <div v-if="codeStage" class="login__container column full-width shadow">
        <h6 class="login__container__title main__title">Wpisz kod</h6>
        <div class="login__container__input">
          <BaseInput
            class="login__container__input__code"
            v-model="code"
            :type="'text'"
            :placeholder="'Wpisz kod'"
            :minlength="6"
            :maxlength="6"
            :isRequired="true"
            :altColor="true"
            :textCenter="true"
          />
        </div>
      </div>

      <div v-else class="login__container column full-width shadow">
        <h6 class="login__container__title main__title">Stwórz konto</h6>
        <div class="login__container__input">
          <label>Nazwa</label>
          <BaseInput
            :type="'text'"
            :icon="iconsStore.icons.person"
            :placeholder="'Wpisz swoją nazwę'"
            :minlength="4"
            :isRequired="true"
            :altColor="true"
            @has-error="(value: boolean) => (nameError = value)"
          />
        </div>
        <div class="login__container__input">
          <label>E-mail</label>
          <BaseInput
            :type="'email'"
            :icon="iconsStore.icons.mail"
            :placeholder="'Wpisz swój e-mail'"
            :isRequired="true"
            :altColor="true"
            @has-error="(value: boolean) => (emailError = value)"
          />
        </div>
        <div class="login__container__input">
          <label>Hasło</label>
          <BaseInput
            v-model="password"
            @update:model-value="checkPassword"
            :type="'password'"
            :icon="iconsStore.icons.lock"
            :minlength="5"
            :placeholder="'Wpisz swoje hasło'"
            :isRequired="true"
            :altColor="true"
            :custom-error="isSamePassword ? '' : 'Hasła się nie zgadzają'"
            @has-error="(value: boolean) => (passwordError = value)"
          />
        </div>
        <div class="login__container__input">
          <label>Powtórz hasło</label>
          <BaseInput
            v-model="confirmPassword"
            @update:model-value="checkPassword"
            :type="'password'"
            :icon="iconsStore.icons.lock"
            :minlength="5"
            :placeholder="'Powtórz hasło'"
            :isRequired="true"
            :altColor="true"
            :custom-error="isSamePassword ? '' : 'Hasła się nie zgadzają'"
            @has-error="(value: boolean) => (confirmPasswordError = value)"
          />
        </div>

        <BaseButton
          :icon__after="iconsStore.icons.login"
          class="base__button--corner-small q-mx-auto"
          :class="[
            checkValidation() ? 'base__button--disabled' : '',
            checkValidation() ? 'no-pointer-events' : '',
          ]"
        >
          Stwórz konto
        </BaseButton>
      </div>
    </transition>

    <BaseButton
      :icon__after="iconsStore.icons.arrowUpLeft"
      class="base__button--color-secondary base__button--no-border absolute-top-left"
      @click="router.push('/login')"
      style="padding: 5px; border-radius: 0 10px 10px 0"
    >
      Zaloguj się
    </BaseButton>
  </q-page>
</template>

<script setup lang="ts">
import { useIconsStore } from 'src/stores/iconsStore';

import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';

const router = useRouter();
const iconsStore = useIconsStore();

const nameError = ref<boolean>(true);
const emailError = ref<boolean>(true);
const passwordError = ref<boolean>(true);
const confirmPasswordError = ref<boolean>(true);
const isSamePassword = ref<boolean>(true);

const codeStage = ref<boolean>(true);
const code = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

watch(
  () => code.value,
  () => {
    if (code.value.length == 6) {
      codeStage.value = false;
    }
  }
);

const checkValidation = () => {
  return (
    nameError.value ||
    emailError.value ||
    passwordError.value ||
    confirmPasswordError.value ||
    !isSamePassword.value
  );
};

const checkPassword = () =>
  (isSamePassword.value = password.value === confirmPassword.value);
</script>

<style lang="scss">
.login__container {
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--surface);

  .login__container__title {
    font-size: 26px;
  }

  .login__container__input label {
    font-size: 18px;
    margin-left: 5px;
  }

  .login__container__input__code input {
    letter-spacing: 10px;

    &::placeholder {
      letter-spacing: normal;
    }
  }

  .login__container__error {
    text-align: center;
    color: $--q-error;
    font-size: 16px;
  }
}
</style>
