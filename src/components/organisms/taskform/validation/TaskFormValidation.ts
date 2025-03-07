import {z} from 'zod';
import {TaskFormValues} from "../types.ts";

    export const TaskFormValidationSchema = z.object({
        title: z.string().nonempty({message: "Başlık zorunludur"}),
        description: z.string().nonempty({message: "Açıklama zorunludur"}),
        dueDate: z.string().nonempty({message: "Bitiş tarihi zorunludur"}),
        assignedTo: z.string().nonempty({message: "Atanan kişi zorunludur"}),
        status: z.enum(["todo", "inprogress", "done"], {message: "Durum zorunludur"}),
    });

    export const defaultValues: TaskFormValues = {
        title: "",
        description: "",
        dueDate: "",
        assignedTo: "",
        status: "todo"
    };
