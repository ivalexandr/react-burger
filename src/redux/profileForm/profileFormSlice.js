import {createSlice} from "@reduxjs/toolkit";
import {getUserData} from "../actions";

const profileFormSlice = createSlice({
    name:'PROFILEFORM',
    initialState:{
        name:'',
        password:'',
        email:'',

        dataUser:null,
    },
    reducers:{
        setForm(state, {payload}){
            state[payload.name] = payload.value
        }
    },
    extraReducers:{
        [getUserData.fulfilled]:(state, {payload}) => {
            state.dataUser = payload
            state.name = payload?.user?.name
            state.email = payload?.user?.email
        }
    }
})

export default profileFormSlice.reducer
export const { setForm } = profileFormSlice.actions