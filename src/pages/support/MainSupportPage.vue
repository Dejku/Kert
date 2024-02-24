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
          @click="fetchSupportPage(element.link)"
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

import { computed, ref, onBeforeMount } from 'vue';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useRouter } from 'vue-router';

const iconStore = useIconStore();
const supportStore = useSupportStore();

const router = useRouter();
const input = ref<HTMLElement | null>(null);
const searchQuery = ref<string>('');
const links = ref<SupportLinks[]>([]);

const fetchLinks = async () => {
  const db = getFirestore();
  const docRef = doc(db, 'supportStore', 'supportLinks');
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  links.value = docSnap.data().links;
};

const fetchSupportPage = async (link: string) => {
  const db = getFirestore();
  const docRef = doc(db, 'supportStore', link);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  supportStore.title = docSnap.data().title;
  supportStore.tableOfContents = docSnap.data().tableOfContents;
  supportStore.content = docSnap.data().content;
  router.push(`/support/${link}`);
};

const computedResult = computed(() => {
  if (searchQuery.value) {
    return links.value.filter((item) => {
      return searchQuery.value
        .toLowerCase()
        .split(' ')
        .every((v) => item.label.toLowerCase().includes(v));
    });
  } else return links.value;
});

onBeforeMount(() => fetchLinks());
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
