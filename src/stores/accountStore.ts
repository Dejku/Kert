import { defineStore } from 'pinia';

import { ErrorAlert } from 'models';
import { useAlertStore } from 'stores/alertStore';
import { useResetStore } from 'utils';

import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export const useAccountStore = defineStore('account', {
  state: () => ({
    isLogged: false,
    user: {} as Account
  }),

  getters: {
    getAvatar(): string {
      return this.user.photoURL || 'src/assets/default_avatar.png'
    }
  },

  actions: {
    saveUser(user: Account) {
      this.user = user
    },

    logout() {
      const { createAlert } = useAlertStore();
      const resetStore = useResetStore();
      const auth = getAuth();
      const router = useRouter();

      signOut(auth)
        .then(() => {
          router.push('/loggedOut')

          setTimeout(() => resetStore.all(), 500);
        })
        .catch(() => createAlert(ErrorAlert));
    }
  }
});
