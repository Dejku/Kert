<template>
  <q-page class="gap-md">
    <base-title
      :icon-left="iconStore.icon.arrowBack"
      title="Twoje Konto"
      to="/settings"
    />

    <section
      class="row items-center q-py-sm q-px-lg bg-surface rounded-borders box-shadow"
    >
      <q-avatar size="14vw">
        <img src="~src/assets/default_avatar.png" />
      </q-avatar>

      <div class="row items-center q-mx-auto">
        <base-title :title="accountStore.user.displayName" size="5" />

        <base-button
          :icon-left="iconStore.icon.edit"
          label=""
          transparent
          no-border
          circle
          size="1"
          @click="changeName"
        />
      </div>
    </section>

    <section
      class="column q-py-sm q-px-md bg-surface rounded-borders box-shadow gap-sm"
    >
      <div>
        <div class="row items-center">
          <base-title title="Twój identyfikator konta:" size="5" />

          <q-space />

          <base-button
            :icon-left="iconStore.icon_fill.copy"
            label=""
            transparent
            no-border
            circle
            size="0"
            @click="copyTextToClipboard(accountStore.user.id)"
          />
        </div>

        <span class="flex flex-center">
          {{ accountStore.user.id }}
        </span>
      </div>
    </section>

    <section
      class="column q-py-sm q-px-md bg-surface rounded-borders box-shadow gap-sm"
    >
      <div>
        <div class="row items-center gap-sm">
          <base-title title="Hasło" size="5" />

          <q-space />
          <base-button
            :icon-left="iconStore.icon.edit"
            label=""
            transparent
            no-border
            circle
            size="0"
            @click="changePassword"
          />
        </div>
      </div>
    </section>

    <q-space />

    <section
      class="column flex-center q-py-sm bg-surface rounded-borders box-shadow gap-sm"
    >
      <base-title title="Strefa zagrożenia" size="5" />

      <base-button color="red" label="Usuń konto" size="1" disabled />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { copyTextToClipboard } from 'utils';
import { ErrorAlert } from 'models';

import { useIconStore } from 'stores/iconStore';
import { useAccountStore } from 'stores/accountStore';
import { useModalStore } from 'stores/modalStore';
import { useAlertStore } from 'stores/alertStore';

import { getAuth, updateProfile } from 'firebase/auth';

const iconStore = useIconStore();
const accountStore = useAccountStore();
const modalStore = useModalStore();
const alertStore = useAlertStore();

const changeName = async () => {
  const response = await modalStore.showModal({
    title: 'Zmień swoją nazwę',
    component: { type: 'changeName' },
    buttonsOptions: {
      baseButton: {
        label: 'Wróć',
        transparent: true,
      },
      secondaryButton: {
        label: 'Zmień nazwę',
        color: 'primary',
        transparent: false,
      },
    },
  });

  if (response.status == 'success') {
    const auth = getAuth();
    const displayName = modalStore.component.user.displayName;

    if (auth.currentUser)
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          accountStore.user.displayName = displayName;

          alertStore.createAlert({
            status: 'success',
            message: 'Nazwa pomyślnie zaktualizowana',
            duration: 3,
          });
        })
        .catch((error) => {
          console.error(error);

          alertStore.createAlert(ErrorAlert);
        });
  }
};
const changePassword = async () => {
  const response = await modalStore.showModal({
    title: 'Zmień hasło',
    component: { type: 'changePassword' },
    buttonsOptions: {
      baseButton: {
        label: 'Wróć',
        transparent: true,
      },
      secondaryButton: {
        label: 'Zmień hasło',
        color: 'primary',
        transparent: false,
      },
    },
  });

  if (response.status == 'success') {
    console.log(response); // TODO
  }
};
</script>
