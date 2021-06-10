import { createSlice } from "@reduxjs/toolkit";
import {getIngredients} from '../actions'


const ingredientsSlice = createSlice({
  name:'INGREDIENTS',
  initialState:{
    data:[],
    status:null,

  },
  extraReducers:{
    [getIngredients.pending]:(state) => {
        state.status = 'loading'
    },
    [getIngredients.fulfilled]:(state, {payload}) => {
        state.data = payload.data
        state.status = 'success'
    },
    [getIngredients.reject]:(state) => {
        state.status = 'failed'
    }
  },
})

export default ingredientsSlice.reducer