<template>
  <q-page class="justify-around">
    <section class="row justify-between q-px-md">
      <div
        class="column items-center q-px-lg q-py-md bg-surface rounded-borders box-shadow gap-sm"
      >
        <q-avatar size="20vw">
          <base-image :image="accountStore.getAvatar" />
        </q-avatar>

        <base-title :title="accountStore.getDisplayName" size="7" />
      </div>

      <div class="column justify-between q-pt-md">
        <div class="row justify-end gap-xs">
          <router-link to="/news">
            <q-icon class="text-size-10" :name="iconStore.icon.mail" />
          </router-link>

          <router-link to="/settings">
            <q-icon class="text-size-10" :name="iconStore.icon.settings" />
          </router-link>
        </div>

        <div class="column text-right text-bold">
          <span class="first-upper-case text-secondary text-size-4">
            {{
              appStore.todayDate.toLocaleDateString('pl-PL', {
                weekday: 'long',
              })
            }}
          </span>

          <span class="text-size-7">
            {{ appStore.todayDate.toLocaleDateString() }}
          </span>
        </div>
      </div>
    </section>

    <section id="tabs" class="row flex-center justify-evenly text-size-10">
      <router-link
        v-for="link in mainLinks"
        :key="link.id"
        :to="link.to"
        class="tabs__element flex flex-center q-pa-md bg-surface rounded-borders box-shadow"
        :class="{ 'no-pointer-events': link.disabled }"
      >
        <q-icon :name="link.icon" />
      </router-link>
    </section>

    <section
      class="reminder column flex relative-position z-zero overflow-hidden q-py-xs q-px-sm bg-surface-gradient rounded-borders box-shadow"
    >
      <base-title :title="reminder.title" size="7" />

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
import { useIconStore } from 'stores/iconStore';
import { useAccountStore } from 'stores/accountStore';
import { useAppStore } from 'stores/appStore';

const iconStore = useIconStore();
const accountStore = useAccountStore();
const appStore = useAppStore();

const mainLinks = [
  {
    id: 0,
    icon: iconStore.icon.calendar,
    to: '/calendar',
  },
  {
    id: 1,
    icon: iconStore.icon.people,
    to: '/groups',
  },
  {
    id: 2,
    icon: iconStore.icon.list,
    to: '/tasks',
  },
  {
    id: 3,
    icon: iconStore.icon.plusCircle,
    to: '/',
    disabled: true,
  },
  {
    id: 4,
    icon: iconStore.icon.plusCircle,
    to: '/',
    disabled: true,
  },
  {
    id: 5,
    icon: iconStore.icon.plusCircle,
    to: '/',
    disabled: true,
  },
  {
    id: 6,
    icon: iconStore.icon.plusCircle,
    to: '/',
    disabled: true,
  },
  {
    id: 7,
    icon: iconStore.icon.plusCircle,
    to: '/',
    disabled: true,
  },
];

const reminder = {
  title: 'Do zrobienia',
  desc: 'Przykładowe zadanie do zrobienia',
  taskSetName: 'Przykładowa nazwa zadań',
  taskSetLink: '/home',
  icon: iconStore.icon.successCircle,
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
