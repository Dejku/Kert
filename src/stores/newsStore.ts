import { defineStore } from 'pinia';

import { useAlertsStore } from 'stores/alertsStore';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { uid } from 'quasar';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as News[]
  }),

  actions: {
    createNews(data: Omit<News, 'id'>) {
      const { createAlert } = useAlertsStore();

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

    async fetchNewsData(userID: Account['id']) {
      const db = getFirestore();
      const docRef = doc(db, 'newsStore', userID);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return console.error('Database error: NewsStore');

      this.news = docSnap.data().news;
    }
  }
});