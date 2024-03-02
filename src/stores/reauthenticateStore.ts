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

      const response = await waitForEvent('reauthenticate_userInteraction');
      this.close();

      return response;
    },

    reauthenticate() {
      if (!this.password) return;

      const auth = getAuth();
      const { createAlert, formatMessage } = useAlertStore()

      if (!auth.currentUser || !auth.currentUser.email) return;
      const credential = EmailAuthProvider.credential(auth.currentUser.email, this.password);

      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => fireEvent('reauthenticate_userInteraction', { status: 'success' }))
        .catch((error) => {
          createAlert({
            message: formatMessage(error),
            status: 'error',
            duration: 5,
          });

          this.cancelled();
        });
    },

    cancelled() {
      fireEvent('reauthenticate_userInteraction', { status: 'failed' });
      fireEvent('base__button--loadingComplete');
    },

    close() {
      this.isShowed = false;
      setTimeout(() => { this.$reset() }, 100);
    }
  }
});
