<template>
  <Transition name="modal-slide">
    <div
      v-if="modalStore.isShowed"
      id="base__modal"
      class="column items-center q-pa-md absolute-bottom gap-sm"
    >
      <div class="column flex-center full-width gap-lg">
        <hr
          class="rounded-borders--big bg-outline no-border no-margin shadow"
        />

        <h5 id="base__modal__title" class="no-margin text-bold">
          {{ modalStore.modal.title }}
        </h5>

        <section id="base__modal__desc" class="full-width q-px-sm">
          <Suspense>
            <ModalError v-if="hasError" />

            <component
              v-else
              :is="
                modalComponents.find(
                  (comp) => comp.name === modalStore.modal.component.type
                )?.comp
              "
            />

            <template #fallback>
              <ModalLoading />
            </template>
          </Suspense>
        </section>
      </div>

      <div id="base__modal__buttons" class="row flex-center q-pa-sm gap-xl">
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
</template>

<script setup lang="ts">
import ModalLoading from 'components/modal/ModalLoading.vue';
import ModalError from 'components/modal/ModalError.vue';

import { useModalStore } from 'stores/modalStore';
const modalStore = useModalStore();

import { defineAsyncComponent, onErrorCaptured, ref } from 'vue';

onErrorCaptured(() => {
  setTimeout(() => (hasError.value = true), 2000);
});

const hasError = ref<boolean>(false);

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
