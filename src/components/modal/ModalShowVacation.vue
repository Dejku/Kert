<template>
  <div class="column gap-sm text-weight-300 text-size-7">
    <div class="row justify-between">
      <div class="row items-center gap-xs">
        <q-icon :name="iconStore.icon.calendar" class="text-size-10" />
        Dzień
      </div>
      <span>{{ formattedDate }}</span>
    </div>

    <div class="row justify-between items-center" style="height: 40px">
      <div class="row items-center gap-xs">
        <q-icon :name="iconStore.icon.text" class="text-size-10" />
        Typ
      </div>
      <span>{{ modalStore.component.vacationDays.name }}</span>
    </div>

    <div class="row justify-between">
      <div class="row items-center gap-xs">
        <q-icon :name="iconStore.icon.clock" class="text-size-10" />
        Czas trwania
      </div>
      <div>
        <span>{{
          modalStore.component.vacationDays.time.type == 'day'
            ? 'Cały dzień'
            : `${modalStore.component.vacationDays.time.hours} godz.`
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Months } from 'utils';
import { useIconStore } from 'stores/iconStore';
import { useModalStore } from 'stores/modalStore';
import { ref } from 'vue';

const iconStore = useIconStore();
const modalStore = useModalStore();

const formattedDate = ref<string>('Brak tytułu');

if (modalStore.modal.component.options?.date) {
  formattedDate.value = `${modalStore.modal.component.options.date.day} ${
    Months[modalStore.modal.component.options.date.month - 1].formattedName
  } ${modalStore.modal.component.options.date.year}`;
}
</script>
