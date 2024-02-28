import { defineStore } from 'pinia';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

export const useSupportStore = defineStore('support', {
    state: () => ({
        links: [] as SupportLink[],
        pages: [] as SupportPage[]
    }),

    getters: {
        getPage: (state) => {
            return (link: string): SupportPage | undefined => state.pages.find(page => page.link == link);
        },
    },

    actions: {
        async fetchLinks() {
            if (this.links.length) return;

            console.log(this.links.length);

            const db = getFirestore();
            const docRef = doc(db, 'supportStore', 'supportLinks');
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) return;

            this.links = docSnap.data().links;
        },

        async changePage(link: string): Promise<boolean> {
            const db = getFirestore();
            const docRef = doc(db, 'supportStore', link);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) return false;

            const page = {
                link: link,
                title: docSnap.data().title,
                tableOfContents: docSnap.data().tableOfContents,
                content: docSnap.data().content,
            }

            this.pages.push(page);

            return true;
        }
    }
});
