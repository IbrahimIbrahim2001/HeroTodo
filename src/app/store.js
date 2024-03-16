import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/Task/tasksSlice"

const store = configureStore({
    reducer: {
        todos: tasksReducer
    }
});

export default store;