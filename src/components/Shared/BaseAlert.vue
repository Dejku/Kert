<template>
  <div
    v-if="isVisible"
    :id="props.id"
    class="base__alert q-py-xs q-px-sm full-width rounded-borders--small transition-03 box-shadow"
    :class="`base__alert--color-${props.status} ${
      alertsStore.scaleAlertID == props.id ? 'base__alert--scale' : ''
    }`"
    @click="userCanHide ? hide() : null"
  >
    <q-icon :name="iconsStore.getAlertIcon(props.status)" class="text-size-7" />
    {{ props.message }}
  </div>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore';
import { useAlertsStore } from 'stores/alertsStore';
import { onMounted, ref } from 'vue';

const iconsStore = useIconsStore();
const alertsStore = useAlertsStore();

const emit = defineEmits(['remove']);

const props = defineProps({
  id: String,
  status: {
    type: String,
    default: 'info',
  },
  message: String,
  duration: {
    type: Number,
    default: 5,
  },
  userCanHide: {
    type: Boolean,
    default: true,
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
