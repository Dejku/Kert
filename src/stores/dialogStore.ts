import { defineStore } from 'pinia';
import { fireEvent, waitForEvent } from 'utils';
import { useAppStore } from 'stores/appStore';

export const useDialogStore = defineStore('dialog', {
    state: () => ({
        isShowed: false,
        dialog: {} as Dialog
    }),

    actions: {
        async showDialog(options: Dialog): Promise<AppResponse> {
            this.isVisible(true);
            this.dialog = options;

            return await waitForEvent('dialog_userInteraction');
        },

        optionChoosen(status: AppResponse['status']) {
            fireEvent('dialog_userInteraction', { status });
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
