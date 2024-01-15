<template>
  <div class="full-width">
    <label
      v-if="label"
      :for="`base__input-${label}`"
      class="q-ml-xs text-size-6"
    >
      {{ label }}
    </label>

    <div
      :id="`base__input-${label}`"
      class="base__input text-weight-600 text-center rounded-borders--small q-py-xs q-px-sm bg-surface overflow-hidden box-shadow text-error"
      :class="{
        error: error || customError,
        'base__input--altColor': altColor,
        'base__input--transparent': isTransparent,
      }"
    >
      <div>
        <div class="row no-wrap items-center gap-xs">
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
              class="text-onSurfaceVariant"
              :class="{ hidden: icon == undefined }"
              :name="icon"
            />
          </Transition>

          <input
            ref="input"
            class="full-width"
            :class="{ 'text-center': textCenter }"
            v-model="inputValue"
            :type="inputType"
            :placeholder="placeholder"
            :required="isRequired"
            :maxlength="maxlength"
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
                ? ((eyeIcon = iconsStore.icons.eyeOff), (inputType = 'text'))
                : ((eyeIcon = iconsStore.icons.eye), (inputType = 'password'))
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
  </div>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore';
import { ref, watch } from 'vue';

const iconsStore = useIconsStore();

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
      return value.length > 3;
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
  autocomplete: {
    type: String,
    default: 'off',
  },
  minlength: {
    type: Number,
    default: 0,
  },
  maxlength: {
    type: Number,
  },
});

const input = ref();
const inputType = ref<string>(props.type);
const inputValue = ref<string>('');
const eyeIcon = ref(iconsStore.icons.eye);
const error = ref<string>('');

if (props.value) inputValue.value = props.value;

watch(
  () => inputValue.value,
  () => {
    if (props.maxlength && props.minlength > props.maxlength)
      throw new Error('Minimalna wartość jest większa niż maksymalna!');
    error.value = '';

    if (props.type == 'email' && !input.value.validity.valid)
      error.value = 'Wpisz poprawny e-mail';

    if (props.isRequired && !inputValue.value) {
      emit('hasError', true);
      return (error.value = 'To pole jest wymagane');
    }

    if (inputValue.value.length < props.minlength) {
      emit('hasError', true);
      return (error.value = `Minimalna ilość znaków to ${props.minlength}`);
    }

    if (props.maxlength && inputValue.value.length > props.maxlength) {
      emit('hasError', true);
      return (error.value = `Maksymalna ilość znaków to ${props.maxlength}`);
    }

    emit('hasError', false);
  }
);
</script>
