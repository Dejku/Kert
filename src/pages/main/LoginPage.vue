<template>
  <q-page class="flex-center">
    <BaseButton
      :icon__before="iconsStore.icons.arrowUpRight"
      class="base__button--color-secondary absolute-top-right q-pa-xs"
      style="padding: 5px 10px; border-radius: 10px 0 0 10px"
      noBorder
      @click="router.push('/signup')"
    >
      Utwórz konto
    </BaseButton>

    <div
      class="column items-center q-pa-lg full-width bg-surface rounded-borders gap-20 shadow"
    >
      <h6 class="main-title text-size-10">Zaloguj się</h6>

      <div class="full-width">
        <label class="q-mr-xs text-size-6">E-mail</label>
        <BaseInput
          :type="'email'"
          :icon="iconsStore.icons.mail"
          :placeholder="'Wpisz swój e-mail'"
          :isRequired="true"
          :altColor="true"
          @has-error="(value: boolean) => (emailError = value)"
        />
      </div>

      <div class="full-width">
        <label class="q-mr-xs text-size-6">Hasło</label>
        <BaseInput
          :type="'password'"
          :icon="iconsStore.icons.lock"
          :minlength="5"
          :placeholder="'Wpisz swoje hasło'"
          :isRequired="true"
          :altColor="true"
          @has-error="(value: boolean) => (passwordError = value)"
        />
      </div>

      <q-space />

      <BaseButton
        :icon__after="iconsStore.icons.login"
        :disabled="emailError || passwordError"
        cornerSmall
        @click="console.log('logged')"
      >
        Zaloguj się
      </BaseButton>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useIconsStore } from 'src/stores/iconsStore';

import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const iconsStore = useIconsStore();

const emailError = ref<boolean>(true);
const passwordError = ref<boolean>(true);
</script>
