import { defineStore } from 'pinia';
import { Alert, HeaderAlert } from 'components/models';
import alertSound from 'src/assets/audio/alert.mp3';
import { uid } from 'quasar';

const notificationSound = new Audio(alertSound);
notificationSound.volume = 0.5;

export const useAlertsStore = defineStore('alerts', {
    state: () => ({
        alerts: [] as Alert[],
        headerAlerts: [] as HeaderAlert[]
    }),

    actions: {
        createAlert(data: Omit<Alert, 'id'>) {
            this.alerts.push({
                id: uid(),
                message: data.message,
                state: data.state,
                duration: data.duration,
            });

            notificationSound.play();
        },

        deleteAlert(alert: Alert) {
            const index = this.alerts.indexOf(alert);
            if (index > -1) this.alerts.splice(index, 1);
        },

        createHeaderAlert(data: HeaderAlert) {
            this.headerAlerts.push({
                id: data.id,
                icon: data.icon,
            });
        },

        deleteHeaderAlert(id: HeaderAlert['id']) {
            this.headerAlerts = this.headerAlerts.filter((ele) => ele.id !== id);
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
