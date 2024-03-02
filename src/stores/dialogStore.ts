import { defineStore } from 'pinia';
import { fireEvent, waitForEvent } from 'utils';

export const useDialogStore = defineStore('dialog', {
    state: () => ({
        isShowed: false,
        dialog: {} as Dialog
    }),

    actions: {
        async showDialog(options: Dialog): Promise<AppResponse> {
            this.dialog = options;
            this.open();

            const response = await waitForEvent('dialog_userInteraction');
            this.close();

            return response;
        },

        chooseOption(status: AppResponse['status']) {
            fireEvent('dialog_userInteraction', { status });
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
