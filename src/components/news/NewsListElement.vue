<template>
  <div class="relative-position full-width q-my-md">
    <div
      class="row flex-center q-pa-sm bg-surface rounded-borders gap-sm box-shadow"
      v-touch-swipe.mouse.left="swipeItem"
    >
      <div>
        <q-icon
          :name="icon"
          class="text-size-10 q-pa-sm bg-surfaceVariant rounded-borders--circle"
        />
      </div>
      <div class="column col-grow">
        <span>{{ title }}</span>
        <p class="no-margin text-size-4">
          {{ message }}
          <span class="text-tertiary">{{ highlights }}</span>
        </p>
      </div>
      <div class="absolute-bottom-right q-ma-sm text-size-3">
        <span>{{ timestamp }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from 'stores/newsStore';
const newsStore = useNewsStore();

type TouchSwipeValue = {
  distance: {
    x: number;
  };
};

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: String,
  highlights: String,
  timestamp: {
    type: String,
    required: true,
  },
});

const swipeItem = <T>(e: T) => {
  if ((e as TouchSwipeValue).distance.x > 5) newsStore.deleteNews(props.id);
};
</script>
