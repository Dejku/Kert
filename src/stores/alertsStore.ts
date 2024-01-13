import { defineStore } from 'pinia';
import { Alert } from 'components/models';
import alertSound from 'src/assets/audio/alert.mp3';
import { uid } from 'quasar';

export const useAlertsStore = defineStore('alerts', {
    state: () => ({
        alerts: [] as Alert[]
    }),

    actions: {
        async createAlert(data: Omit<Alert, 'id'>) {
            const notificationSound = new Audio(alertSound);
            notificationSound.volume = 0.5;
            await notificationSound.play();

            this.alerts.push({
                id: uid(),
                message: data.message,
                state: data.state,
                duration: data.duration,
            });
        },

        deleteAlert(alert: Alert) {
            const index = this.alerts.indexOf(alert);
            if (index > -1) this.alerts.splice(index, 1);
        },

        formatMessage(message: string): string {
            const messages = [
                { name: 'auth/invalid-credential', value: 'Email lub hasło się nie zgadza' },
                { name: 'auth/invalid-email', value: 'Niepoprawny email' },
                { name: 'auth/weak-password', value: 'Zbyt krótkie hasło' },
                { name: 'auth/email-already-in-use', value: 'Email jest już w użyciu' },
                { name: 'auth/user-not-found', value: 'Konto nie znalezione' },
                { name: 'auth/wrong-password', value: 'Niepoprawne hasło' },
            ]

            return messages.find(ele => JSON.stringify(message).includes(ele.name))?.value as string
        }
    }
});
