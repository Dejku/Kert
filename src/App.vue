<template>
  <router-view />

  <BaseOverlay />
  <BaseModal />
</template>

<script setup lang="ts">
import BaseModal from 'components/Shared/BaseModal.vue';
import BaseOverlay from 'components/Shared/BaseOverlay.vue';
</script>
