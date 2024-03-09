import { defineStore } from 'pinia';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { useAccountStore } from 'stores/accountStore';

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        sets: [] as SetOfTasks[]
    }),

    getters: {
        getSetById() {
            return (id: SetOfTasks['id']): SetOfTasks | undefined => this.sets.find((set) => set.id === id);
        },

        countCompletedTasks() {
            return (tasks: SetOfTasks['tasks']): number => tasks.filter((task: Task) => task.isCompleted).length;
        }
    },

    actions: {
        async createSet(newSet: SetOfTasks): Promise<AppResponse> {
            const accountStore = useAccountStore();
            const db = getFirestore();

            newSet.tasks.forEach(task => task.label = task.label.trim());
            newSet.tasks = newSet.tasks.filter(task => task.label != '');

            this.sets.push(newSet);

            await updateDoc(doc(db, 'taskStore', accountStore.getID), {
                sets: this.sets
            })

            return { status: 'success' };
        },

        async updateSet(set: SetOfTasks): Promise<AppResponse> {
            const accountStore = useAccountStore();
            const db = getFirestore();

            const index = this.sets.indexOf(set);
            if (set.label.length < 3) set.label = 'Nazwa listy';
            this.sets[index] = set;

            await updateDoc(doc(db, 'taskStore', accountStore.getID), {
                sets: this.sets
            })

            return { status: 'success' };
        },

        async deleteSet(set: SetOfTasks): Promise<AppResponse> {
            const accountStore = useAccountStore();
            const db = getFirestore();

            const index = this.sets.indexOf(set);
            if (index > -1) this.sets.splice(index, 1);

            await updateDoc(doc(db, 'taskStore', accountStore.getID), {
                sets: this.sets
            })

            return { status: 'success' };
        }
    }
});
