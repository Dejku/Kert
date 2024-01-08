<template>
  <q-page class="justify-around">
    <section class="row justify-between q-pa-md">
      <div class="column" style="gap: 1.5vh">
        <q-avatar size="20vw">
          <img :src="accountStore.getAvatar" />
        </q-avatar>
        <h6 class="text-size-7 text-bold text-center no-margin">
          {{ accountStore.nickName }}
        </h6>
      </div>
      <div class="column justify-between">
        <div class="row justify-end q-gutter-x-xs">
          <q-icon class="text-size-10" :name="iconsStore.icons.mail" />
          <q-icon class="text-size-10" :name="iconsStore.icons.settings" />
        </div>
        <div class="column text-right text-bold">
          <span class="text-secondary text-size-4">
            {{ slider.top }}
          </span>
          <span class="text-size-7">
            {{ slider.bottom }}
          </span>
        </div>
      </div>
    </section>

    <section id="tabs" class="row flex-center justify-evenly text-size-10">
      <router-link
        v-for="link in mainLinks"
        :key="link.id"
        :to="link.to"
        class="tabs__element flex flex-center q-pa-md bg-surface rounded-borders shadow"
      >
        <q-icon :name="link.icon" />
      </router-link>
    </section>

    <section
      class="reminder column flex relative-position z-zero overflow-hidden q-py-xs q-px-sm bg-surface-gradient rounded-borders shadow"
    >
      <h6 class="text-bold text-size-7 no-margin">
        {{ reminder.title }}
      </h6>
      <span>{{ reminder.desc }}</span>
      <q-space />
      <span class="text-right text-size-3">
        Z listy
        <router-link
          :to="reminder.taskSetLink"
          class="text-tertiary text-italic"
        >
          {{ reminder.taskSetName }}
        </router-link>
      </span>
      <q-icon :name="reminder.icon" class="reminder__icon absolute z-minus" />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore';
import { useAccountStore } from 'stores/accountStore';

const iconsStore = useIconsStore();
const accountStore = useAccountStore();

const slider = {
  top: 'Środa',
  bottom: '01.11.2023',
};

const mainLinks = [
  {
    id: 0,
    icon: iconsStore.icons.calendar,
    to: '/calendar',
  },
  {
    id: 1,
    icon: iconsStore.icons.people,
    to: '/groups',
  },
  {
    id: 2,
    icon: iconsStore.icons.list,
    to: '/tasks',
  },
  {
    id: 3,
    icon: iconsStore.icons.questionMarkCircle,
    to: '/help',
  },
  {
    id: 4,
    icon: iconsStore.icons.questionMarkCircle,
    to: '/help',
  },
  {
    id: 5,
    icon: iconsStore.icons.questionMarkCircle,
    to: '/help',
  },
  {
    id: 6,
    icon: iconsStore.icons.questionMarkCircle,
    to: '/help',
  },
  {
    id: 7,
    icon: iconsStore.icons.questionMark,
    to: '/login',
  },
];

const reminder = {
  title: 'Do zrobienia',
  desc: 'Przykładowe zadanie do zrobienia',
  taskSetName: 'Przykładowa nazwa zadań',
  taskSetLink: '/tasks/set/task',
  icon: iconsStore.icons.successCircle,
};
</script>

<style lang="scss" scoped>
#tabs {
  width: calc(min(max(58px, 16vw), 150px) * 4 + (1.5vw * 8));
  margin-inline: auto;

  .tabs__element {
    width: min(max(58px, 16vw), 150px);
    margin: 1.5vw;
    aspect-ratio: 1/1;
  }
}

.reminder {
  .reminder__icon {
    inset: calc($body-font-size-5 * -1) 0px 0px 0px;
    rotate: Z 30deg;
    font-size: calc($body-font-size * 10);
    color: var(--surfaceVariant);
    filter: blur(2px) opacity(0.4);
  }
}
</style>
