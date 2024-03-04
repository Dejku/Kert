<template>
  <q-page class="gap-md">
    <base-title title="Skrzynka odbiorcza" />

    <section class="relative-position">
      <transition-group name="list-transition">
        <news-list-element
          v-for="message in newsStore.news"
          :key="message.id"
          :id="message.id"
          :icon="message.icon"
          :title="message.title"
          :message="message.desc.message"
          :highlights="message.desc.highlights"
          :timestamp="message.timestamp"
          @click="message.click"
        />
      </transition-group>
    </section>

    <transition name="fade">
      <div
        v-if="!newsStore.news.length"
        class="absolute-center column flex-center full-width"
      >
        <base-title title="Brak nowych wiadomości" size="7" />
        <span class="text-size-4">
          Powiadomimy Cię gdy pojawi się coś nowego
        </span>
      </div>
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import NewsListElement from 'components/news/NewsListElement.vue';

import { useNewsStore } from 'stores/newsStore';
const newsStore = useNewsStore();
</script>
