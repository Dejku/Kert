<template>
  <q-page class="gap-md">
    <base-title
      :icon-left="iconStore.icon.arrowBack"
      title="Powiadomienia"
      back
    />

    <section
      class="column flex-center q-py-md bg-surface rounded-borders gap-sm box-shadow"
    >
      <base-title title="Tryb powiadomień" size="5" weight="500" />

      <div class="row gap-md text-size-4">
        <div
          class="column flex-center q-px-md q-py-sm rounded-borders transition-03 gap-xs box-shadow"
          :class="
            preferenceStore.preference.notification.volume == 0
              ? 'bg-primary text-onPrimary'
              : 'bg-surfaceVariant text-onSurfaceVariant'
          "
          @click="updateNotificationValue(0)"
        >
          <q-icon :name="iconStore.icon.volumeUp" class="text-size-8" />
          Dźwięk
        </div>

        <div
          class="column flex-center q-px-md q-py-sm rounded-borders transition-03 gap-xs box-shadow"
          :class="
            preferenceStore.preference.notification.volume == 1
              ? 'bg-primary text-onPrimary'
              : 'bg-surfaceVariant text-onSurfaceVariant'
          "
          @click="updateNotificationValue(1)"
        >
          <q-icon :name="iconStore.icon.volumeDown" class="text-size-8" />
          Cichy
        </div>

        <div
          class="column flex-center q-px-md q-py-sm rounded-borders transition-03 gap-xs box-shadow"
          :class="
            preferenceStore.preference.notification.volume == 2
              ? 'bg-primary text-onPrimary'
              : 'bg-surfaceVariant text-onSurfaceVariant'
          "
          @click="updateNotificationValue(2)"
        >
          <q-icon :name="iconStore.icon.volumeOff" class="text-size-8" />
          Wyłączony
        </div>
      </div>
    </section>

    <section
      class="column q-px-md q-py-sm bg-surface rounded-borders box-shadow"
    >
      <base-title
        :title="`${
          notificationDesc[preferenceStore.preference.notification.volume].title
        }:`"
        size="5"
      />
      <p class="no-margin text-size-4">
        {{
          notificationDesc[preferenceStore.preference.notification.volume].desc
        }}
      </p>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { waitForEvent } from 'utils';
import { useIconStore } from 'stores/iconStore';
import { useAlertStore } from 'stores/alertStore';
import { usePreferenceStore } from 'stores/preferenceStore';

import { uid } from 'quasar';

const notificationDesc = [
  {
    title: 'Dźwięk',
    desc: 'Powiadomienia są wyświetlane wraz z towarzyszącym im dźwiękiem.',
  },
  {
    title: 'Cichy',
    desc: 'Powiadomienia są wyświetlane lecz dźwięk jest wyciszony.',
  },
  {
    title: 'Wyłączony',
    desc: 'Powiadomienia oraz dźwięk są wyłączone. Wyjątkiem są ważne powiadomienia.',
  },
];

const iconStore = useIconStore();
const { createAlert } = useAlertStore();
const preferenceStore = usePreferenceStore();

const updateNotificationValue = (notificationValue: number) => {
  if (preferenceStore.preference.notification.volume == notificationValue)
    return;

  const eventName = uid();
  preferenceStore.updateDatabase(
    { preference: { notification: { volume: notificationValue } } },
    eventName
  );

  showAlert(eventName);
};

const showAlert = async (eventName: string) => {
  const res = await waitForEvent(eventName);

  if (res.status == 'success') {
    createAlert({
      message: 'Dane zaktualizowane',
      status: res.status,
      duration: 3,
    });
  } else if (res.status == 'error') {
    createAlert({
      message: 'Nie udało się zaktualizować danych',
      status: res.status,
      duration: 5,
    });
  }
};
</script>
