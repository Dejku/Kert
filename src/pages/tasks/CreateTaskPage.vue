<template>
  <q-page class="justify-between gap-md">
    <header class="column gap-md">
      <base-title title="Stwórz nową listę" text-position="center" />

      <base-input
        v-model="newSet.label"
        :minlength="3"
        :maxlength="16"
        placeholder="Wpisz nazwę listy"
        :textCenter="true"
        @has-error="(value: boolean) => (hasError = value)"
      />

      <div class="column items-center gap-xs">
        <base-title title="Wybierz etykietę listy" text-weight="400" size="5" />

        <div id="filter" class="row flex-center gap-sm">
          <div
            v-for="color in appStore.appColors"
            :key="color"
            :class="`bg-${color}`"
            @click="newSet.color = color"
          >
            <transition
              enter-active-class="animated zoomIn"
              leave-active-class="animated zoomOut"
            >
              <div
                v-if="newSet.color == color"
                id="filter__dot--active"
                class="fit border-radius-inherit"
              ></div>
            </transition>
          </div>
        </div>
      </div>
    </header>

    <section>
      <q-scroll-area
        class="q-px-sm bg-surface rounded-borders box-shadow"
        :style="`height: ${tasksContainerHeight}px`"
        :bar-style="{ display: 'none' }"
        :thumb-style="{ display: 'none' }"
      >
        <div class="column q-my-sm gap-sm">
          <div
            v-for="task in newSet.tasks"
            :key="task.id"
            class="row no-wrap gap-xs"
          >
            <q-icon
              :name="
                task.isCompleted
                  ? iconStore.icon.successCircle
                  : iconStore.icon.circle
              "
              class="text-size-8"
              @click="toggleCheckTask(task)"
            />

            <input
              type="text"
              v-model="task.label"
              placeholder="Nazwa zadania"
              class="full-width"
              :class="task.isCompleted ? 'disabled text-strike' : ''"
            />

            <q-icon
              :name="iconStore.icon.close"
              class="text-size-8"
              @click="deleteTask(task)"
            />
          </div>

          <div class="row gap-xs" @click="newTask()">
            <q-icon :name="iconStore.icon.plusCircle" class="text-size-8" />
            Dodaj zadanie
          </div>
        </div>
      </q-scroll-area>
    </section>

    <footer class="column gap-md">
      <div
        class="column q-py-sm q-px-md no-wrap text-weight-600 bg-surface rounded-borders transition-03 box-shadow"
        :style="newSet.sharedIn ? 'max-height: 71px' : 'max-height: 44px'"
      >
        <header class="row gap-xs">
          <q-icon :name="iconStore.icon.people" class="text-size-8" />

          {{ newSet.sharedIn ? 'Udostępnione w' : 'Udostępnij w grupie' }}

          <q-space />

          <base-button
            :label="newSet.sharedIn ? 'Cofnij' : 'Dodaj'"
            size="small"
            :transparent="newSet.sharedIn ? true : false"
            :color="newSet.sharedIn ? undefined : 'secondary'"
            @click="newSet.sharedIn ? unShareSet() : shareSet()"
          />
        </header>

        <transition
          enter-active-class="animated fadeInDown"
          leave-active-class="animated fadeOutUp"
        >
          <div v-if="newSet.sharedIn" class="row q-ml-xs gap-xs">
            <q-icon :name="iconStore.icon.arrowDownRight" class="text-size-8" />

            <div class="text-tertiary">
              {{ newSet.sharedIn.label }}
            </div>
          </div>
        </transition>
      </div>

      <div class="row items-center justify-evenly">
        <base-button label="Wróć" transparent @click="router.push('/tasks')" />

        <base-button
          label="Stwórz"
          loading
          :disabled="hasError"
          @click="createSet()"
        />
      </div>
    </footer>
  </q-page>
</template>

<script setup lang="ts">
import { useTaskStore } from 'stores/taskStore';
import { useIconStore } from 'stores/iconStore';
import { useAccountStore } from 'stores/accountStore';
import { useAppStore } from 'stores/appStore';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { uid } from 'quasar';

const taskStore = useTaskStore();
const iconStore = useIconStore();
const accountStore = useAccountStore();
const appStore = useAppStore();
const router = useRouter();

const tasksContainerHeight = ref<number>();
const hasError = ref<boolean>(true);

const newSet = ref<SetOfTasks>({
  id: uid(),
  ownerID: accountStore.getID,
  label: '',
  color: appStore.appColors[0],
  sharedIn: null,
  tasks: [] as Task[],
});

const newTask = () => {
  const newTask: Task = {
    id: uid(),
    label: '',
    isCompleted: false,
    addedBy: accountStore.getID,
  };

  newSet.value.tasks.push(newTask);
};

const toggleCheckTask = (task: Task) => (task.isCompleted = !task.isCompleted);

const deleteTask = (task: Task) => {
  const index = newSet.value.tasks.indexOf(task);
  if (index > -1) newSet.value.tasks.splice(index, 1);
};

const shareSet = () => {
  newSet.value.sharedIn = {
    id: 'das',
    label: 'Super Grupa',
  };
};

const unShareSet = () => (newSet.value.sharedIn = null);

const createSet = async () => {
  if (hasError.value) return;

  await taskStore.createSet(newSet.value);
  router.push({ path: '/tasks/view', query: { task: newSet.value.id } });
};

onMounted(() => {
  tasksContainerHeight.value = window.innerHeight - 178 - 117 - 24 * 2 - 16 * 2;
});
</script>
