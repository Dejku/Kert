<template>
  <q-page style="gap: 2vh; padding-left: 0; padding-right: 0">
    <transition name="scale">
      <div
        v-if="activeTab == 'calendar' && vacationStore.hasUnsavedChanges"
        class="row justify-between q-px-lg text-size-8 absolute-top q-py-lg"
      >
        <div class="column flex-center text-success">
          <q-icon
            :name="iconStore.icon.success"
            class="q-pa-sm border-success rounded-borders--circle"
            style="border-width: 2px !important"
            v-touch-hold:2000.mouse="vacationStore.saveChanges"
          />
          <span v-if="$q.screen.height > 700" class="text-size-5">Zapisz</span>
        </div>

        <div class="column flex-center text-error">
          <q-icon
            :name="iconStore.icon.trash"
            class="q-pa-sm border-error rounded-borders--circle"
            style="border-width: 2px !important"
            v-touch-hold:2000.mouse="vacationStore.discardChanges"
          />
          <span v-if="$q.screen.height > 700" class="text-size-5">Anuluj</span>
        </div>
      </div>
    </transition>

    <q-tabs
      v-model="activeTab"
      indicator-color="primary"
      no-caps
      class="q-mx-auto"
    >
      <q-tab name="calendar" label="Kalendarz" :ripple="false" />
      <q-tab name="summary" label="Urlopy" :ripple="false" />
    </q-tabs>

    <q-tab-panels
      v-model="activeTab"
      animated
      class="bg-background"
      style="flex: 1 0 auto !important"
    >
      <q-tab-panel name="calendar" class="column" style="gap: 3.5vh">
        <div
          class="row flex-center q-py-xs q-px-sm q-mx-lg bg-surface rounded-borders--big box-shadow"
        >
          <q-icon
            :name="iconStore.icon.arrowLeft"
            class="text-size-10"
            @click="changeMonth(-1)"
          />
          <q-space />
          <div class="first-upper-case" @click="jumpToToday">
            {{ renderedMonth[0]?.name }}
            {{ renderedMonth[0]?.year }}
          </div>
          <q-space />
          <q-icon
            :name="iconStore.icon.arrowRight"
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
            <transition-group :name="`calendar__transition--${transition}`">
              <div
                v-for="month in renderedMonth"
                class="calendar__container__dates"
                :key="`${month.name}/${month.year}`"
                v-touch-swipe.mouse.left="swipeLeft"
                v-touch-swipe.mouse.right="swipeRight"
              >
                <div
                  v-for="day in month.dates"
                  :key="`${day.day}/${day.month}/${day.year}`"
                  :id="`${day.day}/${day.month}/${day.year}`"
                  class="date flex flex-center rounded-borders--circle box-shadow"
                  :data-date="`${day.day}/${day.month}/${day.year}`"
                  v-touch-hold.mouse="holdSelectDay"
                  :class="{
                    'date--state-active': day.active,
                    'date--state-today': day.today,
                    'date--state-claimed-normal': vacationStore.checkType(
                      { day: day.day, month: day.month, year: day.year },
                      false
                    ),
                    'date--state-claimed-special': vacationStore.checkType(
                      { day: day.day, month: day.month, year: day.year },
                      true
                    ),
                  }"
                  @click="
                    !day.active && day.prev
                      ? changeMonth(-1)
                      : !day.active && day.next
                      ? changeMonth(1)
                      : selectDay(day.day, day.month, day.year)
                  "
                >
                  {{ day.day }}
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <q-separator color="surface" />

        <div
          class="column flex items-center text-size-4 gap-sm"
          @click="$q.screen.height < 700 ? showSummaryModal() : null"
        >
          <div class="flex row no-wrap gap-xs">
            <q-icon :name="iconStore.icon.info" class="text-size-7" />
            <p class="no-margin">
              Wykorzystany urlop w tym miesiącu:
              <span class="text-bold">
                {{
                  formatString(
                    'dni',
                    vacationStore.countClaimedNormalVacationDaysInMonth(
                      selectedDate.getMonth() + 1,
                      selectedDate.getFullYear()
                    )
                  )
                }}
              </span>
            </p>
          </div>

          <div class="flex row no-wrap gap-xs">
            <q-icon :name="iconStore.icon.info" class="text-size-7" />
            <p class="no-margin">
              Pozostały urlop do wykorzystania:
              <span class="text-bold">
                {{
                  formatString(
                    'dni',
                    vacationStore.countAvailableNormalVacationDaysInYear(
                      selectedDate.getFullYear()
                    )
                  )
                }}
              </span>
            </p>
          </div>

          <div class="column items-center">
            <transition-group name="details">
              <div
                key="additionalInfo"
                v-if="
                  vacationStore.overdueVacationDays &&
                  selectedDate.getFullYear() == appStore.todayDate.getFullYear()
                "
                class="flex row no-wrap gap-xs"
              >
                <q-icon :name="iconStore.icon.info" class="text-size-7" />
                <p class="no-margin">
                  W tym zeszłoroczny urlop:
                  <span class="text-bold">
                    {{ formatString('dni', vacationStore.overdueVacationDays) }}
                  </span>
                </p>
              </div>

              <base-button
                key="button"
                v-if="$q.screen.height > 700"
                class="q-mt-lg z-fab"
                label="Podsumowanie"
                transparent
                @click="showSummaryModal"
              />
            </transition-group>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="summary" class="column q-pa-md gap-lg">
        <div
          class="column q-px-md q-py-sm bg-surface-gradient rounded-borders box-shadow gap-sm"
        >
          <span class="text-bold">Urlop wypoczynkowy</span>
          <div class="row justify-between text-size-4">
            <span>
              Wyk. dni:
              <span class="text-bold">
                {{
                  vacationStore.countClaimedVacationByType(
                    'Urlop wypoczynkowy',
                    appStore.todayDate.getFullYear()
                  )
                }}
              </span>
            </span>
            <span>
              Poz. dni:
              <span class="text-bold">
                {{
                  vacationStore.countAvailableVacationByType(
                    'Urlop wypoczynkowy',
                    appStore.todayDate.getFullYear()
                  )
                }}
              </span>
            </span>
          </div>
        </div>

        <div
          class="column q-px-md q-py-sm bg-surface-gradient rounded-borders box-shadow gap-sm"
        >
          <span class="text-bold">Na żądanie</span>
          <div class="row justify-between text-size-4">
            <span>
              Wyk. dni:
              <span class="text-bold">
                {{
                  vacationStore.countClaimedVacationByType(
                    'Na żądanie',
                    appStore.todayDate.getFullYear()
                  )
                }}
              </span>
            </span>
            <span>
              Poz. dni:
              <span class="text-bold">
                {{
                  vacationStore.countAvailableVacationByType(
                    'Na żądanie',
                    appStore.todayDate.getFullYear()
                  )
                }}
              </span>
            </span>
          </div>
        </div>

        <div
          class="column q-px-md q-py-sm bg-surface-gradient rounded-borders box-shadow gap-sm"
        >
          <span class="text-bold">Siła wyższa</span>
          <div class="row justify-between text-size-4">
            <span>
              Wyk. godziny:
              <span class="text-bold">
                {{
                  vacationStore.countClaimedVacationByType(
                    'Siła wyższa',
                    appStore.todayDate.getFullYear()
                  )
                }}
              </span>
            </span>
            <span>
              Poz. godziny:
              <span class="text-bold">
                {{
                  vacationStore.countAvailableVacationByType(
                    'Siła wyższa',
                    appStore.todayDate.getFullYear()
                  )
                }}
              </span>
            </span>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { Days, formatString } from 'utils';

import { useIconStore } from 'stores/iconStore';
import { useVacationStore } from 'stores/vacationStore';
import { useModalStore } from 'stores/modalStore';
import { useAppStore } from 'stores/appStore';
import { useAlertStore } from 'stores/alertStore';

import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

const iconStore = useIconStore();
const vacationStore = useVacationStore();
const { showModal } = useModalStore();
const appStore = useAppStore();
const { scaleAlert } = useAlertStore();

const activeTab = ref<string>('calendar');
const transition = ref<'left' | 'fade' | 'right'>('fade');
const selectedDate = ref<Date>(appStore.todayDate);
const renderedMonth = ref<Omit<CalendarMonth, 'claimedVacationDaysInMonth'>[]>(
  []
);
const blockMonthSwipe = ref<boolean>(false);

const swipeLeft = () => changeMonth(1);
const swipeRight = () => changeMonth(-1);

const showSummaryModal = () => {
  showModal({
    title: `${renderedMonth.value[0]?.name} ${renderedMonth.value[0]?.year}`,
    component: {
      type: 'monthSummary',
      options: {
        date: {
          day: 0,
          month: selectedDate.value.getMonth(),
          year: selectedDate.value.getFullYear(),
        },
      },
    },
  });
};

const selectDay = (day: number, month: number, year: number) =>
  vacationStore.selectVacationDay({ day, month, year });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const holdSelectDay = (details: any) => {
  const data = details.evt.target.getAttribute('data-date').split('/');

  vacationStore.holdSelectVacationDay({
    day: Number(data[0]),
    month: Number(data[1]),
    year: Number(data[2]),
  });
};

const jumpToToday = () => {
  if (blockMonthSwipe.value) return;
  if (
    selectedDate.value.getMonth() == appStore.todayDate.getMonth() &&
    selectedDate.value.getFullYear() == appStore.todayDate.getFullYear()
  )
    return;

  blockMonthSwipe.value = true;
  transition.value = 'fade';
  selectedDate.value = appStore.todayDate;

  renderCalendar();
};

const changeMonth = (value: number) => {
  if (blockMonthSwipe.value) return;

  blockMonthSwipe.value = true;
  selectedDate.value.setMonth(selectedDate.value.getMonth() + value, 1);
  transition.value = value > 0 ? 'left' : 'right';

  renderCalendar();
};

const renderCalendar = () => {
  renderedMonth.value.shift();
  let currMonth: number = selectedDate.value.getMonth();
  let currYear: number = selectedDate.value.getFullYear();

  let dates: CalendarDates[] = [];
  const lastDayOfPrevMonth = new Date(currYear, currMonth, 0).getDay();
  const lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate();
  const lastDateOfCurrMonth = new Date(currYear, currMonth + 1, 0).getDate();

  for (let day = lastDayOfPrevMonth; day > 0; day--) {
    if (
      lastDateOfPrevMonth - day + 1 == appStore.todayDate.getDate() &&
      currMonth - 1 == appStore.todayDate.getMonth() &&
      currYear == appStore.todayDate.getFullYear()
    )
      dates.push({
        day: lastDateOfPrevMonth - day + 1,
        month: currMonth,
        year: currYear,
        prev: true,
        today: true,
      });
    else
      dates.push({
        day: lastDateOfPrevMonth - day + 1,
        month: currMonth,
        year: currYear,
        prev: true,
      });
  }

  for (let day = 1; day <= lastDateOfCurrMonth; day++) {
    if (
      day == appStore.todayDate.getDate() &&
      selectedDate.value.getMonth() == appStore.todayDate.getMonth() &&
      selectedDate.value.getFullYear() == appStore.todayDate.getFullYear()
    )
      dates.push({
        day,
        month: currMonth + 1,
        year: currYear,
        active: true,
        today: true,
      });
    else
      dates.push({
        day,
        month: currMonth + 1,
        year: currYear,
        active: true,
      });
  }

  const allDatesInCalendar = 42;
  const datesOfNextMonth =
    allDatesInCalendar - (lastDayOfPrevMonth + lastDateOfCurrMonth);

  for (let day = 1; day <= datesOfNextMonth; day++) {
    if (
      day == appStore.todayDate.getDate() &&
      currMonth + 1 == appStore.todayDate.getMonth() &&
      currYear == appStore.todayDate.getFullYear()
    )
      dates.push({
        day,
        month: currMonth + 2,
        year: currYear,
        next: true,
        today: true,
      });
    else
      dates.push({
        day,
        month: currMonth + 2,
        year: currYear,
        next: true,
      });
  }

  renderedMonth.value.push({
    index: currMonth,
    name: selectedDate.value.toLocaleDateString('pl-PL', { month: 'long' }),
    year: selectedDate.value.getFullYear(),
    dates,
  });

  setTimeout(() => (blockMonthSwipe.value = false), 500);
};

onMounted(() => {
  blockMonthSwipe.value = true;
  transition.value = 'fade';
  renderCalendar();
});

onBeforeRouteLeave(() => {
  if (vacationStore.hasUnsavedChanges) {
    scaleAlert('alert__unsavedChanges');
    return false;
  } else return true;
});
</script>
