import { defineStore } from 'pinia';

import { fireEvent, waitForEvent } from 'utils';
import { useAlertStore } from 'stores/alertStore';
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';

export const useReauthenticateStore = defineStore('reauthenticate', {
  state: () => ({
    isShowed: false,
    password: '',
    passwordError: true,
  }),

  actions: {
    async askForReauthenticate(): Promise<AppResponse> {
      this.isShowed = true;

      return await waitForEvent('reauthenticate_userInteraction');
    },

    reauthenticate() {
      if (this.password) return;
      const auth = getAuth();
      const { createAlert, formatMessage } = useAlertStore()

      if (!auth.currentUser || !auth.currentUser.email) return;
      const credential = EmailAuthProvider.credential(auth.currentUser.email, this.password);

      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          fireEvent('reauthenticate_userInteraction', { status: 'success' });
          this.close();
        })
        .catch((error) => {
          createAlert({
            message: formatMessage(error),
            status: 'error',
            duration: 5,
          });

          fireEvent('base__button--loadingComplete');
          this.canceled();
        });
    },

    canceled() {
      fireEvent('reauthenticate_userInteraction', { status: 'failed' });
      this.close();
    },

    close() {
      this.isShowed = false;
      this.clear();
    },

    clear() {
      setTimeout(() => { this.$reset() }, 100);
    },
  }
});
