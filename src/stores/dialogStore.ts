import { defineStore } from 'pinia';
import { fireEvent, waitForEvent } from 'utils';
import { useAppStore } from 'stores/appStore';

export const useDialogStore = defineStore('dialog', {
    state: () => ({
        isShowed: false,
        dialog: {
            title: 'Brak nagłówka',
            desc: undefined,
            buttons: {
                baseButton: {
                    label: 'Okej',
                    color: undefined,
                    transparent: true
                },
                extendedButton: {
                    label: undefined,
                    color: undefined,
                    transparent: undefined
                }
            }
        } as DialogStructure
    }),

    actions: {
        async showDialog(options: DialogOption): Promise<AppResponse> {
            this.isVisible(true);

            this.dialog.title = options.title;
            this.dialog.desc = options.desc;

            if (options.buttonsOptions) {
                if (options.buttonsOptions.baseButton) this.dialog.buttons.baseButton = options.buttonsOptions.baseButton;
                if (options.buttonsOptions.extendedButton) this.dialog.buttons.extendedButton = options.buttonsOptions.extendedButton;
            }

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
