<template>
  <div class="row items-center gap-sm" @click="changePage">
    <q-icon v-if="iconLeft" :name="iconLeft" class="text-size-10" />
    <h6
      class="first-upper-case"
      :class="`text-size-${size} text-weight-${weight}`"
      :style="{ 'letter-spacing': letterSpacing ? '1px' : '0px' }"
    >
      {{ title }}
    </h6>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
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
