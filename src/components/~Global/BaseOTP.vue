<template>
  <div
    class="column items-center q-pa-lg full-width bg-surface rounded-borders gap-lg box-shadow"
  >
    <h6 class="main-title text-size-10">{{ label }}</h6>
    <div class="row flex-center full-width gap-sm">
      <input
        v-for="i in length"
        v-model="fieldValues[i - 1]"
        :id="`input${i}`"
        :key="i"
        type="number"
        class="codeInput text-weight-600 text-center rounded-borders--small bg-surfaceVariant q-py-xs q-px-sm overflow-hidden box-shadow"
        placeholder="0"
        maxlength="1"
        @keyup="onKeyUp($event, i)"
        @click="fieldValues[i - 1] = null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const props = defineProps({
  label: {
    type: String,
    default: 'Wpisz kod',
  },
  length: {
    type: Number,
    default: 4,
  },
});

const fieldValues = reactive([null]);

const composite = computed(() => {
  const nonNullFields = fieldValues.filter((value) => value);
  if (props.length !== nonNullFields.length) return '';
  else return nonNullFields.join('');
});

watch(composite, () => {
  if (composite.value) emit('update:modelValue', composite.value);
});

const onKeyUp = (event: KeyboardEvent, index: number) => {
  const input = document.getElementById(`input${index}`) as HTMLInputElement;
  const { key } = event;

  if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft') {
    const prev = input.previousElementSibling as HTMLInputElement;
    if (prev) prev.focus();

    return;
  }

  const regExp = /\d/;
  if (regExp.test(key)) {
    const next = input.nextElementSibling as HTMLInputElement;
    if (next) next.focus();
  }
};
</script>

<style lang="scss" scoped>
.codeInput {
  width: calc(100% / 6 - 10px);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
}
</style>
