import {createSlice} from "@reduxjs/toolkit";
import {resetPasswordSearch, resetPassword, registerUser, loginUser, refreshToken, setUserData, getUserData, logoutUser } from "../actions";


interface IInitialState{
    status: string
    user: {
        user:{
            name: string
            email: string
        }
    } | null
    refreshStatus: string
    registerStatus: string
    resetPasswordStatus: string
    stateHistory: string
}
const initialState = {
        status:'',
        user: {
            user:{
            name: '',
            email:''
        }
    },
        refreshStatus:'',
    
        registerStatus:'',
        resetPasswordStatus:'',
        stateHistory:'',
} as IInitialState

const authSlice = createSlice({
    name:'AUTH',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(resetPasswordSearch.fulfilled, (state) => {
            state.resetPasswordStatus = 'success'
        })
        builder.addCase(resetPassword.fulfilled, (state) => {
            state.resetPasswordStatus = 'success'
        })
        builder.addCase(registerUser.pending, (state) => {
            state.registerStatus = 'loading'
        })
        builder.addCase(registerUser.fulfilled, (state) => {
            state.registerStatus = 'success'
        })
        builder.addCase(registerUser.rejected, (state) => {
            state.registerStatus = 'failed'
        })
        builder.addCase(loginUser.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'success'
            state.user = action.payload
        })
        builder.addCase(loginUser.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(setUserData.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(setUserData.fulfilled, (state, action) => {
            state.status = 'success'
            state.user = action.payload
        })
        builder.addCase(setUserData.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(getUserData.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = 'success'
        })
        builder.addCase(getUserData.rejected, (state) => {
            state.status = 'failed'
        })
        builder.addCase(refreshToken.fulfilled, (state) => {
            state.refreshStatus = 'success'
        })
        builder.addCase(logoutUser.pending, (state) => {
            state.user = null
            state.status = ''
        })
        
    }
})

export default authSlice.reducer