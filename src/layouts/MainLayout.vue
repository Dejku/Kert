<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="q-px-sm bg-surface">
      <q-toolbar>
        <q-toolbar-title class="text-tertiary text-size-9" shrink>
          Kert
        </q-toolbar-title>

        <q-space />

        <div class="row items-center q-px-md text-size-6 text-onSurface gap-sm">
          <q-icon
            v-for="alert in alertsStore.headerAlerts.slice(0, 5)"
            :key="alert.id"
            :name="alert.icon"
          />

          <div v-if="alertsStore.headerAlerts.length > 5">
            +{{ alertsStore.headerAlerts.length - 5 }}
          </div>
        </div>

        <router-link to="/settings/account">
          <q-avatar class="text-size-12">
            <img :src="accountStore.getAvatar" />
          </q-avatar>
        </router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view
        v-slot="{ Component, route }"
        class="column q-pa-lg full-width"
      >
        <transition :name="(route.meta.transition as string) || 'fade'">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <q-footer
      class="row justify-around items-center no-wrap q-pa-sm bg-surface text-size-9"
    >
      <router-link
        v-for="nav in navigation.slice(0, 2)"
        :key="nav.name"
        :to="nav.to"
        exact
      >
        <q-icon :name="nav.icon" />
      </router-link>
      <div>
        <router-link
          id="home"
          class="absolute-center flex flex-center bg-background rounded-borders--circle"
          to="/home"
          exact
        >
          <q-icon :name="iconsStore.icons.home" />
        </router-link>
      </div>
      <router-link
        v-for="nav in navigation.slice(2, 4)"
        :key="nav.name"
        :to="nav.to"
        exact
      >
        <q-icon :name="nav.icon" />
      </router-link>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore';
import { useAccountStore } from 'stores/accountStore';
import { useAlertsStore } from 'stores/alertsStore';

const iconsStore = useIconsStore();
const accountStore = useAccountStore();
const alertsStore = useAlertsStore();

const navigation = [
  {
    name: 'calendar',
    icon: iconsStore.icons.calendar,
    to: '/calendar',
  },
  {
    name: 'groups',
    icon: iconsStore.icons.people,
    to: '/groups',
  },
  {
    name: 'tasks',
    icon: iconsStore.icons.list,
    to: '/tasks',
  },
  {
    name: 'settings',
    icon: iconsStore.icons.settings,
    to: '/settings',
  },
];
</script>

<style lang="scss" scoped>
$box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);

.q-toolbar__title {
  letter-spacing: 3px;
  font-weight: 700;
}

.q-footer {
  box-shadow: $box-shadow;

  #home {
    translate: 0 calc(-1.25 * $body-font-size);
    padding: min($body-font-size, 32px);
    box-shadow: $box-shadow;

    &::before {
      content: '';
      position: absolute;
      width: calc(100% - $body-font-size-2);
      height: calc(100% - $body-font-size-2);
      border-radius: inherit;
      background-color: var(--surface);
    }
  }
}
</style>
