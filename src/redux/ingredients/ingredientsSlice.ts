import { createSlice } from '@reduxjs/toolkit'
import { TObjectIngredient } from '../../types'
import { getIngredients, getIngredientsNoModal } from '../actions'

interface IInitialState{
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
  reducers:{},
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
    builder.addCase(getIngredientsNoModal.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getIngredientsNoModal.fulfilled, (state, action) => {
      state.status = 'success'
      state.ingredient = action.payload.data.data.filter(
        item => item._id === action.payload.id
      )[0]
    })
    builder.addCase(getIngredientsNoModal.rejected, (state) => {
    state.status = 'failed'
    })
  }
})

export default ingredientsSlice.reducer
