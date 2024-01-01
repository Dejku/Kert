<template>
  <q-page>
    Groups

    <BaseButton @click="click" />
  </q-page>
</template>

<script setup lang="ts">
import { useAlertsStore } from 'stores/alertsStore';
const alertsStore = useAlertsStore();

const click = async () => alertsStore.createAlert('test', 'warning', 5);
</script>

<style lang="scss"></style>
