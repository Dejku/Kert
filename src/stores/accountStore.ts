import { defineStore } from 'pinia';

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
      this.isLogged = true;
      this.user = user;

      console.log('saveUser');
    },
  }
});
