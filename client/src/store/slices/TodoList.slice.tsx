import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../../types/Todo.type'

export type TodoListState = {
  todos: Todo[]
  complete?: Todo[]
}

export type TodoPayload = {
  todo: Todo
}

const initialState: TodoListState = {
  todos: [],
}

const TodoListSlice = createSlice({
  name: 'TodoList',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoPayload>) {
      const { todo } = action.payload
      const newTodos = state.todos.concat(todo)
      state.todos = newTodos
    },
    removeTodo(state, action: PayloadAction<string>) {
      const todo = action.payload
      const newTodos = state.todos.filter((td) => td.todo !== todo)
      state.todos = newTodos
    },
  },
  extraReducers: {},
})

const TodoListReducer = TodoListSlice.reducer

export const { addTodo, removeTodo } = TodoListSlice.actions

export default TodoListReducer
