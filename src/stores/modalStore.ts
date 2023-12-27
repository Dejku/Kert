import { defineStore } from 'pinia';
import { fireEvent } from 'components/utils';

interface ModalOption {
  type: 'monthSummary' | 'addVacation' | 'showVacation',
  title?: string,
  options?: string,
  buttonsOptions?: ButtonsOptions
}

interface ButtonsOptions {
  baseButton: {
    label: string,
  },
  extendedButton?: {
    visible: boolean,
    label: string | undefined,
    color: string | undefined
  }
}

export const useModalStore = defineStore('modal', {
  state: () => ({
    isShowed: false,
    modal: {
      title: '',
      component: '',
      buttons:
      {
        baseButton: {
          label: 'Okej',
        },
        extendedButton: {
          visible: false,
          label: undefined,
          color: undefined
        }
      }
    }
  }),

  actions: {
    showModal(options: ModalOption) {
      this.isShowed = true;
      fireEvent('showOverlay', true);

      this.modal.component = options.type;
    },

    hideModal() {
      fireEvent('showOverlay', false);
      this.close();
    },

    close() {
      this.isShowed = false;
      this.clear();
    },

    clear() {
      this.$reset();
    },
  }
});
