export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    assignedTo: string;
    status: "todo" | "inprogress" | "done";
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

export interface User {
    uid: string;
    email: string;
    displayName: string;
    tcKimlikNo: string;
    role: 'user' | 'admin';
}
