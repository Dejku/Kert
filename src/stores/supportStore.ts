import { defineStore } from 'pinia';

export const useSupportStore = defineStore('support', {
  state: () => ({
    title: '',
    tableOfContents: [] as TableOfContent[],
    content: [] as MainContent[]
  }),
});
