<template>
  <div
    :class="{ 'full-width': !width }"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <label
      v-if="label"
      :for="`base__input-${label.toLowerCase()}`"
      class="q-ml-xs text-size-6"
    >
      {{ label }}
    </label>

    <div
      class="base__input text-weight-600 text-center rounded-borders--small q-py-xs q-px-sm overflow-hidden text-error"
      :class="`base__input--color-${bgColor} ${
        transparent ? 'base__input--transparent' : ''
      } ${shadow ? 'box-shadow' : ''} ${
        error || customError ? 'base__input--error' : ''
      }`"
    >
      <div>
        <div class="row no-wrap items-center gap-xs">
          <transition
            v-if="icon"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
            class="text-size-9"
          >
            <q-icon
              v-if="error || customError"
              :name="iconStore.icon.alertCircle"
            />

            <q-icon
              v-else
              class="text-onSurfaceVariant"
              :class="{ hidden: icon == undefined }"
              :name="icon"
            />
          </transition>

          <input
            :id="label ? `base__input-${label?.toLowerCase()}` : 'base__input'"
            ref="input"
            class="full-width"
            :class="`text-size-${textSize} ${textCenter ? 'text-center' : ''}`"
            v-model="inputValue"
            :type="inputType"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :maxlength="maxlength"
            :min="type == 'number' ? minlength : undefined"
            :max="type == 'number' ? maxlength : undefined"
            :autocomplete="autocomplete"
            @input="
              $emit(
                'update:modelValue',
                ($event.target as HTMLInputElement).value
              )
            "
          />

          <q-icon
            v-if="type === 'password'"
            class="text-onSurfaceVariant"
            :name="eyeIcon"
            @click="
              inputType === 'password'
                ? ((eyeIcon = iconStore.icon.eyeOff), (inputType = 'text'))
                : ((eyeIcon = iconStore.icon.eye), (inputType = 'password'))
            "
          />
        </div>

        <transition
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutUp"
        >
          <div v-if="error || customError">
            {{ error || customError }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { ref, watch } from 'vue';

const iconStore = useIconStore();

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
  value: [String, Number],
  label: {
    type: String || undefined,
    validator(value: string) {
      return value.length > 3;
    },
  },
  placeholder: {
    type: String,
    default: 'Wypełnij pole',
    validator(value: string) {
      return value.length > 0;
    },
  },
  required: {
    type: Boolean,
    default: false,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: 'surface',
    validator: (value: string) => {
      return ['surface', 'surfaceVariant', 'background'].includes(value);
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  customError: {
    type: String,
  },
  textSize: {
    type: String,
    default: '5',
  },
  textCenter: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  shadow: {
    type: Boolean,
    default: true,
  },
  minlength: {
    type: [String, Number],
    default: 0,
  },
  maxlength: {
    type: [String, Number],
  },
  width: [String, Number],
  height: [String, Number],
});

const input = ref();
const inputType = ref<string>(props.type);
const inputValue = ref<string>('');
const eyeIcon = ref(iconStore.icon.eye);
const error = ref<string>('');

if (props.value) inputValue.value = props.value as string;

watch(
  () => inputValue.value,
  () => {
    if (props.maxlength && props.minlength > props.maxlength)
      throw new Error('Minimalna wartość jest większa niż maksymalna!');
    error.value = '';

    if (props.type == 'email' && !input.value.validity.valid)
      error.value = 'Wpisz poprawny e-mail';

    if (props.required && !inputValue.value) {
      emit('hasError', true);
      return (error.value = 'To pole jest wymagane');
    }

    if (inputValue.value.length < (props.minlength as number)) {
      emit('hasError', true);
      return (error.value = `Minimalna ilość znaków to ${props.minlength}`);
    }

    if (
      props.maxlength &&
      inputValue.value.length > (props.maxlength as number)
    ) {
      emit('hasError', true);
      return (error.value = `Maksymalna ilość znaków to ${props.maxlength}`);
    }

    emit('hasError', false);
  }
);
</script>
