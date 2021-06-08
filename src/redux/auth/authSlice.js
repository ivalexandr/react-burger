import {createSlice} from "@reduxjs/toolkit";
import {resetPasswordSearch, resetPassword, registerUser, loginUser} from "../actions";
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
        dataLogin:null,
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
            setCookie('accessToken',payload.accessToken.split('Bearer ')[1])
            state.dataLogin = payload
        },
        [loginUser.rejected]:(state) => {
            state.statusLogin = 'failed'
        }
    }
})

export default authSlice.reducer

export const { setForm } = authSlice.actions