import { defineStore } from 'pinia';

import { useModalStore } from 'stores/modalStore';
import { useDialogStore } from 'stores/dialogStore';
import { useVacationStore } from 'stores/vacationStore';
import { useNewsStore } from 'stores/newsStore';
import { useAccountStore } from 'stores/accountStore';
import { usePreferenceStore } from 'stores/preferenceStore';

let clock: string | number | NodeJS.Timeout | undefined;
export const useAppStore = defineStore('app', {
    state: () => ({
        todayDate: new Date(),
        isOverlayShowed: false,
    }),

    actions: {
        startClock() {
            clock = setInterval(() => this.todayDate = new Date(), 1000);
        },

        stopClock() {
            clearInterval(clock)
        },

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

            await vacationStore.fetchCalendarData(accountStore.getID);
            await newsStore.fetchNewsData(accountStore.getID);
            await preferenceStore.fetchPreferenceData(accountStore.getID);
        }
    }
});
