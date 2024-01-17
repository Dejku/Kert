<template>
  <div
    class="base__button row flex-center hug text-bold gap-xs"
    :class="{
      'box-shadow': shadow,
      'no-pointer-events': disabled || loading,
      'base__button--disabled': disabled || loading,
      'base__button--small': small,
      'base__button--transparent': transparent,
      'base__button--no-border': noBorder,
      'base__button--corner-small': cornerSmall,
      'base__button--circle': circle,
      'base__button--color-background': color === 'background',
      'base__button--color-primary': color === 'primary',
      'base__button--color-secondary': color === 'secondary',
      'base__button--color-tertiary': color === 'tertiary',
      'base__button--color-success': color === 'success',
      'base__button--color-info': color === 'info',
      'base__button--color-warning': color === 'warning',
      'base__button--color-error': color === 'error',
    }"
    @click="loadingState ? (loading = true) : null"
  >
    <TransitionGroup name="fade">
      <q-spinner
        v-if="loading"
        key="spinner"
        class="absolute"
        color="onPrimary"
        size="2em"
        :thickness="3"
      />

      <div key="content" :style="{ opacity: loading ? 0 : 1 }">
        <q-icon v-if="iconLeft" :name="iconLeft" />
        <slot>{{ label }}</slot>
        <q-icon v-if="iconRight" :name="iconRight" />
      </div>
    </TransitionGroup>
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
  small: {
    type: Boolean,
    default: false,
  },
  loadingState: {
    type: Boolean,
    default: false,
  },
});

const loading = ref<boolean>(false);

watch(
  () => props.loadingState,
  () =>
    window.addEventListener(
      'base__button--loadingComplete',
      () => (loading.value = false)
    )
);

onMounted(() => {
  if (props.loadingState) {
    window.addEventListener(
      'base__button--loadingComplete',
      () => (loading.value = false)
    );
  }
});

onUnmounted(() => {
  window.removeEventListener(
    'base__button--loadingComplete',
    () => (loading.value = false)
  );
});
</script>
