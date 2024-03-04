<template>
  <q-page>
    <div>
      <base-input
        v-model="set.label"
        type="text"
        :minlength="5"
        :maxlength="15"
        :value="set.label"
        :placeholder="set.label || 'Nazwa listy'"
        :text-center="true"
        @has-error="(value: boolean) => (hasError = value)"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const set = ref<TasksSet>({
  id: '123',
  label: 'Zadanie',
  color: 'success',
  tasks: [],
  owner: '',
});

const hasError = ref<boolean>(false);
</script>
