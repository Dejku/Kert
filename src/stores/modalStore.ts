import { defineStore } from 'pinia';
import { fireEvent, waitForEvent } from 'utils';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isShowed: false,
    modal: {} as Modal,

    component: {
      vacationDays: {} as VacationTypes,

      user: {
        displayName: '',
        password: '',
      }
    }
  }),

  actions: {
    async showModal(options: Modal): Promise<AppResponse> {
      this.isShowed = true;
      fireEvent('showOverlay');
      this.modal = options;

      const response = await waitForEvent('modal_userInteraction');
      if (response == null) {
        this.close();

        return { status: 'failed' };
      }
      else return response;
    },

    optionChoosen(status: AppResponse['status']) {
      fireEvent('modal_userInteraction', { status, message: this.modal.component.options });
      this.close();
    },

    close() {
      this.isShowed = false;
      this.clear();
    },

    clear() {
      setTimeout(() => { this.$reset() }, 100);
    },
  }
});
