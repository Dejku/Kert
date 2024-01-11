import { defineStore } from 'pinia';
import { Account } from 'components/models';

export const useAccountStore = defineStore('account', {
  state: () => ({
    isLogged: false,
    user: {} as Account
  }),

  getters: {
    getAvatar(): string {
      return this.user.photoURL || '../src/assets/default_avatar.png'
    }
  },

  actions: {
    saveUser(user: Account) {
      this.user = user
    }
  }
});
