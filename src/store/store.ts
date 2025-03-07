import {configureStore} from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";
import { taskApi } from "./api/taskApi";


export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(taskApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
