import { TObjectOrder } from './../../types';
import { createSlice } from "@reduxjs/toolkit";
import { getOrderItem } from "../actions";

interface IinitialState{
  data:Array<TObjectOrder>
  wsStatus: boolean
  total: number
  totalToday: number
  statusGetOrder: string
  order: TObjectOrder | null
  error?: any
}

const initialState = {
    data:[],
    wsStatus:false,
    total:0,
    totalToday:0,
    statusGetOrder:'',
    order:null
} as IinitialState

const wsSlice = createSlice({
  name:'WS',
  initialState,
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
  extraReducers: (builder) => {
    builder.addCase(getOrderItem.pending, (state) => {
      state.statusGetOrder = 'loading'
    })
    builder.addCase(getOrderItem.fulfilled, (state, action) => {
      state.statusGetOrder = 'success'
      state.order = action.payload.orders[0]
    })
  }
})


export default wsSlice.reducer

export const {wsConnectionClosed, wsConnectionFailed, wsConnectionSuccess, wsGetMessage, wsConnectionStart, wsSendMessage, wsCloseSocketConnection} = wsSlice.actions