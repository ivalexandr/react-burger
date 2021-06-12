import {createSlice} from "@reduxjs/toolkit";
import {resetPasswordSearch, resetPassword, registerUser, loginUser, refreshToken, setUserData, getUserData, logoutUser } from "../actions";
import {setCookie} from "../../services/cookie";

const authSlice = createSlice({
    name:'AUTH',
    initialState:{
        status:null,
        user:null,
        refreshStatus:''
    },
    reducers:{
        setForm(state, {payload}){
            state[payload.name] = payload.value
        },
    },
    extraReducers:{
        
        [resetPasswordSearch.fulfilled]:(state) => {
            state.status = 'success'
        },

        [resetPassword.fulfilled]:(state) => {
            state.status = 'success'
        },

        [registerUser.fulfilled]:(state, { payload }) => {
            state.status = 'success'
            state.user = payload
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
            state.status = 'success'
            state.user = payload
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

export const { setForm } = authSlice.actions