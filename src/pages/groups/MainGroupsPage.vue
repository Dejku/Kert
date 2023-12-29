<template>
  <q-page>
    Groups

    <BaseButton @click="click" />
  </q-page>
</template>

<script setup lang="ts">
import { OnDemand } from 'components/models';

import { useModalStore } from 'stores/modalStore';
const modalStore = useModalStore();

const click = async () => {
  const response = await modalStore.showModal({
    component: {
      type: 'showVacation',
      options: {
        date: { day: 29, month: 12, year: 2023 },
        type: OnDemand,
        time: {
          type: 'day',
        },
      },
    },
    buttonsOptions: {
      extendedButton: {
        label: 'Usuń urlop',
        color: 'error',
      },
    },
  });

  if (response.status == 'success') console.log(response);
  else console.log(response);
};
</script>

<style lang="scss"></style>
