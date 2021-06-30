import { createSlice } from "@reduxjs/toolkit";

const wsSlice = createSlice({
  name:'WS',
  initialState:{
    data:[],
    wsStatus:null,
    total:0,
    totalToday:0,
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
  }
})


export default wsSlice.reducer

export const {wsConnectionClosed, wsConnectionFailed, wsConnectionSuccess, wsGetMessage, wsConnectionStart, wsSendMessage, wsCloseSocketConnection} = wsSlice.actions