<template>
  <q-page class="gap-md">
    <base-title
      :icon-left="iconsStore.icons.arrowBack"
      title="Twoja Praca"
      go="-1"
    />

    <section
      class="column flex-center q-py-md bg-surface rounded-borders gap-sm box-shadow"
    >
      <h6 class="text-size-5">Ile dni urlopu Ci przysługuje?</h6>
      <div class="row gap-md">
        <div
          class="q-px-md q-py-sm text-bold rounded-borders transition-03 box-shadow"
          :class="
            vacationStore.numberOfVacationDaysPerYear == 20
              ? 'bg-primary text-onPrimary'
              : 'bg-surfaceVariant text-onSurfaceVariant'
          "
          @click="vacationStore.setNumberOfVacationDaysPerYear(20)"
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
          @click="vacationStore.setNumberOfVacationDaysPerYear(26)"
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
        corner-small
        @click="canModify = !canModify"
      />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { useVacationStore } from 'stores/vacationStore';
import { useIconsStore } from 'stores/iconsStore.js';
import { ref } from 'vue';

const iconsStore = useIconsStore();
const vacationStore = useVacationStore();

const canModify = ref<boolean>(false);
</script>

<style scoped></style>
