import { defineStore } from 'pinia';

import { fireEvent } from 'utils';
import { useAccountStore } from 'stores/accountStore';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';

export const usePreferenceStore = defineStore('preferences', {
  state: () => ({
    preference: {
      notification: {
        volume: 0
      },
    } as Preference
  }),

  actions: {
    async fetchPreferenceData(userID: Account['id']) {
      const db = getFirestore();
      const docRef = doc(db, 'preferenceStore', userID);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return console.error('Database error');

      this.preference = docSnap.data().preference;
    },

    async updateDatabase(data: object, waitForEvent: string) {
      const accountStore = useAccountStore();
      const db = getFirestore();
      const docRef = doc(db, 'preferenceStore', accountStore.user.id);

      let status = 'unknown';
      await updateDoc(docRef, data)
        .then(() => status = 'success')
        .catch(() => status = 'error')

      fireEvent(waitForEvent, { status })
    },
  }
});