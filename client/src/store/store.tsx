import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AuthReducer, { AuthState } from './slices/Auth.slice'
import FormListReducer, { FormListState } from './slices/FormList.slice'

// Root State and Type
export const rootReducer = combineReducers({
  formList: FormListReducer,
  auth: AuthReducer,
})

export type RootState = ReturnType<typeof rootReducer>

// Selectors
export const selectFormList = (root: RootState): FormListState => root.formList
export const selectAuth = (root: RootState): AuthState => root.auth
// Store Config
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
})

export type Tstore = typeof store

export default store
