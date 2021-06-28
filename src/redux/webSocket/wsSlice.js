import { createSlice } from "@reduxjs/toolkit";

const wsSlice = createSlice({
  initialState:{
    data:[],
    wsStatus:null,
  },
  reducers:{
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
      state.error = payload
    },
    wsGetMessage(state, {payload}){
      state.data = state.data.length ? [...state.data, payload] : [payload]
    }
  }
})


export default wsSlice.reducer

export const {wsConnectionClosed, wsConnectionFailed, wsConnectionSuccess, wsGetMessage} = wsSlice.actions