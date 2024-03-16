import { createSlice } from "@reduxjs/toolkit";
import { addToLocalStorage, deleteTaskFromLocalStorage, editTodoStatusInLocalStorage, editTodoTextInLocalStorage, retrieveTodosFromLocalStorage } from "../../localStorage/localStorage";


let savedTodos = retrieveTodosFromLocalStorage();


const initialState = {
  todos: savedTodos ? JSON.parse(savedTodos) : [],
};
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.todos.unshift(action.payload);
      addToLocalStorage(state.todos);
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter(todo => todo.id != id);
      deleteTaskFromLocalStorage(id);
      //another way not fix yet the localStorage || in Todo you have to pass the (index) to the delete button
      // const index = action.payload;
      // state.todos = state.todos.filter((i, eleIndex) => eleIndex !== index);
    },
    editTask: (state, action) => {
      const { index, todo } = action.payload;
      state.todos[index] = todo;
      editTodoTextInLocalStorage(index, todo);
    },
    toggleTodo: (state, action) => {
      const index = action.payload
      state.todos[index].status = state.todos[index].status === "in progress" ? "complated" : "in progress";
      editTodoStatusInLocalStorage(index, state.todos[index]);
    },
    reorderTodos: (state, action) => {
      state.todos = action.payload;
      addToLocalStorage(state.todos);
    }
  },
});

export default tasksSlice.reducer;
export const { addTask, deleteTask, editTask, toggleTodo, reorderTodos } = tasksSlice.actions;
