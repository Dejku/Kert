<template>
  <div
    id="base__input"
    class="text-weight-600 text-center rounded-borders--small q-py-xs q-px-sm bg-surface overflow-hidden shadow text-error"
    :class="{
      error: error || customError,
      altColor,
      'base__input--transparent': isTransparent,
    }"
  >
    <div>
      <div class="row no-wrap gap-5">
        <Transition
          v-if="icon"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          mode="out-in"
          class="text-size-9"
        >
          <q-icon
            v-if="error || customError"
            :name="iconsStore.icons.alertCircle"
          />

          <q-icon
            v-else
            class="text-onSurface"
            :class="{ hidden: icon == undefined }"
            :name="icon"
          />
        </Transition>

        <input
          ref="test"
          class="full-width"
          :class="{ 'text-center': textCenter }"
          v-model="input"
          :type="type"
          :placeholder="placeholder"
          :required="isRequired"
          :maxlength="maxlength"
          :pattern="(pattern as string)"
          autocomplete="off"
          @input="
            $emit(
              'update:modelValue',
              ($event.target as HTMLInputElement).value
            )
          "
        />
      </div>

      <Transition
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutUp"
      >
        <div v-if="error || customError">
          {{ error || customError }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore';

import { ref, watch } from 'vue';

const emit = defineEmits<{
  hasError: [value: boolean];
  'update:modelValue': [value: string];
}>();

const props = defineProps({
  icon: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: 'text',
    validator(value: string) {
      return ['text', 'password', 'number', 'email'].includes(value);
    },
  },
  value: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: 'Wypełnij pole',
    validator(value: string) {
      return value.length > 0;
    },
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  isTransparent: {
    type: Boolean,
    default: false,
  },
  altColor: {
    type: Boolean,
    default: false,
  },
  customError: {
    type: String,
  },
  textCenter: {
    type: Boolean,
    default: false,
  },
  minlength: {
    type: Number,
    default: 0,
  },
  maxlength: {
    type: Number,
    default: 9999,
  },
});

const iconsStore = useIconsStore();
const test = ref<string>('');
const input = ref<string>('');
const error = ref<string>('');
const pattern = ref<string | RegExp>('');

if (props.value) input.value = props.value;

if (props.type == 'email') {
  pattern.value =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
}

watch(
  () => input.value,
  () => {
    if (props.minlength > props.maxlength)
      throw new Error('Minimalna wartość jest większa niż maksymalna!');
    error.value = '';

    if (
      props.type == 'email' &&
      !(test.value as unknown as HTMLInputElement).validity.valid
    )
      error.value = 'Wpisz poprawny e-mail';

    if (props.isRequired && !input.value) {
      emit('hasError', true);
      return (error.value = 'To pole jest wymagane');
    }

    if (input.value.length < props.minlength) {
      emit('hasError', true);
      return (error.value = `Minimalna ilość znaków to ${props.minlength}`);
    }

    if (input.value.length > props.maxlength) {
      emit('hasError', true);
      return (error.value = `Maksymalna ilość znaków to ${props.maxlength}`);
    }

    emit('hasError', false);
  }
);
</script>

<style lang="scss" scoped>
#base__input {
  max-height: 36px;
  border: 1px solid transparent;
  transition: all 0.2s ease-in-out;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
  }

  &.base__input--transparent {
    background-color: transparent !important;
    box-shadow: none !important;
  }

  &.altColor {
    background-color: var(--surfaceVariant) !important;

    input::placeholder {
      color: var(--onSurfaceVariant);
      opacity: 0.75;
    }
  }

  &.error {
    max-height: 60px;
    border: 1px solid var(--error);
  }
}
</style>
