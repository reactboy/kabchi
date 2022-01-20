import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { RootState } from 'redux/app'

type State = {
  uid: string | null
  isLoading: boolean
}
const initState = (): State => ({
  uid: null,
  isLoading: true,
})

const authSlice = createSlice({
  name: 'auth',
  initialState: initState(),
  reducers: {
    setUid: (state, action: PayloadAction<State['uid']>) => {
      const uid = action.payload
      state.uid = uid
      return state
    },
    setAuthLoading: (state, action: PayloadAction<State['isLoading']>) => {
      const isLoading = action.payload
      state.isLoading = isLoading
      return state
    },
  },
})

export const { setUid, setAuthLoading } = authSlice.actions
export const authReducer = authSlice.reducer

export const selectAuth = () => useSelector((state: RootState) => state.auth)
export const selectUid = () => useSelector((state: RootState) => state.auth.uid)
export const selectAuthLoading = () =>
  useSelector((state: RootState) => state.auth.isLoading)
