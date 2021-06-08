import {createSlice} from "@reduxjs/toolkit";
import {resetPasswordSearch, resetPassword, registerUser} from "../actions";

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
    }
})

export default authSlice.reducer

export const { setForm } = authSlice.actions