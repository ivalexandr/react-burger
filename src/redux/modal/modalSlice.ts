import { createSlice } from "@reduxjs/toolkit";
import { getOrderNumber } from "../actions";

interface IinitialState{
  isShowOrder: boolean
  status: string
  order: number
}

const initialState = {
    isShowOrder:false,

    status:'',
    order:0,
} as IinitialState

const modalSlice = createSlice({
  name:'MODAL',
  initialState,
  reducers:{
    showOrderModal(state, {payload}){
      state.isShowOrder = payload
    },
    removeOrder(state){
      state.order = 0
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderNumber.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getOrderNumber.fulfilled, (state, action) => {
      state.order = action.payload?.order?.number
      state.status = 'success'
    })
    builder.addCase(getOrderNumber.rejected, (state) => {
      state.status = 'failed'
    })
  },
})

export default modalSlice.reducer

export const { showOrderModal, removeOrder } = modalSlice.actions