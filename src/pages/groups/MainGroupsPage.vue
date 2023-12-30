<template>
  <q-page>
    Groups

    <BaseButton @click="click" />
  </q-page>
</template>

<script setup lang="ts">
import { useModalStore } from 'stores/modalStore';
const modalStore = useModalStore();

const click = async () => {
  const response = await modalStore.showModal({
    component: {
      type: undefined,
      options: {},
    },
  });

  if (response.status == 'success') console.log(response);
  else console.log(response);
};
</script>

<style lang="scss"></style>
