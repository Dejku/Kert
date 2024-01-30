import { defineStore } from 'pinia';
import { useModalStore } from 'stores/modalStore';
import { useDialogStore } from 'stores/dialogStore';
import { useVacationStore } from 'stores/vacationStore';
import { useNewsStore } from 'stores/newsStore';
import { useAccountStore } from 'stores/accountStore';
import { usePreferenceStore } from 'stores/preferenceStore';

export const useAppStore = defineStore('app', {
    state: () => ({
        todayDate: new Date(),
        isOverlayShowed: false,
    }),

    actions: {
        closeAllPopUps() {
            const modalStore = useModalStore();
            const dialogStore = useDialogStore();

            this.isOverlayShowed = false;
            modalStore.clear();
            dialogStore.clear();
        },

        async fetchData() {
            const accountStore = useAccountStore();
            const vacationStore = useVacationStore();
            const newsStore = useNewsStore();
            const preferenceStore = usePreferenceStore()

            await vacationStore.fetchCalendarData(accountStore.user.id);
            await newsStore.fetchNewsData(accountStore.user.id);
            await preferenceStore.fetchPreferenceData(accountStore.user.id);
        }
    }
});
