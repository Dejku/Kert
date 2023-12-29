import { defineStore } from 'pinia';
import { fireEvent, waitForInteraction } from 'components/utils';
import { ModalStructure, ModalOption, CustomResponse } from 'components/models';
import { useAppStore } from './appStore';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isShowed: false,
    modal: {
      title: undefined,
      component: {
        type: undefined,
      },
      buttons: {
        baseButton: {
          label: 'Okej',
          color: 'onBackground',
          transparent: true
        },
      }
    } as ModalStructure
  }),

  actions: {
    async showModal(options: ModalOption): Promise<CustomResponse> {
      this.isVisible(true);

      this.modal.component = options.component;
      if (options.title)
        this.modal.title = options.title;
      else
        this.modal.title =
          options.component.type == 'addVacation' ? 'Dodaj urlop' :
            options.component.type == 'showVacation' ? 'Szczegóły urlopu' : 'Brak tytułu';

      if (options.buttonsOptions) {
        if (options.buttonsOptions.baseButton) this.modal.buttons.baseButton = options.buttonsOptions.baseButton;
        if (options.buttonsOptions.extendedButton) this.modal.buttons.extendedButton = options.buttonsOptions.extendedButton;
      }

      return await waitForInteraction('modal_userInteraction', true);
    },

    optionChoosen(status: CustomResponse['status']) {
      fireEvent('modal_userInteraction', { status, message: this.modal.component.details });
      this.close();
    },

    isVisible(isShowed: boolean) {
      const appStore = useAppStore();

      this.isShowed = isShowed;
      appStore.isOverlayShowed = isShowed;
    },

    close() {
      this.isVisible(false);
      this.clear();
    },

    clear() {
      this.$reset();
    },
  }
});
