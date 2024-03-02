import { defineStore } from 'pinia';

type Block = {
    title: string,
    desc: string
}

export const useBlockStore = defineStore('block', {
    state: () => ({
        block: {} as Block
    }),

    getters: {
        isAppBlocked(): boolean {
            return Object.keys(this.block).length !== 0;
        },
    },

    actions: {
        showMessage(message?: AppBlockError) {
            switch (message) {
                case 'app/app-disabled':
                    this.block.title = 'Aplikacja wyłączona';
                    this.block.desc = 'Aplikacja została tymczasowo wyłączona. Spróbuj ponownie póżniej';
                    break;

                case 'app/new-version':
                    this.block.title = 'Nowa wersja';
                    this.block.desc = 'Dostepna jest nowa wersjca aplikacji. Pobierz ją, aby móc dalej z niej korzystać';
                    break;

                case 'auth/user-disabled':
                    this.block.title = 'Konto zablokowane';
                    this.block.desc = 'To konto zostało zablokowane';
                    break;

                default:
                    this.block.title = 'Wystąpił problem';
                    this.block.desc = 'Napotkaliśmy problem podczas uruchamiania aplikacji';
                    break;
            }
        },
    }
});
