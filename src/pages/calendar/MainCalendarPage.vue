<template>
  <q-page class="gap-10" style="padding-left: 0; padding-right: 0">
    <q-tabs
      v-model="activeTab"
      indicator-color="primary"
      no-caps
      class="q-mx-auto"
    >
      <q-tab name="calendar" label="Kalendarz" :ripple="false" />
      <q-tab name="summary" label="Pozostałe urlopy" :ripple="false" />
    </q-tabs>

    <q-tab-panels v-model="activeTab" animated class="bg-background col-grow">
      <q-tab-panel name="calendar" class="column gap-20">
        <div
          class="row flex-center q-py-xs q-px-sm q-mx-lg bg-surface rounded-borders--big shadow"
        >
          <q-icon
            :name="iconsStore.icons.arrowLeft"
            class="text-size-10"
            @click="changeMonth(-1)"
          />
          <q-space />
          <div>
            {{ renderedMonth[0]?.name }}
            {{ renderedMonth[0]?.year }}
          </div>
          <q-space />
          <q-icon
            :name="iconsStore.icons.arrowRight"
            class="text-size-10"
            @click="changeMonth(1)"
          />
        </div>

        <div class="column flex-center">
          <div id="calendar__day__names">
            <div
              v-for="(day, index) in Days"
              :key="index"
              :id="(index as unknown as string)"
              class="flex flex-center"
            >
              {{ day.substring(0, 3) }}
            </div>
          </div>

          <div id="calendar__container">
            <TransitionGroup :name="`calendar__transition--${transition}`">
              <div
                v-for="month in renderedMonth"
                class="calendar__container__dates"
                :key="`${month.name}/${month.year}`"
              >
                <div
                  v-for="day in month.dates"
                  :key="`${day.day}/${day.month}/${day.year}`"
                  :id="`${day.day}/${day.month}/${day.year}`"
                  class="date flex flex-center border-circle shadow"
                  :class="{
                    'date--state-active': day.active,
                    'date--state-today': day.today,
                    'date--state-claimed-normal':
                      day.active &&
                      vacationStore.isExist({
                        day: day.day,
                        month: day.month,
                        year: day.year,
                      }),
                  }"
                  @click="
                    if (!day.active && day.prev) {
                      changeMonth(-1);
                    } else if (!day.active && day.next) {
                      changeMonth(1);
                    }

                    if (day.active) selectDay(day.day, day.month, day.year);
                  "
                >
                  {{ day.day }}
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>

        <q-separator color="surface" />

        <div class="column flex items-center text-size-4 gap-10">
          <div class="flex row no-wrap gap-5">
            <q-icon :name="iconsStore.icons.info" class="text-size-7" />
            <p class="no-margin">
              Wykorzystany urlopu w tym miesiącu:
              <span class="text-bold">4 dni</span>
            </p>
          </div>
          <div class="flex row no-wrap gap-5">
            <q-icon :name="iconsStore.icons.info" class="text-size-7" />
            <p class="no-margin">
              Pozostały urlopu do wykorzystania:
              <span class="text-bold">16 dni</span>
            </p>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="summary" class="column q-pa-md gap-20">
        <div
          class="column q-px-md q-py-sm bg-surface-gradient rounded-borders shadow gap-10"
        >
          <span class="text-bold">Urlop wypoczynkowy</span>
          <div class="row justify-between text-size-4">
            <span>Wyk. dni: <span class="text-bold">0</span></span>
            <span>Poz. dni: <span class="text-bold">20</span></span>
          </div>
        </div>

        <div
          class="column q-px-md q-py-sm bg-surface-gradient rounded-borders shadow gap-10"
        >
          <span class="text-bold">Na żądanie</span>
          <div class="row justify-between text-size-4">
            <span>Wyk. dni: <span class="text-bold">0</span></span>
            <span>Poz. dni: <span class="text-bold">4</span></span>
          </div>
        </div>

        <div
          class="column q-px-md q-py-sm bg-surface-gradient rounded-borders shadow gap-10"
        >
          <span class="text-bold">Siła wyższa</span>
          <div class="row justify-between text-size-4">
            <span>Wyk. godziny: <span class="text-bold">0</span></span>
            <span>Poz. godziny: <span class="text-bold">16</span></span>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { Days, Months } from 'components/utils/index';
import { Dates, Month } from 'components/models/index';

import { useIconsStore } from 'src/stores/iconsStore';
import { useVacationStore } from 'stores/vacationStore';

import { onMounted, ref } from 'vue';

const iconsStore = useIconsStore();
const vacationStore = useVacationStore();
const activeTab = ref<string>('calendar');

const selectedDate = ref(new Date());
const transition = ref<'left' | 'fade' | 'right'>('fade');

const renderedMonth = ref<Month[]>([]);

function selectDay(day: number, month: number, year: number) {
  vacationStore.selectVacationDay({ day, month, year });
}

function changeMonth(value: number) {
  selectedDate.value.setMonth(selectedDate.value.getMonth() + value);

  value > 0 ? (transition.value = 'left') : (transition.value = 'right');

  renderCalendar();
}

function renderCalendar() {
  renderedMonth.value.shift();
  let currMonth: number = selectedDate.value.getMonth();
  let currYear: number = selectedDate.value.getFullYear();

  let dates: Dates[] = [];

  const lastDayOfPrevMonth = new Date(currYear, currMonth, 0).getDay();
  const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
  const lastDateOfCurrMonth = new Date(currYear, currMonth + 1, 0).getDate();

  for (let day = lastDayOfPrevMonth; day > 0; day--) {
    dates.push({
      day: lastDateOfPrevMonth - day + 1,
      month: currMonth,
      year: currYear,
      prev: true,
    });
  }

  for (let day = 1; day <= lastDateOfCurrMonth; day++) {
    if (
      day === new Date().getDate() &&
      selectedDate.value.getMonth() === new Date().getMonth() &&
      selectedDate.value.getFullYear() === new Date().getFullYear()
    ) {
      dates.push({
        day,
        month: currMonth + 1,
        year: currYear,
        active: true,
        today: true,
      });
    } else {
      dates.push({
        day,
        month: currMonth + 1,
        year: currYear,
        active: true,
      });
    }
  }

  const allDatesInCalendar = 42;
  const datesOfNextMonth =
    allDatesInCalendar - (lastDayOfPrevMonth + lastDateOfCurrMonth);

  for (let day = 1; day <= datesOfNextMonth; day++) {
    dates.push({
      day,
      month: currMonth + 2,
      year: currYear,
      next: true,
    });
  }

  renderedMonth.value.push({
    index: currMonth,
    name: Months[currMonth],
    year: selectedDate.value.getFullYear(),
    claimedVacationDaysInMonth: 0,
    dates,
  });
}

onMounted(() => {
  transition.value = 'fade';
  renderCalendar();
});
</script>
