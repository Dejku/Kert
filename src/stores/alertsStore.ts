import { defineStore } from 'pinia';
import { Alert } from 'components/models';
import alertSound from 'src/assets/audio/alert.mp3';
import { uid } from 'quasar';

export const useAlertsStore = defineStore('alerts', {
    state: () => ({
        alerts: [] as Alert[]
    }),

    actions: {
        async createAlert(message: Alert['message'], state: Alert['state'], duration?: Alert['duration']) {
            const notificationSound = new Audio(alertSound);
            notificationSound.volume = 0.5;
            await notificationSound.play();

            this.alerts.push({
                id: uid(),
                message,
                state,
                duration: duration || 5,
            });
        },

        deleteAlert(alert: Alert) {
            const index = this.alerts.indexOf(alert);
            if (index > -1) this.alerts.splice(index, 1);
        },
    }
});
