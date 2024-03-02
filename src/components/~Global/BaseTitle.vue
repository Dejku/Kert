<template>
  <div class="row items-center no-wrap gap-sm" @click="changePage">
    <q-icon v-if="icon" :name="icon" class="text-size-10" />

    <h6
      v-if="title"
      class="first-upper-case"
      :class="`text-size-${size} text-weight-${weight}`"
      :style="{ 'letter-spacing': letterSpacing ? '1px' : '0px' }"
    >
      {{ title }}
    </h6>

    <q-skeleton v-else type="text" class="full-width" width="50px" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
  icon: String,
  title: String,
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
  to: String,
  back: {
    type: Boolean,
    default: false,
  },
});

const changePage = () => {
  if (props.back) return router.back();
  if (props.to) return router.push(props.to);
};
</script>
