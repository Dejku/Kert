import { defineStore } from 'pinia';

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        sets: [
            {
                id: '1',
                ownerID: 'dsadsa',
                label: 'coś',
                color: null,
                sharedIn: null,
                tasks: [],
            },
            {
                id: '2',
                ownerID: 'dsadsa',
                label: 'praca',
                color: 'primary',
                sharedIn: null,
                tasks: [],
            },
            {
                id: '3',
                ownerID: 'dsadsa',
                label: 'sport',
                color: null,
                sharedIn: null,
                tasks: [],
            },
            {
                id: '4',
                ownerID: 'dsadsa',
                label: 'lista zakupów',
                color: 'success',
                sharedIn: null,
                tasks: [],
            },
            {
                id: '5',
                ownerID: 'dsadsa',
                label: 'naprawa auta',
                color: 'info',
                sharedIn: null,
                tasks: [],
            },
        ] as SetOfTasks[]
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
        createSet(newSet: SetOfTasks): AppResponse {
            newSet.tasks.forEach(task => task.label = task.label.trim());
            newSet.tasks = newSet.tasks.filter(task => task.label != '');

            this.sets.push(newSet);

            return { status: 'success' };
        },
        deleteSet(id: SetOfTasks['id']): AppResponse {
            const set = this.getSetById(id);
            if (!set) return { status: 'failed', message: 'Set not found' };

            const index = this.sets.indexOf(set);
            if (index > -1) this.sets.splice(index, 1);

            return { status: 'success' };
        }
    }
});
