<template>
  <q-page class="gap-md">
    <base-title
      :icon-left="iconStore.icon.arrowBack"
      title="Twoja Praca"
      go="-1"
    />

    <section
      class="column flex-center q-py-md bg-surface rounded-borders gap-sm box-shadow"
    >
      <base-title
        title="Ile dni urlopu Ci przysługuje?"
        size="5"
        weight="500"
      />

      <div class="row gap-md">
        <div
          class="q-px-md q-py-sm text-bold rounded-borders transition-03 box-shadow"
          :class="
            vacationStore.numberOfVacationDaysPerYear == 20
              ? 'bg-primary text-onPrimary'
              : 'bg-surfaceVariant text-onSurfaceVariant'
          "
          @click="updateNumberOfVacationDaysPerYear(20)"
        >
          20
        </div>
        <div
          class="q-px-md q-py-sm text-bold rounded-borders transition-03 box-shadow"
          :class="
            vacationStore.numberOfVacationDaysPerYear == 26
              ? 'bg-primary text-onPrimary'
              : 'bg-surfaceVariant text-onSurfaceVariant'
          "
          @click="updateNumberOfVacationDaysPerYear(26)"
        >
          26
        </div>
      </div>
    </section>

    <section
      class="column flex-center q-px-sm q-py-md bg-surface rounded-borders gap-md box-shadow"
    >
      <div
        class="row items-center full-width q-px-xs bg-background rounded-borders"
      >
        <base-input
          type="number"
          v-model="overdueVacationDays"
          :value="vacationStore.overdueVacationDays"
          placeholder="0"
          width="50"
          transparent
          text-center
          minlength="0"
          :disabled="!canModify"
        />
        <span>Ilość zeszłorocznego urlopu</span>
      </div>

      <div
        class="row items-center full-width q-px-xs bg-background rounded-borders"
      >
        <base-input
          type="number"
          v-model="availableNormalVacationDaysForUser"
          :value="vacationStore.availableLimitsForUser['Urlop wypoczynkowy']"
          placeholder="20"
          width="50"
          transparent
          text-center
          minlength="0"
          :disabled="!canModify"
        />
        <span>Ilość dostępnego urlopu</span>
      </div>

      <base-button
        :label="canModify ? 'Zatwierdź' : 'Modyfikuj'"
        :color="canModify ? 'success' : 'warning'"
        :loading="loading"
        corner-small
        @click="changeModify"
      />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { fireEvent, waitForEvent } from 'utils';
import { useIconStore } from 'stores/iconStore';
import { useVacationStore } from 'stores/vacationStore';
import { useAlertStore } from 'stores/alertStore';

import { ref } from 'vue';
import { uid } from 'quasar';

const iconStore = useIconStore();
const vacationStore = useVacationStore();
const { createAlert } = useAlertStore();

const overdueVacationDays = ref<number>(0);
const availableNormalVacationDaysForUser = ref<number>(20);
const canModify = ref<boolean>(false);
const loading = ref<boolean>(false);

const updateNumberOfVacationDaysPerYear = (
  numberOfVacationDaysPerYear: number
) => {
  if (vacationStore.numberOfVacationDaysPerYear == numberOfVacationDaysPerYear)
    return;

  const eventName = uid();
  vacationStore.updateDatabase({ numberOfVacationDaysPerYear }, eventName);

  showAlert(eventName);
};

const changeModify = async () => {
  canModify.value = !canModify.value;
  loading.value = !loading.value;

  if (canModify.value) return;

  if (checkForErrors()) {
    createAlert({
      message: 'Najpierw usuń nadmiarowy urlop',
      status: 'error',
      duration: 5,
    });
  } else {
    const eventName = uid();
    vacationStore.updateDatabase(
      {
        overdueVacationDays: Number(overdueVacationDays.value),
        availableLimitsForUser: {
          'Urlop wypoczynkowy': Number(
            availableNormalVacationDaysForUser.value
          ),
        },
      },
      eventName
    );

    showAlert(eventName);
  }

  fireEvent('base__button--loadingComplete');
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

const checkForErrors = () => {
  return (
    availableNormalVacationDaysForUser.value -
      vacationStore.countClaimedNormalVacationDaysInYear(
        new Date().getFullYear()
      ) +
      overdueVacationDays.value <
    0
  );
};
</script>
