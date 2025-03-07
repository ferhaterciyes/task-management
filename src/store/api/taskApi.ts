import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Task } from '../types';

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], { userId: string; isAdmin: boolean }>({
            async queryFn({ userId, isAdmin }) {
                try {
                    const tasksRef = collection(db, "tasks");
                    const q = isAdmin 
                        ? query(tasksRef)
                        : query(tasksRef, where("createdBy", "==", userId));
                    
                    const querySnapshot = await getDocs(q);
                    const tasks = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as Task[];
                    
                    return { data: tasks };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            providesTags: ['Tasks']
        }),

        createTask: builder.mutation<Task, Omit<Task, "id">>({
            async queryFn(taskData) {
                try {
                    const docRef = await addDoc(collection(db, "tasks"), taskData);
                    const newTask = { id: docRef.id, ...taskData } as Task;
                    return { data: newTask };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            invalidatesTags: ['Tasks']
        }),

        updateTask: builder.mutation<Task, { id: string; changes: Partial<Task> }>({
            async queryFn({ id, changes }) {
                try {
                    const taskRef = doc(db, "tasks", id);
                    const updateData = {
                        ...changes,
                        updatedAt: new Date().toISOString()
                    };
                    await updateDoc(taskRef, updateData);
                    return { data: { id, ...updateData } as Task };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            invalidatesTags: ['Tasks']
        }),

        deleteTask: builder.mutation<string, string>({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(db, "tasks", id));
                    return { data: id };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            invalidatesTags: ['Tasks']
        }),

        updateTaskStatus: builder.mutation<Task, { id: string; currentStatus: string }>({
            async queryFn({ id, currentStatus }) {
                try {
                    const statusMap = {
                        'todo': 'inprogress',
                        'inprogress': 'done',
                        'done': 'todo'
                    } as const;

                    const newStatus = statusMap[currentStatus as keyof typeof statusMap];
                    const updateData = {
                        status: newStatus,
                        updatedAt: new Date().toISOString()
                    };

                    const taskRef = doc(db, "tasks", id);
                    await updateDoc(taskRef, updateData);
                    
                    return { data: { id, ...updateData } as Task };
                } catch (error: any) {
                    return { error: error.message };
                }
            },
            invalidatesTags: ['Tasks']
        })
    })
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskStatusMutation
} = taskApi; 