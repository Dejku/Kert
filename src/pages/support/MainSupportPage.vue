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
        separator
        bg-color="surfaceVariant"
      />
    </section>

    <section v-if="computedResult.length" class="column q-px-sm q-py-sm gap-md">
      <transition-group name="list">
        <div
          v-for="element in computedResult"
          :key="element.label"
          class="search__container__element row q-px-sm q-py-xs bg-surface rounded-borders gap-sm box-shadow z-fab"
          @click="changePage(element.link)"
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
import { useSupportStore } from 'stores/supportStore';
import { useAlertStore } from 'stores/alertStore';

import { computed, ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const iconStore = useIconStore();
const supportStore = useSupportStore();
const alertStore = useAlertStore();

const input = ref<HTMLElement | null>(null);
const searchQuery = ref<string>('');
const router = useRouter();

const computedResult = computed(() => {
  if (searchQuery.value) {
    return supportStore.links.filter((item) => {
      return searchQuery.value
        .toLowerCase()
        .split(' ')
        .every((v) => item.label.toLowerCase().includes(v));
    });
  } else return supportStore.links;
});

const changePage = async (link: string) => {
  const isExist = await supportStore.changePage(link);

  if (isExist) return router.push(`/support/${link}`);

  alertStore.createAlert({
    status: 'error',
    message: 'Strona nie została odnaleziona',
    duration: 3,
  });
};

onBeforeMount(() => supportStore.fetchLinks());
</script>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.list-leave-active {
  position: absolute;
  z-index: 1;
}

.search__container__element {
  width: calc(100vw - (16px * 2) - (8px * 2));
}
</style>
