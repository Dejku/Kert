import { defineStore } from 'pinia';
import { fireEvent, waitForEvent } from 'utils';
import { useAppStore } from 'stores/appStore';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isShowed: false,
    modal: {
      title: 'Brak tytułu',
      component: {
        type: undefined,
        options: {
          date: {
            day: 0,
            month: 0,
            year: 0
          },
        }
      },
      buttons: {
        baseButton: {
          label: 'Okej',
          color: undefined,
          transparent: true,
        },
        secondaryButton: {
          label: undefined,
          color: undefined,
          transparent: undefined,
        },
        isDisabled: true,
      }
    } as ModalStructure,

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
    async showModal(options: ModalOption): Promise<AppResponse> {
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
        if (options.buttonsOptions.secondaryButton) this.modal.buttons.secondaryButton = options.buttonsOptions.secondaryButton;
      }

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
