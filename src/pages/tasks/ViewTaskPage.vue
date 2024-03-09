<template>
  <q-page class="justify-between gap-md">
    <header class="relative-position column">
      <base-title :title="set.label" text-position="center" />

      <base-button
        :icon-left="iconStore.icon.settings"
        label=""
        class="absolute"
        style="right: 0"
        transparent
        circle
        size="medium"
        no-border
        @click="toogleSettings()"
      />
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
            v-for="task in set.tasks"
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
              :class="task.isCompleted ? 'disabled text-strike	' : ''"
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
      <div class="row items-center justify-evenly">
        <base-button label="Wróć" transparent @click="router.push('/tasks')" />

        <base-button
          label="Zapisz"
          color="primary"
          loading
          :disabled="!hasUnsavedChanges"
          @click="updateSet()"
        />
      </div>
    </footer>

    <transition
      enter-active-class="animated fadeInDown"
      leave-active-class="animated fadeOutUp"
    >
      <section
        v-if="isSettingsOpen"
        class="column q-pa-lg fullscreen bg-background gap-md"
      >
        <header class="relative-position column">
          <base-title title="Ustawienia listy" text-position="center" />

          <base-button
            :icon-left="iconStore.icon.close"
            label=""
            class="absolute"
            style="right: 0"
            transparent
            circle
            no-border
            @click="toogleSettings()"
          />
        </header>

        <div class="column items-center gap-xs">
          <base-title title="Zmień nazwę listy" text-weight="400" size="5" />

          <base-input
            v-model="set.label"
            :minlength="3"
            :maxlength="16"
            placeholder="Nazwa listy"
            :value="set.label"
            :textCenter="true"
            @has-error="(value: boolean) => (hasError = value)"
            @click="hasUnsavedChanges = true"
          />
        </div>

        <div class="column items-center gap-xs">
          <base-title
            title="Wybierz etykietę listy"
            text-weight="400"
            size="5"
          />

          <div id="filter" class="row flex-center gap-sm">
            <div
              v-for="color in appStore.appColors"
              :key="color"
              :class="`bg-${color}`"
              @click="(set.color = color), (hasUnsavedChanges = true)"
            >
              <transition
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut"
              >
                <div
                  v-if="set.color == color"
                  id="filter__dot--active"
                  class="fit border-radius-inherit"
                ></div>
              </transition>
            </div>
          </div>
        </div>

        <q-space />

        <footer class="column gap-md">
          <div
            class="column q-py-sm q-px-md no-wrap text-weight-600 bg-surface rounded-borders transition-03 box-shadow"
            :style="set.sharedIn ? 'max-height: 71px' : 'max-height: 44px'"
          >
            <header class="row gap-xs">
              <q-icon :name="iconStore.icon.people" class="text-size-8" />

              {{ set.sharedIn ? 'Udostępnione w' : 'Udostępnij w grupie' }}

              <q-space />

              <base-button
                :label="set.sharedIn ? 'Cofnij' : 'Dodaj'"
                size="small"
                :transparent="set.sharedIn ? true : false"
                :color="set.sharedIn ? undefined : 'secondary'"
                @click="set.sharedIn ? unShareSet() : shareSet()"
              />
            </header>

            <transition
              enter-active-class="animated fadeInDown"
              leave-active-class="animated fadeOutUp"
            >
              <div v-if="set.sharedIn" class="row q-ml-xs gap-xs">
                <q-icon
                  :name="iconStore.icon.arrowDownRight"
                  class="text-size-8"
                />

                <div class="text-tertiary">
                  {{ set.sharedIn.label }}
                </div>
              </div>
            </transition>
          </div>

          <div class="row items-center justify-evenly">
            <base-button
              v-if="set.ownerID == accountStore.getID"
              label="Usuń listę"
              color="error"
              loading
              :disabled="set.ownerID != accountStore.getID"
              @click="deleteSet()"
            />

            <base-button
              label="Zapisz"
              color="primary"
              loading
              :disabled="!hasUnsavedChanges"
              @click="updateSet()"
            />
          </div>
        </footer>
      </section>
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { fireEvent } from 'utils';
import { ErrorAlert } from 'models';

import { useTaskStore } from 'stores/taskStore';
import { useIconStore } from 'stores/iconStore';
import { useAccountStore } from 'stores/accountStore';
import { useAppStore } from 'stores/appStore';
import { useAlertStore } from 'stores/alertStore';

import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { uid } from 'quasar';

const taskStore = useTaskStore();
const iconStore = useIconStore();
const accountStore = useAccountStore();
const appStore = useAppStore();
const alertStore = useAlertStore();
const router = useRouter();
const route = useRoute();

const isSettingsOpen = ref<boolean>(false);
const tasksContainerHeight = ref<number>();
const hasError = ref<boolean>(false);
const hasUnsavedChanges = ref<boolean>(false);

const set = ref<SetOfTasks>({
  id: uid(),
  ownerID: accountStore.getID,
  label: '',
  color: appStore.appColors[0],
  sharedIn: null,
  tasks: [] as Task[],
});

const toogleSettings = () => {
  if (hasError.value) return (isSettingsOpen.value = true);

  isSettingsOpen.value = !isSettingsOpen.value;
};

const newTask = () => {
  const newTask: Task = {
    id: uid(),
    label: '',
    isCompleted: false,
    addedBy: accountStore.getID,
  };

  set.value.tasks.push(newTask);
};

const toggleCheckTask = (task: Task) => {
  hasUnsavedChanges.value = true;

  task.isCompleted = !task.isCompleted;
};

const deleteTask = (task: Task) => {
  const index = set.value.tasks.indexOf(task);
  if (index > -1) set.value.tasks.splice(index, 1);
};

const shareSet = () => {
  hasUnsavedChanges.value = true;

  set.value.sharedIn = {
    id: 'das',
    label: 'Super Grupa',
  };
};

const unShareSet = () => {
  hasUnsavedChanges.value = true;

  set.value.sharedIn = null;
};

const updateSet = async () => {
  set.value.tasks.forEach((task) => (task.label = task.label.trim()));
  set.value.tasks = set.value.tasks.filter((task) => task.label != '');

  const res = await taskStore.updateSet(set.value);

  if ((res.status = 'success')) {
    hasUnsavedChanges.value = false;

    alertStore.createAlert({
      status: 'success',
      message: 'Zapisano zmiany',
      duration: 3,
    });
  } else alertStore.createAlert(ErrorAlert);

  fireEvent('base__button--loadingComplete');
};

const deleteSet = async () => {
  await taskStore.deleteSet(set.value);
  router.push('/tasks');
};

onMounted(() => {
  tasksContainerHeight.value = window.innerHeight - 32 - 36 - 24 * 2 - 16 * 2;

  const storeSet = taskStore.getSetById(route.query.task as string);
  if (storeSet) set.value = storeSet;
});
</script>
