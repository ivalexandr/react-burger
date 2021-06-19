import {createSlice} from "@reduxjs/toolkit";
import {resetPasswordSearch, resetPassword, registerUser, loginUser, refreshToken, setUserData, getUserData, logoutUser } from "../actions";

const authSlice = createSlice({
    name:'AUTH',
    initialState:{
        status:'',
        user:null,
        refreshStatus:'',
    
        registerStatus:'',
        resetPasswordStatus:'',
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
            state.resetPasswordStatus = 'success'
        },

        [resetPassword.fulfilled]:(state) => {
            state.resetPasswordStatus = 'success'
        },


        [registerUser.pending]:(state) => {
            state.registerStatus = 'loading'
        },
        [registerUser.fulfilled]:(state, { payload }) => {
            state.registerStatus = 'success'

        },
        [registerUser.rejected]:(state) => {
            state.registerStatus = 'failed'
        },


        [loginUser.pending]:(state) => {
            state.status = 'loading'
        },
        [loginUser.fulfilled]:(state, {payload}) => {
            state.status = 'success'
            state.user = payload
        },
        [loginUser.rejected]:(state) => {
            state.status = 'failed'
        },


        [setUserData.pending]:(state ) => {
            state.status = 'loading'
        },
        [setUserData.fulfilled]:(state , {payload}) => {
            state.status = 'success'
            state.user = payload
        },
        [setUserData.rejected]:(state) => {
            state.status = 'failed'
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


        [refreshToken.fulfilled]:(state) => {
            state.refreshStatus = 'success'
        },

        
        [logoutUser.pending]:(state) => {
            state.user = null
            state.status = null
        },
    }
})

export default authSlice.reducer

export const { setForm, setStateHistory } = authSlice.actions