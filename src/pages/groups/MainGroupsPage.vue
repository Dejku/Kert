<template>
  <q-page>
    Groups

    <BaseButton @click="dialogStore.showDialog(dialog)" />
  </q-page>
</template>

<script setup lang="ts">
import { DialogOption } from 'src/components/models';
import { useDialogStore } from 'stores/dialogStore';
const dialogStore = useDialogStore();

const dialog: DialogOption = {
  title: 'Czy na pewno chcesz się wylogować?',
  buttonsOptions: {
    baseButton: {
      label: 'Nie',
      transparent: true,
    },
    extendedButton: {
      label: 'Tak',
      color: 'error',
    },
  },
};
</script>

<style lang="scss"></style>
