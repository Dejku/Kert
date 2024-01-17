<template>
  <div
    class="row items-center gap-sm"
    @click="go ? $router.go(go as number) : null"
  >
    <q-icon v-if="iconLeft" :name="iconLeft" class="text-size-10" />
    <h6
      :class="`text-size-${size} text-weight-${weight}`"
      :style="{ 'letter-spacing': letterSpacing ? '1px' : '0px' }"
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
  weight: {
    type: [String, Number],
    default: 700,
    validator: (value: string | number) => {
      return typeof value === 'number'
        ? value / 100 >= 1 && value / 100 <= 9
        : new RegExp('[1-9]00').test(value);
    },
  },
  letterSpacing: {
    type: Boolean,
    default: true,
  },
  go: {
    type: [String, Number],
  },
});
</script>
