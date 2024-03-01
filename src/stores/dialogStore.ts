import { defineStore } from 'pinia';
import { fireEvent, waitForEvent } from 'utils';

export const useDialogStore = defineStore('dialog', {
    state: () => ({
        isShowed: false,
        dialog: {} as Dialog
    }),

    actions: {
        async showDialog(options: Dialog): Promise<AppResponse> {
            this.isShowed = true;
            fireEvent('showOverlay');
            this.dialog = options;

            const response = await waitForEvent('dialog_userInteraction');
            if (response == null) {
                this.close();

                return { status: 'failed' };
            }
            else return response;
        },

        optionChoosen(status: AppResponse['status']) {
            fireEvent('dialog_userInteraction', { status });
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
