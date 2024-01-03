import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => ({
    id: '0',
    accountName: 'john',
    nickName: 'Johnny',
  }),

  getters: {
    getAccountName(): string {
      return '@' + this.accountName;
    },
    getAvatar(): string {
      return '../src/assets/default_avatar.png'
    }
  },
});
