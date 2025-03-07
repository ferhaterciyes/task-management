export interface TaskFormValues {
    title: string;
    description: string;
    dueDate: string;
    assignedTo: string;
    status: "todo" | "inprogress" | "done";
}
