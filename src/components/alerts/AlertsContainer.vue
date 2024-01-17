<template>
  <TransitionGroup
    tag="div"
    id="alerts"
    name="alerts__element"
    class="column z-max relative-position gap-sm"
  >
    <BaseAlert
      v-for="alert in alertsStore.alerts"
      :key="alert.id"
      :id="alert.id"
      :status="alert.status"
      :message="alert.message"
      :duration="alert.duration"
      @remove="alertsStore.deleteAlert(alert)"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import BaseAlert from 'components/Shared/BaseAlert.vue';

import { useAlertsStore } from 'stores/alertsStore';
const alertsStore = useAlertsStore();
</script>

<style lang="scss" scoped>
#alerts {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 300px;
}

.alerts__element-move,
.alerts__element-enter-active,
.alerts__element-leave-active {
  transition: all 0.5s ease;
}

.alerts__element-enter-from,
.alerts__element-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.alerts__element-leave-active {
  position: absolute;
}
</style>
