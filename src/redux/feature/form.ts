import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { RootState } from 'redux/app'
export type WallInput = {
  id: string
  title: string
  description: string
}
export type TaggingInput = {
  id: string
  content: string
}
type State = {
  wallInput: WallInput
  taggingInput: TaggingInput
}

const initWallInput = (): State['wallInput'] => ({
  id: '',
  title: '',
  description: '',
})

const initTaggingInput = (): State['taggingInput'] => ({
  id: '',
  content: '',
})

const initState = (): State => {
  return {
    wallInput: initWallInput(),
    taggingInput: initTaggingInput(),
  }
}

const formSlice = createSlice({
  name: 'form',
  initialState: initState(),
  reducers: {
    setWallInput: (
      state,
      action: PayloadAction<Partial<State['wallInput']>>
    ) => {
      state.wallInput = { ...state.wallInput, ...action.payload }
    },
    resetWallInput: (state) => {
      state.wallInput = initWallInput()
    },
    setTaggingInput: (
      state,
      action: PayloadAction<Partial<State['taggingInput']>>
    ) => {
      state.taggingInput = { ...state.taggingInput, ...action.payload }
    },
    resetTaggingInput: (state) => {
      state.taggingInput = initTaggingInput()
    },
  },
})

export const {
  setWallInput,
  resetWallInput,
  setTaggingInput,
  resetTaggingInput,
} = formSlice.actions

export const formReducer = formSlice.reducer

export const selectWallInput = () =>
  useSelector((state: RootState) => state.form.wallInput)

export const selectTaggingInput = () =>
  useSelector((state: RootState) => state.form.taggingInput)
