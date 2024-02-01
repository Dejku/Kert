<template>
  <transition name="dialog-fade">
    <div
      v-if="dialogStore.isShowed"
      class="column items-center q-mx-auto q-px-sm q-py-md absolute-center bg-surface rounded-borders gap-sm box-shadow"
      style="width: max(320px, 90%); z-index: 3000"
    >
      <header>
        <h5 class="no-margin text-bold">{{ dialogStore.dialog.title }}</h5>
      </header>

      <section v-if="dialogStore.dialog.desc" class="q-px-xs">
        {{ dialogStore.dialog.desc }}
      </section>

      <footer class="row gap-xl">
        <base-button
          :label="dialogStore.dialog.buttons.baseButton?.label"
          :color="dialogStore.dialog.buttons.baseButton?.color"
          :transparent="dialogStore.dialog.buttons.baseButton?.transparent"
          @click="dialogStore.optionChoosen('failed')"
        />

        <base-button
          v-if="dialogStore.dialog.buttons.extendedButton?.label"
          :label="dialogStore.dialog.buttons.extendedButton.label"
          :color="dialogStore.dialog.buttons.extendedButton.color"
          :transparent="dialogStore.dialog.buttons.extendedButton.transparent"
          @click="dialogStore.optionChoosen('success')"
        />
      </footer>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useDialogStore } from 'stores/dialogStore';
const dialogStore = useDialogStore();
</script>

<style lang="scss" scoped>
h5 {
  font-size: clamp($body-font-size, 4.5vw, $body-font-size-10);
}
</style>
