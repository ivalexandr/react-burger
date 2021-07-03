import { createSlice } from "@reduxjs/toolkit";
import { getOrderItem } from "../actions";
const wsSlice = createSlice({
  name:'WS',
  initialState:{
    data:[],
    wsStatus:null,
    total:0,
    totalToday:0,
    item:{},
    statusGetOrder:'',
    order:{}
  },
  reducers:{
    wsConnectionStart(){},
    wsConnectionSuccess(state){
      state.wsStatus = true
      state.error = null
    },
    wsConnectionFailed(state, {payload}){
      state.wsStatus = false
      state.error = payload
    },
    wsConnectionClosed(state, {payload}){
      state.wsStatus = false
      state.data = []
      state.error = payload
    },
    wsGetMessage(state, {payload}){
      state.data = [...payload.orders]
      state.total = +payload.total
      state.totalToday = +payload.totalToday
    },
    wsSendMessage(){},
    wsCloseSocketConnection(state){
      state.data = []
      state.wsStatus = false
    },
  },
  extraReducers:{
    [getOrderItem.pending]:(state) => {
      state.statusGetOrder = 'loading'
    },
    [getOrderItem.fulfilled]:(state, {payload}) => {
      state.statusGetOrder = 'success'
      state.order = payload.orders[0]
      state.item = payload
      
    }
  }
})


export default wsSlice.reducer

export const {wsConnectionClosed, wsConnectionFailed, wsConnectionSuccess, wsGetMessage, wsConnectionStart, wsSendMessage, wsCloseSocketConnection} = wsSlice.actions