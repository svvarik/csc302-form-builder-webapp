import { createSlice } from '@reduxjs/toolkit'

export type AuthState = {
  user: 'DOCTOR' | 'DATA_ADMIN'
}

const initialState: AuthState = {
  user: 'DATA_ADMIN',
}

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    toggleUser(state) {
      if (state.user === 'DOCTOR') {
        state.user = 'DATA_ADMIN'
      } else {
        state.user = 'DOCTOR'
      }
    },
  },
  extraReducers: {},
})

const AuthReducer = AuthSlice.reducer

export const { toggleUser } = AuthSlice.actions

export default AuthReducer
