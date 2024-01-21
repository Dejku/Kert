import { defineStore } from 'pinia';
import { useModalStore } from 'stores/modalStore';
import { useDialogStore } from 'stores/dialogStore';
import { useVacationStore } from 'stores/vacationStore';
import { useNewsStore } from 'stores/newsStore';
import { useAccountStore } from 'stores/accountStore';

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
            const accountStore = useAccountStore();
            const vacationStore = useVacationStore();
            const newsStore = useNewsStore();

            vacationStore.fetchCalendarData(accountStore.user.id);
            newsStore.fetchNewsData(accountStore.user.id);
        }
    }
});
