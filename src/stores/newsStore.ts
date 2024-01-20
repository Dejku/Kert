import { defineStore } from 'pinia';

import { useAlertsStore } from 'stores/alertsStore';
const alertsStore = useAlertsStore();
import { uid } from 'quasar';

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [] as News[]
  }),

  actions: {
    createNews(data: Omit<News, 'id'>) {
      this.news.push({
        id: uid(),
        icon: data.icon,
        title: data.title,
        desc: data.desc,
        timestamp: data.timestamp,
        click: data.click
      });

      alertsStore.createAlert({ message: `Masz nowe powiadomienie (${this.news.length})`, status: 'info', duration: 3 })
    },

    deleteNews(id: News['id']) {
      this.news = this.news.filter((ele) => ele.id !== id);
    },
  }
});
