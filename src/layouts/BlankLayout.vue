<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view v-slot="{ Component }" class="column q-pa-lg full-width">
        <transition :name="(route.meta.transition as string) || 'page-fade'">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style lang="scss" scoped>
header,
footer {
  height: 20px;
  background-color: transparent !important;
}
</style>
