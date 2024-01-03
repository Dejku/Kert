import { defineStore } from 'pinia';
import { useModalStore } from './modalStore';

export const useAppStore = defineStore('app', {
    state: () => ({
        isLogged: false,
        todayDate: new Date(),
        isOverlayShowed: false,
    }),

    actions: {
        closeAllPopUps() {
            const modalStore = useModalStore();

            this.isOverlayShowed = false;
            modalStore.isShowed = false;
            modalStore.clear()
        }
    }
});
