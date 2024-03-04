<template>
  <div
    v-ripple="ripple"
    class="base__button relative-position row flex-center hug"
    :class="{
      'box-shadow': shadow,
      'text-bold': textBold,
      'no-pointer-events': disabled || isLoading,
      'base__button--disabled': disabled || isLoading,
      'base__button--small': size === 'small' || size == 0,
      'base__button--medium': size === 'medium' || size == 1,
      'base__button--transparent': transparent,
      'base__button--no-border': noBorder,
      'base__button--corner-small': cornerSmall,
      'base__button--circle': circle,
      'base__button--color-background': color === 'background',
      'base__button--color-primary': color === 'primary',
      'base__button--color-secondary': color === 'secondary',
      'base__button--color-tertiary': color === 'tertiary',
      'base__button--color-success': color === 'success' || color === 'green',
      'base__button--color-info': color === 'info' || color === 'blue',
      'base__button--color-warning': color === 'warning' || color === 'yellow',
      'base__button--color-error': color === 'error' || color === 'red',
    }"
    @click="loading ? (isLoading = true) : null"
  >
    <transition-group name="fade">
      <q-spinner
        v-if="isLoading"
        key="spinner"
        class="absolute"
        color="onPrimary"
        size="2em"
        :thickness="3"
      />

      <div
        key="content"
        class="row flex-center gap-xs"
        :style="{ opacity: isLoading ? 0 : 1 }"
      >
        <q-icon v-if="iconLeft" :name="iconLeft" />
        <slot>{{ label }}</slot>
        <q-icon v-if="iconRight" :name="iconRight" />
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  iconLeft: {
    type: String,
    default: undefined,
  },
  label: {
    type: [String, Number],
    default: 'Kliknij',
  },
  iconRight: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    validator: (value: AppColors) => {
      return [
        'background',
        'primary',
        'secondary',
        'tertiary',
        'success',
        'info',
        'warning',
        'error',
        'green',
        'blue',
        'yellow',
        'red',
      ].includes(value);
    },
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  noBorder: {
    type: Boolean,
    default: false,
  },
  cornerSmall: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  size: {
    type: [String, Number],
    default: 'big',
    validator: (value: string) => {
      return ['big', '2', 2, 'medium', '1', 1, 'small', '0', 0].includes(value);
    },
  },
  textBold: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  ripple: {
    type: Boolean,
    default: true,
  },
});

const isLoading = ref<boolean>(false);

watch(
  () => props.loading,
  () =>
    window.addEventListener(
      'base__button--loadingComplete',
      () => (isLoading.value = false)
    )
);

onMounted(() => {
  if (props.loading)
    window.addEventListener(
      'base__button--loadingComplete',
      () => (isLoading.value = false)
    );
});

onUnmounted(() => {
  if (props.loading)
    window.removeEventListener(
      'base__button--loadingComplete',
      () => (isLoading.value = false)
    );
});
</script>
