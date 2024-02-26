import { defineStore } from 'pinia';

import alertSound from 'assets/audio/alert.mp3';
import { usePreferenceStore } from 'stores/preferenceStore';
import { uid } from 'quasar';

const notificationSound = new Audio(alertSound);
notificationSound.volume = 0.5;

export const useAlertStore = defineStore('alerts', {
    state: () => ({
        alerts: [] as Alert[],
        headerAlerts: [] as HeaderAlert[]
    }),

    actions: {
        async createAlert(data: Alert) {
            const preferenceStore = usePreferenceStore();
            const notificationVolume = preferenceStore.preference.notification.volume || 0;

            if (data.status == 'error') data.isImportant = true
            if (notificationVolume == 2 && !data.isImportant) return;

            this.alerts.push({
                id: data.id || uid(),
                message: data.message,
                status: data.status,
                duration: data.duration,
                userCanHide: data.userCanHide,
            });

            if (notificationVolume == 0) await notificationSound.play();
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

        formatMessage(message: string): string {
            const messages = [
                { name: 'auth/invalid-credential', value: 'Email lub hasło się nie zgadza' },
                { name: 'auth/invalid-email', value: 'Niepoprawny email' },
                { name: 'auth/weak-password', value: 'Zbyt krótkie hasło (min. 6 znaków)' },
                { name: 'auth/email-already-in-use', value: 'Email jest już w użyciu' },
                { name: 'auth/user-not-found', value: 'Konto nie zostało znalezione' },
                { name: 'auth/wrong-password', value: 'Niepoprawne hasło' },
            ]

            return messages.find(ele => JSON.stringify(message).includes(ele.name))?.value as string || 'Coś poszło nie tak'
        }
    }
});
