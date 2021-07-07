import { TObjectIngredient } from './../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IinitialState {
  data: Array<TObjectIngredient>
  bun: TObjectIngredient | null
  isBunEmpty: boolean
}
const initialState = {
  data: [],
  bun: null,
  isBunEmpty:false,
} as IinitialState

const constructorSlice = createSlice({
  name: 'CONSTRUCTOR',
  initialState,
  reducers: {
    pushItem(state, action: PayloadAction<TObjectIngredient>) {
      state.data.push({...action.payload, key:Date.now()})
    },
    setBuns(state, action: PayloadAction<TObjectIngredient>) {
      const index = state.data.findIndex(item => item.type === 'bun')
      if (index !== -1)
        state.data.splice(
          state.data.findIndex(item => item.type === 'bun'),
          1,
          action.payload
        )
      else state.data.push(action.payload)
    },
    setBun(state, action: PayloadAction<TObjectIngredient>) {
      state.bun = action.payload
    },
    sortArray(state, action: PayloadAction<{idFrom: number, idTo: number}>) {
      const { idFrom, idTo } = action.payload
      state.data.splice(idTo, 0, state.data.splice(idFrom, 1)[0])
    },
    removeItem(state, action: PayloadAction<number>) {
      state.data.splice(action.payload, 1)
    },
    checkBunEmpty(state, action: PayloadAction<boolean>){
      state.isBunEmpty = action.payload
    },
    cleanConstructor(state){
      state.data = []
      state.bun = null
    }
  }
})

export default constructorSlice.reducer
export const { pushItem, setBuns, setBun, sortArray, removeItem, checkBunEmpty, cleanConstructor } =
  constructorSlice.actions
