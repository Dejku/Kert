import { defineStore } from 'pinia';
import { fireEvent, waitForEvent } from 'utils';
import { useAppStore } from 'stores/appStore';

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
      this.isVisible(true);
      this.modal = options;

      return await waitForEvent('modal_userInteraction');
    },

    optionChoosen(status: AppResponse['status']) {
      fireEvent('modal_userInteraction', { status, message: this.modal.component.options });
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
      setTimeout(() => { this.$reset() }, 100);
    },
  }
});
