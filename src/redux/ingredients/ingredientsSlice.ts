import { createSlice } from '@reduxjs/toolkit'
import { TObjectIngredient } from '../../types'
import { getIngredients } from '../actions'

export interface IInitialState{
  data: Array<TObjectIngredient>
  status: null | string
  ingredient: TObjectIngredient | null
}

const initialState = {
    data: [],
    status: '',
    ingredient: null
} as IInitialState

const ingredientsSlice = createSlice({
  name: 'INGREDIENTS',
  initialState,
  reducers:{
    getIngredient(state, action){
      state.ingredient = state.data.filter(
        item => item._id === action.payload
      )[0]
    },
    cleanIngredients(state){
      state.ingredient = null
    }
  },
  extraReducers:(builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.status = 'success'
    })
    builder.addCase(getIngredients.rejected, (state) => {
    state.status = 'failed'
    })
  }
})

export default ingredientsSlice.reducer
export const { getIngredient, cleanIngredients } = ingredientsSlice.actions