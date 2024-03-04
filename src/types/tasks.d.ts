type SetOfTasks = {
    id: string;
    ownerID: User['id'];
    label: string;
    color: AppColors | null;
    sharedIn: Group | null
    tasks: Task[];
};

type Task = {
    id: string;
    label: string;
    isCompleted: boolean;
    addedBy: User['id'];
};