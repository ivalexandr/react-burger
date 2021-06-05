import {createSlice} from "@reduxjs/toolkit";

const profileFormSlice = createSlice({
    name:'PROFILEFORM',
    initialState:{
        name:'',
        password:'',
        email:'',
    },
    reducers:{
        setForm(state, {payload}){
            state[payload.name] = payload.value
        }
    }
})

export default profileFormSlice.reducer
export const { setForm } = profileFormSlice.actions