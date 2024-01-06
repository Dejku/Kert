<template>
  <q-page>
    Groups

    <BaseInput :icon="iconsStore.icons.success" isRequired :minlength="5" />
  </q-page>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore';
const iconsStore = useIconsStore();
</script>

<style lang="scss"></style>
