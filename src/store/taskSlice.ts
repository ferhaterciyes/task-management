import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {Task, TaskState} from "./types";
import {collection, addDoc, deleteDoc, doc, updateDoc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase/firebaseConfig";

const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null
};

// Thunk actions
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async ({userId, isAdmin}: {userId: string; isAdmin: boolean}) => {
        try {
            const tasksRef = collection(db, "tasks");
            let q = isAdmin ? query(tasksRef) : query(tasksRef, where("createdBy", "==", userId));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Task[];
        } catch (error) {
            throw error;
        }
    }
);

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (taskData: Omit<Task, "id">) => {
        const docRef = await addDoc(collection(db, "tasks"), taskData);
        return {id: docRef.id, ...taskData} as Task;
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({taskId, taskData}: {taskId: string; taskData: Partial<Task>}) => {
        const taskRef = doc(db, "tasks", taskId);
        const updatedData = {
            ...taskData,
            updatedAt: new Date().toISOString()
        };
        await updateDoc(taskRef, updatedData);
        return {id: taskId, ...updatedData} as Task;
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId: string) => {
        await deleteDoc(doc(db, "tasks", taskId));
        return taskId;
    }
);

export const toggleTaskStatus = createAsyncThunk(
    'tasks/toggleTaskStatus',
    async (taskId: string, {getState}: any) => {
        const state = getState();
        const task = state.tasks.tasks.find((t: Task) => t.id === taskId);

        if (!task) throw new Error('Task not found');

        const statusMap = {
            'todo': 'inprogress',
            'inprogress': 'done',
            'done': 'todo'
        } as const;

        const newStatus = statusMap[task.status as keyof typeof statusMap];
        const taskRef = doc(db, "tasks", taskId);

        await updateDoc(taskRef, {
            status: newStatus,
            updatedAt: new Date().toISOString()
        });

        return {
            ...task,
            status: newStatus,
            updatedAt: new Date().toISOString()
        };
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearTasks: (state) => {
            state.tasks = [];
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Görevler yüklenirken bir hata oluştu';
            })
            // Add Task
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            // Update Task
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            // Delete Task
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            // Toggle Task Status
            .addCase(toggleTaskStatus.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            });
    }
});

export const {clearTasks} = taskSlice.actions;
export default taskSlice.reducer;

