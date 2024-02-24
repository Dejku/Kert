import { defineStore } from 'pinia';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useRouter } from 'vue-router';

export const useSupportStore = defineStore('support', {
  state: () => ({
    title: '',
    tableOfContents: [] as TableOfContent[],
    content: [] as MainContent[]
  }),

  actions: {
    async fetchSupportPage(link: string) {
      const db = getFirestore();
      const docRef = doc(db, 'supportStore', link);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return;
      const router = useRouter();

      this.title = docSnap.data().title;
      this.tableOfContents = docSnap.data().tableOfContents;
      this.content = docSnap.data().content;
      router.push(`/support/${link}`);
    }
  }
});
