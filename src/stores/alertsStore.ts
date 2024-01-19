import { defineStore } from 'pinia';
import alertSound from 'assets/audio/alert.mp3';
import { uid } from 'quasar';

const notificationSound = new Audio(alertSound);
notificationSound.volume = 0.5;

export const useAlertsStore = defineStore('alerts', {
    state: () => ({
        scaleAlertID: '',
        alerts: [] as Alert[],
        headerAlerts: [] as HeaderAlert[]
    }),

    actions: {
        createAlert(data: Alert) {
            this.alerts.push({
                id: data.id || uid(),
                message: data.message,
                status: data.status,
                duration: data.duration,
            });

            notificationSound.play();
        },

        deleteAlert(alert: Alert) {
            const index = this.alerts.indexOf(alert);
            if (index > -1) this.alerts.splice(index, 1);
        },

        deleteAlertByID(id: Alert['id']) {
            this.alerts = this.alerts.filter((ele) => ele.id !== id);
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

        scaleAlert(id: Alert['id']) {
            if (!id) return;

            this.scaleAlertID = id;
            notificationSound.play();

            setTimeout(() => this.scaleAlertID = '', 200)
        },

        formatMessage(message: string): string {
            const messages = [
                { name: 'auth/invalid-credential', value: 'Email lub hasło się nie zgadza' },
                { name: 'auth/invalid-email', value: 'Niepoprawny email' },
                { name: 'auth/weak-password', value: 'Zbyt krótkie hasło (min. 6 znaków)' },
                { name: 'auth/email-already-in-use', value: 'Email jest już w użyciu' },
                { name: 'auth/user-not-found', value: 'Konto nie zostało znalezione' },
                { name: 'auth/wrong-password', value: 'Niepoprawne hasło' },
            ]

            return messages.find(ele => JSON.stringify(message).includes(ele.name))?.value as string
        }
    }
});
