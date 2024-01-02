<template>
  <div
    v-if="isVisible"
    class="base__alert row items-center q-py-xs q-px-sm full-width gap-5 rounded-borders--small shadow"
    :class="`base__alert--color-${props.state}`"
    @click="hide()"
  >
    <q-icon :name="iconsStore.getAlertIcon(props.state)" size="20px" />
    {{ props.message }}
  </div>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore';
import { onMounted, ref } from 'vue';

const iconsStore = useIconsStore();

const emit = defineEmits(['remove']);

const props = defineProps({
  id: String,
  state: {
    type: String,
    default: 'info',
    validation(value: string) {
      return ['success', 'info', 'warning', 'error'].includes(value);
    },
  },
  message: String,
  duration: {
    type: Number,
    default: 5,
  },
});

const isVisible = ref<boolean>(false);

const afterEnter = () => {
  const duration = props.duration;
  duration != 0 ? setTimeout(() => hide(), duration * 1000) : null;
};

const afterLeave = () => {
  emit('remove');
};

const hide = () => {
  isVisible.value = false;
  afterLeave();
};

onMounted(() => {
  afterEnter();
  isVisible.value = true;
});
</script>

<style lang="scss" scoped>
.base__alert {
  &.base__alert--color-success {
    color: var(--onSuccess);
    background-color: var(--success);
  }
  &.base__alert--color-info {
    color: var(--onInfo);
    background-color: var(--info);
  }
  &.base__alert--color-warning {
    color: var(--onWarning);
    background-color: var(--warning);
  }
  &.base__alert--color-error {
    color: var(--onError);
    background-color: var(--error);
  }
}
</style>
