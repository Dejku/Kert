<template>
  <div
    id="base__button"
    class="row flex-center hug text-bold"
    :class="{
      shadow: shadow,
      'no-pointer-events': disabled,
      'base__button--disabled': disabled,
      'base__button--small': small,
      'base__button--transparent': transparent,
      'base__button--no-border': noBorder,
      'base__button--corner-small': cornerSmall,
      'base__button--circle': circle,
    }"
  >
    <q-icon v-if="iconLeft" :name="iconLeft" />
    <slot>{{ label }}</slot>
    <q-icon v-if="iconRight" :name="iconRight" />
  </div>
</template>

<script setup lang="ts">
defineProps({
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
  small: {
    type: Boolean,
    default: false,
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
});
</script>

<style lang="scss" scoped>
#base__button {
  gap: 5px;
  padding: 5px 20px;
  font-size: $body-font-size;
  letter-spacing: 2px;
  border: 1px solid transparent;
  border-radius: $border-radius-big;
  transition: all 0.2s ease-in-out;
  background-color: var(--primary);
  color: var(--onPrimary);

  i {
    font-size: $body-font-size-10;
  }

  &.base__button--circle {
    padding: 5px;
  }

  &.base__button--disabled {
    filter: brightness(0.75);
    cursor: not-allowed;
  }

  &.base__button--no-border {
    border: none !important;
  }

  &.base__button--corner-small {
    border-radius: $border-radius;
  }

  &.base__button--small {
    padding: 2.5px 10px;
    font-size: $body-font-size-3;
    letter-spacing: 1px;

    i {
      font-size: $body-font-size-6;
    }
  }

  &.base__button--transparent {
    background-color: transparent !important;
    border: 1px solid;
    box-shadow: none !important;

    color: var(--onBackground);
    border-color: var(--outline);

    &.base__button--color-primary {
      color: var(--primary);
      border-color: var(--primary);
    }

    &.base__button--color-secondary {
      color: var(--secondary);
      border-color: var(--secondary);
    }

    &.base__button--color-tertiary {
      color: var(--tertiary);
      border-color: var(--tertiary);
    }

    &.base__button--color-success {
      color: var(--success);
      border-color: var(--success);
    }

    &.base__button--color-info {
      color: var(--info);
      border-color: var(--info);
    }

    &.base__button--color-warning {
      color: var(--warning);
      border-color: var(--warning);
    }

    &.base__button--color-error {
      color: var(--error);
      border-color: var(--error);
    }

    &.base__button--color-onBackground {
      color: var(--onBackground);
      border-color: var(--onBackground);
    }
  }

  // ----------------------

  &.base__button--color-primary {
    color: var(--onPrimary);
    background-color: var(--primary);
  }

  &.base__button--color-secondary {
    color: var(--onSecondary);
    background-color: var(--secondary);
  }

  &.base__button--color-tertiary {
    color: var(--onTertiary);
    background-color: var(--tertiary);
  }

  &.base__button--color-success {
    color: var(--onSuccess);
    background-color: var(--success);
  }

  &.base__button--color-info {
    color: var(--onInfo);
    background-color: var(--info);
  }

  &.base__button--color-warning {
    color: var(--onWarning);
    background-color: var(--warning);
  }

  &.base__button--color-error {
    color: var(--onError);
    background-color: var(--error);
  }

  &.base__button--color-onBackground {
    color: var(--onBackground);
    background-color: var(--background);
  }
}
</style>
