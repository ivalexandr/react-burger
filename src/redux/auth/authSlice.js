import {createSlice} from "@reduxjs/toolkit";
import {resetPasswordSearch, resetPassword, registerUser, loginUser, refreshToken, getUserData} from "../actions";
import {setCookie} from "../../services/cookie";

const authSlice = createSlice({
    name:'AUTH',
    initialState:{
        name:'',
        email:'',
        password:'',
        token:'',

        status:null,
        statusSearch:null,
        statusReset:null,
        statusRegister:null,
        statusLogin:null,
        statusRefresh:null,
        dataLogin:null,
        dataUser:null,
    },
    reducers:{
        setForm(state, {payload}){
            state[payload.name] = payload.value
        },
    },
    extraReducers:{
        [resetPasswordSearch.pending]:(state) => {
            state.statusSearch = 'loading'
        },
        [resetPasswordSearch.fulfilled]:(state, {payload}) => {
            state.statusSearch = 'success'
            console.log(payload)
            state.status = payload.success
        },
        [resetPasswordSearch.rejected]:(state) => {
            state.statusSearch = 'failed'
        },
        [resetPassword.pending]:(state) => {
            state.statusReset = 'loading'
        },
        [resetPassword.fulfilled]:(state, {payload}) => {
            state.statusReset = 'success'
            console.log(payload)
            state.status = payload
        },
        [resetPassword.rejected]:(state) => {
            state.statusReset = 'failed'
        },
        [registerUser.pending]:(state) => {
            state.statusRegister = 'loading'
        },
        [registerUser.fulfilled]:(state, {payload}) => {
            state.statusRegister = 'success'
            console.log(payload)
        },
        [registerUser.rejected]:(state) => {
            state.statusRegister = 'failed'
        },
        [loginUser.pending]:(state) => {
            state.statusLogin = 'loading'
        },
        [loginUser.fulfilled]:(state, {payload}) => {
            state.statusLogin = 'success'
            setCookie('accessToken',payload?.accessToken.split('Bearer ')[1])
            localStorage.setItem('refreshToken', payload?.refreshToken)
            localStorage.setItem('successLogin', payload?.success)
            state.dataLogin = payload
        },
        [loginUser.rejected]:(state) => {
            state.statusLogin = 'failed'
        },
        [refreshToken.pending]:(state) => {
            state.statusRefresh = 'loading'
        },
        [refreshToken.fulfilled]:(state, {payload}) => {
            state.statusRefresh = 'success'
            setCookie('accessToken',payload?.accessToken.split('Bearer ')[1])
            localStorage.setItem('refreshToken', payload?.refreshToken)
            localStorage.setItem('successLogin', payload?.success)
            state.dataLogin = payload
        },
        [refreshToken.rejected]:(state) => {
            state.statusRefresh = 'failed'
        },
        [getUserData.fulfilled]:(state, {payload}) => {
            state.dataUser = payload
        }
    }
})

export default authSlice.reducer

export const { setForm } = authSlice.actions