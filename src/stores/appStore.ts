import { defineStore } from 'pinia';
import { useModalStore } from './modalStore';
import { useDialogStore } from './dialogStore';
import { useVacationStore } from './vacationStore';

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

        fetchData() {
            const vacationStore = useVacationStore();

            vacationStore.saveCalendarData()
        }
    }
});
