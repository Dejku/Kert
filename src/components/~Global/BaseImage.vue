<template>
  <div class="fit flex flex-center">
    <img v-if="image" class="fit" :src="image" />

    <template v-else>
      <q-spinner v-if="spinner" color="primary" size="3rem" :thickness="3" />

      <q-skeleton v-else type="rect" class="fit" />
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: String,
  spinner: {
    type: Boolean,
    default: false,
  },
});
</script>
