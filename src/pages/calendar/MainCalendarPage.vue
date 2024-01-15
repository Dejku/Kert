<template>
  <q-page style="gap: 2vh; padding-left: 0; padding-right: 0">
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
      <q-tab-panel name="calendar" class="column" style="gap: 3.5vh">
        <div
          class="row flex-center q-py-xs q-px-sm q-mx-lg bg-surface rounded-borders--big box-shadow"
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
                    'date--state-claimed-normal':
                      day.active &&
                      vacationStore.checkType(
                        { day: day.day, month: day.month, year: day.year },
                        false
                      ),
                    'date--state-claimed-special':
                      day.active &&
                      vacationStore.checkType(
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
            </TransitionGroup>
          </div>
        </div>

        <q-separator color="surface" />

        <div
          class="column flex items-center text-size-4 gap-sm"
          @click="$q.screen.height < 700 ? showSummaryModal() : null"
        >
          <div class="flex row no-wrap gap-xs">
            <q-icon :name="iconsStore.icons.info" class="text-size-7" />
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
            <q-icon :name="iconsStore.icons.info" class="text-size-7" />
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
        </div>

        <BaseButton
          v-if="$q.screen.height > 700"
          class="q-mx-auto"
          label="Podsumowanie"
          transparent
          @click="showSummaryModal"
        />
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
import { Days, Months, formatString } from 'utils';

import { useIconsStore } from 'stores/iconsStore';
import { useVacationStore } from 'stores/vacationStore';
import { useAccountStore } from 'stores/accountStore';
import { useModalStore } from 'stores/modalStore';
import { useAppStore } from 'stores/appStore';

import { onSnapshot, doc, getFirestore } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

const iconsStore = useIconsStore();
const vacationStore = useVacationStore();
const accountStore = useAccountStore();
const { showModal } = useModalStore();
const appStore = useAppStore();

const activeTab = ref<string>('calendar');
const transition = ref<'left' | 'fade' | 'right'>('fade');
const selectedDate = ref<Date>(new Date());
const renderedMonth = ref<CalendarMonth[]>([]);

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
function holdSelectDay(details: any) {
  const data = details.evt.target.getAttribute('data-date').split('/');

  vacationStore.holdSelectVacationDay({
    day: Number(data[0]),
    month: Number(data[1]),
    year: Number(data[2]),
  });
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

  let dates: CalendarDates[] = [];

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
    name: Months[currMonth].name,
    year: selectedDate.value.getFullYear(),
    claimedVacationDaysInMonth: 0,
    dates,
  });
}

onMounted(() => {
  transition.value = 'fade';
  renderCalendar();
});

const db = getFirestore();
onSnapshot(doc(db, 'vacationStore', accountStore.user.id), (doc) => {
  const vacationStore = useVacationStore();

  vacationStore.claimedVacationDays = doc.data()?.claimedVacationDays;
});
</script>
