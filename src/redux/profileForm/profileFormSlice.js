import {createSlice} from "@reduxjs/toolkit";
import {getUserData, logoutUser, setUserData} from "../actions";

const profileFormSlice = createSlice({
    name:'PROFILEFORM',
    initialState:{
        name:'',
        password:'',
        email:'',

        dataUser:null,
        status:'',
    },
    reducers:{
        setForm(state, {payload}){
            state[payload.name] = payload.value
        }
    },
    extraReducers:{
        [getUserData.pending]:(state) => {
            state.status = 'loading'
        },
        [getUserData.fulfilled]:(state, {payload}) => {
            state.status = 'success'
            state.dataUser = payload
            state.name = payload?.user?.name
            state.email = payload?.user?.email
        },
        [getUserData.rejected]:(state) => {
            state.status = 'failed'
        },
        [setUserData.fulfilled]:(state, {payload}) => {
            state.status = 'success'
            state.dataUser = payload
            state.name = payload?.user?.name
            state.email = payload?.user?.email
        },
        [setUserData.rejected]:(state) => {
            state.status = 'failed'
        },
        [logoutUser.fulfilled]:(state,) => {
            state.status = 'success'
            state.dataUser = null
            state.name = ''
            state.email = ''
        },
        [logoutUser.rejected]:(state) => {
            state.status = 'failed'
        }
    }
})

export default profileFormSlice.reducer
export const { setForm } = profileFormSlice.actions