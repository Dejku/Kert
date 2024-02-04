<template>
  <q-page class="column gap-md">
    <base-title title="Ustawienia" />

    <section
      class="column q-px-md q-py-sm bg-surface rounded-borders gap-m box-shadow"
    >
      <router-link to="/settings/account" class="row items-center">
        <div class="row gap-sm">
          <div>
            <q-avatar size="15vw">
              <img src="~src/assets/default_avatar.png" />
            </q-avatar>
          </div>

          <div>
            <base-title
              :title="accountStore.user.displayName || 'Ładowanie...'"
              size="7"
              style="margin-bottom: -5px !important"
            />
            <span class="text-size-4" style="opacity: 0.75">Twoje konto</span>
          </div>
        </div>

        <q-space />

        <q-icon
          :name="iconStore.icon.arrowRight"
          class="text-size-7 text-tertiary"
        />
      </router-link>
    </section>

    <section
      v-for="(section, index) in sections"
      :key="index"
      class="column q-px-md q-py-sm bg-surface rounded-borders gap-md box-shadow"
    >
      <div
        v-for="element in section"
        :key="element.label"
        @click="element.click"
        class="row items-center gap-sm"
      >
        <q-icon :name="element.icon" class="text-size-10" />

        <span>{{ element.label }}</span>

        <q-space />

        <q-icon
          :name="iconStore.icon.arrowRight"
          class="text-size-7 text-tertiary"
        />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { useAccountStore } from 'stores/accountStore';
import { useDialogStore } from 'stores/dialogStore';

import { useRouter } from 'vue-router';

const iconStore = useIconStore();
const accountStore = useAccountStore();
const { showDialog } = useDialogStore();
const router = useRouter();

const sections = {
  links: [
    {
      icon: iconStore.icon.bell,
      label: 'Powiadomienia',
      click: () => router.push('/settings/notification'),
    },
    {
      icon: iconStore.icon.calendar,
      label: 'Twoja praca',
      click: () => router.push('/settings/work'),
    },
  ],
  misc: [
    {
      icon: iconStore.icon.questionMark,
      label: 'Centrum Pomocy',
      click: () => router.push('/help'),
    },
    {
      icon: iconStore.icon.power,
      label: 'Wyloguj się',
      click: () => logout(),
    },
  ],
};

const logout = async () => {
  const dialogOption: DialogOption = {
    title: 'Czy na pewno chcesz się wylogować?',
    buttonsOptions: {
      baseButton: {
        label: 'Nie',
        transparent: true,
      },
      extendedButton: {
        label: 'Tak',
        color: 'error',
      },
    },
  };

  const response = await showDialog(dialogOption);

  if (response.status == 'success') accountStore.logout();
};
</script>
