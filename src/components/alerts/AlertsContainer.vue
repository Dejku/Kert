<template>
  <transition-group
    tag="div"
    id="alerts"
    name="list-transition"
    class="column z-max relative-position gap-sm"
  >
    <base-alert
      v-for="alert in alertStore.alerts"
      :key="alert.id"
      :id="alert.id"
      :status="alert.status"
      :message="alert.message"
      :duration="alert.duration"
      :user-can-hide="alert.userCanHide"
      @remove="alertStore.deleteAlert(alert)"
    />
  </transition-group>
</template>

<script setup lang="ts">
import BaseAlert from 'components/Shared/BaseAlert.vue';

import { useAlertStore } from 'stores/alertStore';
const alertStore = useAlertStore();
</script>
