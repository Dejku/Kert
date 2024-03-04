import { defineStore } from 'pinia';
import { fireEvent, waitForEvent } from 'utils';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isShowed: false,
    modal: {} as Modal,

    component: {
      vacationDays: {
        name: 'Urlop wypoczynkowy',
        isSpecial: false,
        time: {
          type: 'day',
          hours: 0
        }
      } as VacationTypes,

      user: {
        displayName: '',
        password: '',
      }
    }
  }),

  actions: {
    async showModal(options: Modal): Promise<AppResponse> {
      this.modal = options;
      this.open();

      const response = await waitForEvent('modal_userInteraction');
      this.close();

      return response;
    },

    chooseOption(status: AppResponse['status']) {
      fireEvent('modal_userInteraction', { status, message: this.modal.component.options });
    },

    open() {
      this.isShowed = true;
      fireEvent('showOverlay');
    },

    close() {
      this.isShowed = false;
      fireEvent('hideOverlay');

      setTimeout(() => { this.$reset() }, 100);
    }
  }
});
