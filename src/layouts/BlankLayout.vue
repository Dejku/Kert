<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view v-slot="{ Component }" class="column q-pa-lg full-width">
        <transition :name="transition">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const transition = computed(() => {
  return (route.meta.transition as string) || 'fade';
});
</script>

<style lang="scss" scoped>
header,
footer {
  height: 20px;
  background-color: transparent !important;
}
</style>
