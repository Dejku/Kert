<template>
  <div>
    <Transition name="modal-slide">
      <div
        v-if="modalStore.isShowed"
        id="base__modal"
        class="column flex items-center absolute-bottom z-top gap-20"
      >
        <div class="column flex flex-center full-width gap-10">
          <hr class="rounded-borders--big bg-outline no-border" />

          <h5 id="base__modal__title" class="no-margin text-bold">
            {{ modalStore.modal.title }}
          </h5>

          <section id="base__modal__desc" class="full-width q-px-sm">
            <component
              :is="
                modalComponents.find(
                  (comp) => comp.name === modalStore.modal.component
                )?.comp
              "
            ></component>
          </section>
        </div>

        <div id="base__modal__buttons" class="row gap-40">
          <BaseButton
            :label="modalStore.modal.buttons.baseButton.label"
            transparent
            @click="modalStore.hideModal()"
          />

          <BaseButton
            v-if="modalStore.modal.buttons.extendedButton.visible"
            :label="modalStore.modal.buttons.extendedButton.label"
            :class="`base__button--color-${modalStore.modal.buttons.extendedButton.color}`"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from 'stores/modalStore';
const modalStore = useModalStore();

import { defineAsyncComponent, onMounted, onUnmounted } from 'vue';

const modalComponents = [
  {
    name: 'monthSummary',
    comp: defineAsyncComponent(
      () => import('components/modal/ModalMonthSummary.vue')
    ),
  },
  {
    name: 'addVacation',
    comp: defineAsyncComponent(
      () => import('components/modal/ModalAddVacation.vue')
    ),
  },
];

onMounted(() =>
  window.addEventListener('showOverlay', (e) =>
    overlayListener(e as CustomEvent)
  )
);
onUnmounted(() =>
  window.removeEventListener('showOverlay', (e) =>
    overlayListener(e as CustomEvent)
  )
);

const overlayListener = (e: CustomEvent) =>
  e.detail == false ? modalStore.close() : null;
</script>

<style lang="scss" scoped>
#base__modal {
  background-image: linear-gradient(
    to bottom,
    var(--surface),
    var(--background)
  );
  border-radius: 25px 25px 0 0;
  padding: 15px 20px 30px;

  hr {
    width: 40%;
    height: 5px;
  }
}
</style>
