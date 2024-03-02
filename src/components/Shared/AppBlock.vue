<template>
  <div
    v-if="blockStore.isAppBlocked"
    class="column flex-center q-pa-md fullscreen bg-background gap-sm no-pointer-events"
  >
    <q-icon :name="iconStore.icon.closeCircle" size="15vw" class="text-error" />

    <base-title
      :title="blockStore.block.title"
      class="full-width flex-center"
      size="7"
      :letter-spacing="false"
    />

    <p class="no-margin text-center text-weight-200">
      {{ blockStore.block.desc }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useBlockStore } from 'stores/blockStore';
import { useIconStore } from 'stores/iconStore';

const blockStore = useBlockStore();
const iconStore = useIconStore();
</script>
