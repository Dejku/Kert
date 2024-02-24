<template>
  <div
    class="base__badge flex-center q-py-xs q-px-sm bg-infoContainer text-onInfoContainer border-info rounded-borders gap-xs box-shadow"
  >
    <q-icon :name="icon" class="base__badge__icon text-size-8" />

    <div class="base__badge__content">
      <span class="text-bold"><slot name="bold" /></span>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: undefined,
  },
});
</script>
