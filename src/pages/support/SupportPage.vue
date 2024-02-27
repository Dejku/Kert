<template>
  <q-page>
    <main class="column gap-md">
      <base-title
        :icon="iconStore.icon.arrowBack"
        :title="title"
        to="/support"
      />

      <q-expansion-item
        v-if="tableOfContents.length"
        id="table-of-contents"
        class="bg-surface rounded-borders box-shadow"
        label="Spis treści"
        dense
      >
        <ol class="no-margin q-pb-sm" style="padding-left: 30px">
          <li v-for="link in tableOfContents" :key="link.name">
            <a :href="`#${link.anchor}`">{{ link.name }}</a>
          </li>
        </ol>
      </q-expansion-item>

      <q-skeleton v-else type="rect" />

      <section class="column q-px-sm gap-md">
        <template v-if="content.length">
          <template v-for="ele in content" :key="ele.id">
            <p v-if="ele.type === 'paragraph'" :id="ele.anchor">
              {{ ele.content }}
            </p>

            <base-badge
              v-if="ele.type === 'badge'"
              :icon="iconStore.icon.info"
              class="text-size-4"
            >
              <template v-if="ele.bold" #bold>{{ ele.bold }}</template>

              {{ ele.content }}
            </base-badge>
          </template>
        </template>

        <div v-else class="column gap-lg">
          <div v-for="i in 3" :key="i" class="column gap-sm">
            <q-skeleton type="text" />
            <q-skeleton type="text" />
            <q-skeleton type="text" />
          </div>
        </div>
      </section>
    </main>
  </q-page>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { useSupportStore } from 'stores/supportStore';

import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';

const iconStore = useIconStore();
const supportStore = useSupportStore();
const route = useRoute();
const router = useRouter();

const title = ref<string>();
const tableOfContents = ref<TableOfContent[]>([]);
const content = ref<MainContent[]>([]);

const getPage = () => {
  const page = supportStore.getPage(route.params.documentID as string);

  if (!page) return router.push('/ErrorNotFound');

  title.value = page.title;
  tableOfContents.value = page.tableOfContents;
  content.value = page.content;
};

onBeforeMount(() => getPage());
</script>

<style lang="scss" scoped>
#table-of-contents {
  position: sticky;
  top: 1%;
}
</style>
