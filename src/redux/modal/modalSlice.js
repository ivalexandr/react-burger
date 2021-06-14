import { createSlice } from "@reduxjs/toolkit";
import { getOrderNumber } from "../actions";

const modalSlice = createSlice({
  name:'MODAL',
  initialState:{
    isShowOrder:false,

    status:null,
    order:null,

  },
  reducers:{
    showOrderModal(state, {payload}){
      state.isShowOrder = payload
    },
    removeIngredient(state) {
      state.ingredient = {}
    },
    removeOrder(state){
      state.order = null
    },
  },
  extraReducers:{
    [getOrderNumber.pending]:(state) => {
      state.status = 'loading'
    },
    [getOrderNumber.fulfilled]:(state, {payload}) => {
      state.order = payload?.order?.number
      state.status = 'success'
    },
    [getOrderNumber.rejected]:(state) => {
      state.status = 'failed'
    },
  },
})

export default modalSlice.reducer

export const { showOrderModal, removeIngredient, removeOrder } = modalSlice.actions