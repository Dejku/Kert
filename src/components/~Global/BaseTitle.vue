<template>
  <div
    class="row items-center gap-sm text-size-10"
    @click="go ? $router.go(go as number) : null"
  >
    <q-icon v-if="iconLeft" :name="iconLeft" />
    <h6
      class="text-bold"
      :class="`text-size-${size}`"
      style="letter-spacing: 1px"
    >
      {{ title }}
    </h6>
  </div>
</template>

<script setup lang="ts">
defineProps({
  iconLeft: {
    type: String,
    default: undefined,
  },
  title: {
    type: String,
    default: 'Tytuł',
    validator: (value: string) => {
      return value.length > 0;
    },
  },
  size: {
    type: String,
    default: '8',
  },
  go: {
    type: [String, Number],
  },
});
</script>
