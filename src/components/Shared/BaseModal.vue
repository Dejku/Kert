<template>
  <div>
    <Transition name="modal-slide">
      <div
        v-if="modalStore.isShowed"
        id="base__modal"
        class="column flex items-center absolute-bottom gap-10"
      >
        <div class="column flex flex-center full-width gap-20">
          <hr
            class="rounded-borders--big bg-outline no-border no-margin shadow"
          />

          <h5 id="base__modal__title" class="no-margin text-bold">
            {{ modalStore.modal.title }}
          </h5>

          <section id="base__modal__desc" class="full-width q-px-sm">
            <component
              :is="
                modalComponents.find(
                  (comp) => comp.name === modalStore.modal.component.type
                )?.comp
              "
            ></component>
          </section>
        </div>

        <div id="base__modal__buttons" class="row q-py-sm gap-40">
          <BaseButton
            :label="modalStore.modal.buttons.baseButton?.label"
            :class="`base__button--color-${modalStore.modal.buttons.baseButton?.color}`"
            :transparent="modalStore.modal.buttons.baseButton?.transparent"
            @click="modalStore.optionChoosen('failed')"
          />

          <BaseButton
            v-if="modalStore.modal.buttons.extendedButton?.label"
            :label="modalStore.modal.buttons.extendedButton.label"
            :class="`base__button--color-${modalStore.modal.buttons.extendedButton.color}`"
            :transparent="modalStore.modal.buttons.extendedButton.transparent"
            @click="modalStore.optionChoosen('success')"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from 'stores/modalStore';
const modalStore = useModalStore();

import { defineAsyncComponent } from 'vue';

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
  {
    name: 'showVacation',
    comp: defineAsyncComponent(
      () => import('components/modal/ModalShowVacation.vue')
    ),
  },
];
</script>
