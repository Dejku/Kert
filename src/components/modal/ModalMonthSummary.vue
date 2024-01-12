<template>
  <div class="column gap-sm">
    <header class="row items-center justify-between text-size-7">
      <template v-if="allDays || forceDays">
        Wykorzystany urlop
        <div>
          <span>
            {{
              allDays && forceDays
                ? `${allDays} d. / ${forceDays} g.`
                : allDays
                ? formatString('dni', allDays)
                : forceDays
                ? `${forceDays} g.`
                : null
            }}
          </span>
        </div>
      </template>
      <span v-else class="q-mx-auto q-pa-xl">Brak urlopów</span>
    </header>
    <div
      v-if="allDays || forceDays"
      class="column q-px-sm text-weight-300 text-size-6 gap-sm"
    >
      <header class="row flex-center gap-sm">
        W tym
        <hr
          class="col-grow rounded-borders--big bg-outline no-border no-margin"
        />
      </header>
      <section class="column q-px-xs gap-xs">
        <div v-if="normalDays" class="row justify-between">
          Urlop wypoczynkowy
          <span>
            {{ formatString('dni', normalDays) }}
          </span>
        </div>
        <div v-if="onDemandDays" class="row justify-between">
          Na żądanie
          <span>
            {{ formatString('dni', onDemandDays) }}
          </span>
        </div>
        <div v-if="forceDays" class="row justify-between">
          Siła wyższa
          <span>
            {{ forceDays }}
            godz.
          </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatString } from '../utils';
import { useVacationStore } from 'stores/vacationStore';
import { useModalStore } from 'stores/modalStore';

const vacationStore = useVacationStore();
const modalStore = useModalStore();

const month = (modalStore.modal.component.options.date?.month || 0) + 1;
const year = modalStore.modal.component.options.date?.year || 0;

const allDays = vacationStore.countClaimedNormalVacationDaysInMonth(
  month,
  year
);

const normalDays = vacationStore.countClaimedVacationByType(
  'Urlop wypoczynkowy',
  month,
  year
);

const onDemandDays = vacationStore.countClaimedVacationByType(
  'Na żądanie',
  month,
  year
);

const forceDays = vacationStore.countClaimedVacationByType(
  'Siła wyższa',
  month,
  year
);
</script>
