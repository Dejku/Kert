<template>
  <q-page class="gap-md">
    <section class="column items-center gap-md">
      <base-title title="Centrum Pomocy" />

      <base-input
        ref="input"
        v-model="searchQuery"
        :icon="iconStore.icon.search"
        placeholder="Szukaj"
        text-center
        bg-color="surfaceVariant"
      />
    </section>

    <section v-if="computedResult.length" class="column q-px-sm q-py-sm gap-md">
      <transition-group name="list">
        <div
          v-for="element in computedResult"
          :key="element.label"
          @click="element.click"
          class="search__container__element row q-px-sm q-py-xs bg-surface rounded-borders gap-sm box-shadow"
        >
          <q-icon :name="element.icon" class="text-size-10" />

          <span>{{ element.label }}</span>
        </div>
      </transition-group>
    </section>

    <base-title
      v-else
      class="absolute-center flex flex-center full-width"
      title="Nic nie znaleziono"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { computed, ref } from 'vue';
const iconStore = useIconStore();

import { useRouter } from 'vue-router';
const router = useRouter();

const input = ref<HTMLElement | null>(null);
const searchQuery = ref<string>('');
const helpPages = [
  {
    icon: iconStore.icon.bell,
    label: 'Kalendarz',
    click: () => router.push('/support/123'),
  },
  {
    icon: iconStore.icon.bell,
    label: 'Powiadomienia',
    click: () => router.push('/support/1234'),
  },
  {
    icon: iconStore.icon.bell,
    label: 'Ustawienia',
    click: () => router.push('/support/12345'),
  },
  {
    icon: iconStore.icon.bell,
    label: 'Inne',
    click: () => router.push('/support/123456'),
  },
];

const computedResult = computed(() => {
  if (searchQuery.value) {
    return helpPages.filter((item) => {
      return searchQuery.value
        .toLowerCase()
        .split(' ')
        .every((v) => item.label.toLowerCase().includes(v));
    });
  } else return helpPages;
});
</script>

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.search__container__element {
  width: calc(100vw - (16px * 2) - (8px * 2));
}
</style>
