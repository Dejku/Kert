<template>
  <transition name="modal-slide">
    <div
      v-if="modalStore.isShowed"
      class="base__modal column justify-between items-center q-pa-md absolute-bottom gap-md"
    >
      <section
        id="base__modal__header"
        class="column flex-center full-width gap-md"
      >
        <hr
          class="rounded-borders--big bg-outline no-border no-margin box-shadow"
        />

        <base-title :title="modalStore.modal.title" />
      </section>

      <section id="base__modal__component" class="full-width q-px-sm">
        <suspense>
          <component :is="component || ModalError" />

          <template #fallback>
            <modal-loading />
          </template>
        </suspense>
      </section>

      <section id="base__modal__buttons" class="row flex-center q-pa-sm gap-xl">
        <base-button
          :label="modalStore.modal.buttons.primaryButton.label"
          :color="modalStore.modal.buttons.primaryButton.color"
          :transparent="modalStore.modal.buttons.primaryButton.transparent"
          :disabled="isButtonDisabled"
          @click="modalStore.optionChoosen('failed')"
        />

        <base-button
          v-if="modalStore.modal.buttons.secondaryButton?.label"
          :label="modalStore.modal.buttons.secondaryButton.label"
          :color="modalStore.modal.buttons.secondaryButton.color"
          :transparent="modalStore.modal.buttons.secondaryButton.transparent"
          :disabled="isButtonDisabled || modalStore.modal.buttons.isDisabled"
          @click="modalStore.optionChoosen('success')"
        />
      </section>
    </div>
  </transition>
</template>

<script setup lang="ts">
const ModalLoading = defineAsyncComponent(
  () => import('components/modal/ModalLoading.vue')
);

const ModalError = defineAsyncComponent(
  () => import('components/modal/ModalError.vue')
);

import { useModalStore } from 'stores/modalStore';
import { defineAsyncComponent, ref, shallowRef, watch } from 'vue';

const modalStore = useModalStore();

const component = shallowRef();
const isButtonDisabled = ref<boolean>(false);

const modalComponents = [
  {
    name: 'addVacation',
    comp: defineAsyncComponent(
      () => import('components/modal/ModalAddVacation.vue')
    ),
  },
  {
    name: 'changeName',
    comp: defineAsyncComponent(
      () => import('components/modal/ModalChangeName.vue')
    ),
  },
  {
    name: 'changePassword',
    comp: defineAsyncComponent(
      () => import('components/modal/ModalChangePassword.vue')
    ),
  },
  {
    name: 'monthSummary',
    comp: defineAsyncComponent(
      () => import('components/modal/ModalMonthSummary.vue')
    ),
  },

  {
    name: 'showVacation',
    comp: defineAsyncComponent(
      () => import('components/modal/ModalShowVacation.vue')
    ),
  },
];

watch(
  () => modalStore.isShowed,
  () => {
    if (!modalStore.isShowed) return;

    component.value = modalComponents.find(
      (comp) => comp.name === modalStore.modal.component.type
    )?.comp;

    if (!component.value) isButtonDisabled.value = true;
  }
);
</script>
