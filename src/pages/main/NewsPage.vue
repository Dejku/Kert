<template>
  <q-page class="gap-md">
    <base-title title="Skrzynka odbiorcza" />

    <section class="column gap-md">
      <div
        v-for="message in news"
        :key="message.id"
        class="relative-position row flex-center q-pa-sm bg-surface rounded-borders gap-sm box-shadow"
      >
        <div>
          <q-icon
            :name="message.icon"
            class="text-size-10 q-pa-sm bg-surfaceVariant rounded-borders--circle"
          />
        </div>
        <div class="column col-grow">
          <span>{{ message.title }}</span>
          <p class="no-margin text-size-4">
            {{ message.desc.message }}
            <span class="text-tertiary"> {{ message.desc.highlights }}</span>
          </p>
        </div>
        <div class="absolute-bottom-right q-ma-sm text-size-3">
          <span>{{ message.timestamp }}</span>
        </div>
      </div>
    </section>

    <section v-if="!news.length" class="column flex-center">
      <base-title title="Skrzynka odbiorcza jest pusta" size="7" />
      <span class="text-size-4">Powiadomimy Cię gdy pojawi się coś nowego</span>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { useIconsStore } from 'stores/iconsStore.js';
import { ref } from 'vue';
const iconsStore = useIconsStore();

type News = {
  id: string;
  icon: string;
  title: string;
  desc: {
    message?: string;
    highlights?: string;
  };
  timestamp: string;
  click: () => void;
};

const news = ref<News[]>([
  {
    id: 'das',
    icon: iconsStore.icons.person,
    title: 'Nowe zaproszenie do grupy',
    desc: {
      highlights: 'Przykładowa nazwa grupy',
    },
    timestamp: 'Teraz',
    click: () => console.log('dsa'),
  },
  {
    id: 'dadsadasds',
    icon: iconsStore.icons.warning,
    title: 'Wprowadzono ważne zmiany',
    desc: {
      message: 'W grupie',
      highlights: 'Rodzinka',
    },
    timestamp: '26 minut temu',
    click: () => console.log('dsa'),
  },
  {
    id: 'new',
    icon: iconsStore.icons.bell,
    title: 'Aktualizacja',
    desc: {
      message: 'Sprawdź nowości',
    },
    timestamp: '2 dni temu',
    click: () => console.log('dsa'),
  },
]);
</script>

<style lang="scss" scoped></style>
