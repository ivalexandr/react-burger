import { createSlice } from '@reduxjs/toolkit'
import { getIngredients, getIngredientsNoModal } from '../actions'

const ingredientsSlice = createSlice({
  name: 'INGREDIENTS',
  initialState: {
    data: [],
    status: null,
    ingredient: {}
  },
  extraReducers: {
    [getIngredients.pending]: state => {
      state.status = 'loading'
    },
    [getIngredients.fulfilled]: (state, { payload }) => {
      state.data = payload.data
      state.status = 'success'
    },
    [getIngredients.rejected]: state => {
      state.status = 'failed'
    },

    [getIngredientsNoModal.pending]: state => {
      state.status = 'loading'
    },
    [getIngredientsNoModal.fulfilled]: (state, { payload }) => {
      state.status = 'success'
      state.ingredient = payload.data.data.filter(
        item => item._id === payload.id
      )[0]
    },
    [getIngredientsNoModal.rejected]: state => {
      state.status = 'failed'
    },
  }
})

export default ingredientsSlice.reducer
