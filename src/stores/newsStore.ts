import { defineStore } from 'pinia';

import { useAlertStore } from 'stores/alertStore';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { uid } from 'quasar';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as News[]
  }),

  actions: {
    createNews(data: Omit<News, 'id'>) {
      const { createAlert } = useAlertStore();

      this.news.push({
        id: uid(),
        icon: data.icon,
        title: data.title,
        desc: data.desc,
        timestamp: data.timestamp,
        click: data.click
      });

      createAlert({ message: `Masz nowe powiadomienie (${this.news.length})`, status: 'info', duration: 3 })
    },

    deleteNews(id: News['id']) {
      this.news = this.news.filter((ele) => ele.id !== id);
    },

    async fetchNewsData(userID: User['id']) {
      const db = getFirestore();
      const docRef = doc(db, 'newsStore', userID);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return;

      this.news = docSnap.data().news;
    }
  }
});
