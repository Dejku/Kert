<template>
  <q-page>
    <main class="column gap-md">
      <base-title
        :icon-left="iconStore.icon.arrowBack"
        :title="supportStore.title"
        to="/support"
      />

      <q-expansion-item
        id="table-of-contents"
        class="bg-surface rounded-borders box-shadow"
        label="Spis treści"
        dense
      >
        <ol class="no-margin q-pb-sm" style="padding-left: 30px">
          <li v-for="link in supportStore.tableOfContents" :key="link.name">
            <a :href="`#${link.anchor}`">{{ link.name }}</a>
          </li>
        </ol>
      </q-expansion-item>

      <section class="column q-px-sm gap-md">
        <template v-for="ele in supportStore.content" :key="ele.id">
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
      </section>
    </main>
  </q-page>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { useSupportStore } from 'stores/supportStore';

const iconStore = useIconStore();
const supportStore = useSupportStore();
</script>

<style lang="scss" scoped>
#table-of-contents {
  position: sticky;
  top: 1%;
}
</style>
