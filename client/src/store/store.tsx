import { configureStore, combineReducers } from '@reduxjs/toolkit'
import TodoListReducer, { TodoListState } from './slices/TodoList.slice'
import FormListReducer, { FormListState } from './slices/FormList.slice'

// Root State and Type
export const rootReducer = combineReducers({
  todoList: TodoListReducer,
  formList: FormListReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// Selectors
export const selectTodoList = (root: RootState): TodoListState => root.todoList
export const selectFormList = (root: RootState): FormListState => root.formList

// Store Config
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
})

export type Tstore = typeof store

export default store
