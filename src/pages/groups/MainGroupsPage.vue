<template>
  <q-page>
    Groups

    <BaseButton @click="modalStore.showModal({ type: 'monthSummary' })" />
  </q-page>
</template>

<script setup lang="ts">
import { useModalStore } from 'stores/modalStore';
const modalStore = useModalStore();
</script>

<style lang="scss"></style>
