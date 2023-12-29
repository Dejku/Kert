<template>
  <div
    ref="modalComponent"
    class="relative-position column gap-10 text-weight-300 text-size-7"
    style="transition: min-height 0.3s ease"
    :style="`min-height: ${modalHeight}px`"
  >
    <div class="row justify-between">
      <div class="row items-center gap-5">
        <q-icon :name="iconsStore.icons.calendar" class="text-size-10" />
        Dzień
      </div>
      <span>{{ vacation.title }}</span>
    </div>

    <div class="row justify-between" style="height: 40px">
      <div class="row items-center gap-5">
        <q-icon :name="iconsStore.icons.text" class="text-size-10" />
        Typ
      </div>
      <q-select
        v-model="vacation.type"
        :options="['Urlop wypoczynkowy', 'Na żądanie', 'Siła wyższa']"
        color="primary"
        bg-color="surfaceVariant"
        dense
        standout
        options-dark
        behavior="menu"
        class="rounded-borders shadow"
        style="width: max(55%, 190px)"
      />
    </div>

    <div class="row justify-between">
      <div class="row items-center gap-5">
        <q-icon :name="iconsStore.icons.clock" class="text-size-10" />
        Czas trwania
      </div>
      <div>
        <q-checkbox
          v-model="vacation.time.type"
          label="Cały dzień?"
          class="shadow-drop"
          color="infoContainer"
          true-value="day"
          false-value="hour"
          @click="resizeModal"
          left-label
        />
      </div>
    </div>

    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        v-if="vacation.time.type == 'hour'"
        class="row justify-between items-center q-pl-md absolute-bottom"
      >
        <div>...w godzinach</div>
        <div class="row gap-5">
          <q-icon
            :name="iconsStore.icons.arrowLeft"
            class="text-size-10"
            v-touch-repeat:0:100.mouse="decrement"
          />
          <span>{{ vacation.time.hours }}</span>
          <q-icon
            :name="iconsStore.icons.arrowRight"
            class="text-size-10"
            v-touch-repeat:0:100.mouse="increment"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore';
import { useModalStore } from 'stores/modalStore';
import { onMounted, ref, watch } from 'vue';
import { Months } from '../utils';
const iconsStore = useIconsStore();
const modalStore = useModalStore();

const modalComponent = ref();
const modalHeight = ref(100);

let title;

if (modalStore.modal.component.options?.date) {
  title = `${modalStore.modal.component.options.date.day} ${
    Months[modalStore.modal.component.options.date.month - 1].formattedName
  } ${modalStore.modal.component.options.date.year}`;
}

const vacation = ref({
  title,
  date: modalStore.modal.component.options?.date,
  type: 'Urlop wypoczynkowy',
  time: {
    type: 'day',
    hours: 1,
  },
});

const decrement = () => (vacation.value.time.hours -= 1);
const increment = () => (vacation.value.time.hours += 1);

watch(
  () => vacation.value.time.hours,
  () => {
    vacation.value.time.hours =
      vacation.value.time.hours < 1 ? 1 : vacation.value.time.hours;
    vacation.value.time.hours =
      vacation.value.time.hours > 7 ? 7 : vacation.value.time.hours;
  }
);

const resizeModal = () =>
  (modalHeight.value =
    vacation.value.time.type == 'hour'
      ? modalComponent.value.offsetHeight + 30
      : modalComponent.value.offsetHeight - 30);

onMounted(() => {
  modalStore.modal.component.details = vacation.value;
});
</script>
