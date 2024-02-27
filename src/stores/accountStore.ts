import { defineStore } from 'pinia';

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: {} as User
  }),

  getters: {
    isLogged(): boolean {
      return Object.keys(this.user).length !== 0;
    },

    getID(): string {
      return this.user.id;
    },

    getDisplayName(): string | undefined {
      return this.user.displayName || undefined;
    },

    getAvatar(): string | undefined {
      return this.user.photoURL || undefined;
    }
  },

  actions: {
    saveUser(user: User) {
      this.user = user;
    },

    setDisplayName(displayName: string) {
      this.user.displayName = displayName;
    },

    setAvatar(photoURL: string) {
      this.user.photoURL = photoURL;
    }
  }
});
