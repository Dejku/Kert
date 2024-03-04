<template>
  <q-page class="gap-md">
    <q-expansion-item
      expand-icon="eva-funnel-outline"
      expanded-icon="eva-funnel-outline"
    >
      <template v-slot:header>
        <base-title title="Twoja lista zadań" />

        <q-space />
      </template>

      <div
        id="filter"
        class="row flex-center q-py-sm bg-surfaceVariant rounded-borders box-shadow gap-sm"
      >
        <div
          v-for="color in appStore.appColors"
          :key="color"
          :class="`bg-${color}`"
          @click="selectedColor = color"
        >
          <transition
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut"
          >
            <div
              v-if="selectedColor == color"
              id="filter__dot--active"
              class="fit border-radius-inherit"
            ></div>
          </transition>
        </div>
      </div>
    </q-expansion-item>

    <section
      v-if="taskStore.sets.length"
      class="relative-position column gap-md"
    >
      <transition-group name="list-transition">
        <router-link
          v-for="set in sets"
          :key="set.id"
          :to="{ path: '/tasks/view', query: { task: set.id } }"
          class="row items-center full-width q-pa-sm bg-surface rounded-borders box-shadow"
          :class="`border-${set.color || appStore.appColors[0]}`"
          style="
            border-left-width: 10px !important;
            border-top: none !important;
            border-right: none !important;
            border-bottom: none !important;
          "
        >
          <base-title :title="set.label" size="6" text-weight="400" />

          <q-space />

          <div class="row items-center gap-xs">
            <span class="set__tasks__count">
              {{ taskStore.countCompletedTasks(set.tasks) }} /
              {{ set.tasks.length }}
            </span>

            <q-icon :name="iconStore.icon.successCircle" class="text-size-7" />
          </div>
        </router-link>
      </transition-group>
    </section>

    <transition-group name="fade">
      <div
        v-if="!taskStore.sets.length"
        key="no sets"
        class="absolute-center full-width column items-center"
      >
        <base-title
          title="Nie posiadasz żadnych aktywnych zadań"
          size="5"
          :letter-spacing="false"
        />

        <base-button
          label="Kliknij aby dodaj nowe"
          transparent
          no-border
          size="small"
          :text-bold="false"
          :ripple="false"
        />
      </div>

      <div
        v-if="!sets.length"
        key="nothing found"
        class="absolute-center full-width column items-center"
      >
        <base-title
          title="Nic nie znaleziono"
          size="5"
          :letter-spacing="false"
        />
      </div>
    </transition-group>

    <base-button
      :icon-left="iconStore.icon.plus"
      label=""
      circle
      class="absolute-bottom-right"
      style="right: 2rem; bottom: 2rem"
      @click="router.push('/tasks/create')"
    />
  </q-page>
</template>

<script setup lang="ts">
import { useIconStore } from 'stores/iconStore';
import { useTaskStore } from 'stores/taskStore';
import { useAppStore } from 'stores/appStore';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const iconStore = useIconStore();
const taskStore = useTaskStore();
const appStore = useAppStore();
const router = useRouter();

const selectedColor = ref<AppColors>('onBackground');

const sets = computed(() => {
  return taskStore.sets.filter((set) => {
    return selectedColor.value == 'onBackground'
      ? true
      : set.color == selectedColor.value;
  });
});
</script>

<style lang="scss">
#filter {
  div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 5px;

    #filter__dot--active {
      background: var(--background);
    }
  }
}

.q-item {
  padding: 8px !important;

  .q-item__section {
    padding-right: 0px !important;
  }
}
</style>
