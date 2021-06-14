import {createSlice} from "@reduxjs/toolkit";
import {resetPasswordSearch, resetPassword, registerUser, loginUser, refreshToken, setUserData, getUserData, logoutUser } from "../actions";
import {setCookie} from "../../services/cookie";

const authSlice = createSlice({
    name:'AUTH',
    initialState:{
        status:'',
        user:null,
        refreshStatus:'',

        stateHistory:'',
    },
    reducers:{
        setForm(state, {payload}){
            state[payload.name] = payload.value
        },
        setStateHistory(state, {payload}){
            state.stateHistory = payload
        },
    },
    extraReducers:{
        
        [resetPasswordSearch.fulfilled]:(state) => {
            state.status = 'success'
        },

        [resetPassword.fulfilled]:(state) => {
            state.status = 'success'
        },
        [registerUser.pending]:(state) => {
            state.status = 'loading'
        },
        [registerUser.fulfilled]:(state, { payload }) => {
            state.status = 'success'
            state.user = payload
        },
        [registerUser.rejected]:(state) => {
            state.status = 'failed'
        },
        [loginUser.fulfilled]:(state, {payload}) => {
            state.status = 'success'
            setCookie('accessToken',payload?.accessToken.split('Bearer ')[1])
            localStorage.setItem('refreshToken', payload?.refreshToken)
            state.user = payload
        },
        [setUserData.fulfilled]:(state , {payload}) => {
            state.status = 'success'
            state.user = payload
        },
        [getUserData.pending]:(state) => {
            state.status = 'loading'
        },
        [getUserData.fulfilled]:(state, {payload}) => {
            state.user = payload
            state.status = 'success'
        },
        [getUserData.rejected]:(state) => {
            state.status = 'failed'
        },
        [refreshToken.fulfilled]:(state, {payload}) => {
            state.refreshStatus = 'success'
            setCookie('accessToken',payload?.accessToken.split('Bearer ')[1])
            localStorage.setItem('refreshToken', payload?.refreshToken)
        },
        [logoutUser.fulfilled]:(state) => {
            setCookie('accessToken','')
            localStorage.setItem('refreshToken', '')
            state.user = null
            state.status = null
        },
    }
})

export default authSlice.reducer

export const { setForm, setStateHistory } = authSlice.actions