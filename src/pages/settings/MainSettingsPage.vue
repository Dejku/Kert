<template>
  <q-page class="column gap-20">
    <h6 class="main-title">Ustawienia</h6>

    <section
      class="column q-px-md q-py-sm bg-surface rounded-borders gap-20 shadow"
    >
      <router-link to="/settings/account" class="row items-center">
        <div class="row gap-10">
          <div>
            <q-avatar size="15vw">
              <img :src="accountStore.getAvatar" />
            </q-avatar>
          </div>

          <div>
            <h6
              class="no-margin text-weight-600"
              style="margin-bottom: -5px !important"
            >
              {{ accountStore.nickName }}
            </h6>
            <span class="text-size-4" style="opacity: 0.75">Twoje konto</span>
          </div>
        </div>

        <q-space />

        <q-icon
          :name="iconsStore.icons.arrowRight"
          class="text-size-7 text-tertiary"
        />
      </router-link>
    </section>

    <section
      v-for="(section, index) in sections"
      :key="index"
      class="column q-px-md q-py-sm bg-surface rounded-borders gap-20 shadow"
    >
      <div
        v-for="element in section"
        :key="element.label"
        @click="element.click"
        class="row items-center gap-10"
      >
        <q-icon :name="element.icon" class="text-size-10" />

        <span>{{ element.label }}</span>

        <q-space />

        <q-icon
          :name="iconsStore.icons.arrowRight"
          class="text-size-7 text-tertiary"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore';
import { useAccountStore } from 'stores/accountStore';
import { useRouter } from 'vue-router';

const iconsStore = useIconsStore();
const accountStore = useAccountStore();
const router = useRouter();

const sections = {
  links: [
    {
      icon: iconsStore.icons.bell,
      label: 'Powiadomienia',
      click: function () {
        router.push('/settings/notifications');
      },
    },
    {
      icon: iconsStore.icons.calendar,
      label: 'Twoja praca',
      click: function () {
        router.push('/settings/work');
      },
    },
    {
      icon: iconsStore.icons.colorPalette,
      label: 'Kolory aplikacji',
      click: function () {
        router.push('/settings/themes');
      },
    },
  ],
  misc: [
    {
      icon: iconsStore.icons.logout,
      label: 'Wyloguj się',
      click: function () {
        logout();
      },
    },
  ],
};

const logout = async () => {
  console.log('test');
};
</script>
