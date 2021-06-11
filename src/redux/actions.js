import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../services/api-services";
import {getCookie} from "../services/cookie";

//INGREDIENTS__SLICE
const getIngredients = createAsyncThunk(
  'INGREDIENTS/getIngredients',
  async () => {
    try{
      return await apiServices.getDataFromDataBase()
    }
    catch(e){
        console.error(e)
    }
  }
)
//MODAL__SLICE
const getOrderNumber = createAsyncThunk(
  'MODAL/getOrderNumber',
  async (data) => {
    try {
      return await apiServices.getOrderedNumber(data)
    } catch (e) {
      console.error(e)
    }
  }
)
//AUTH__SLICE
const resetPasswordSearch = createAsyncThunk(
    'AUTH/resetPasswordSearch',
    async (email) => {
        try {
            return await apiServices.resetPasswordSearch(email)
        }catch(e){
            console.error(e)
        }
    }
)
const resetPassword = createAsyncThunk(
    'AUTH/resetPassword',
    async (data) => {
        try{
            return await apiServices.resetPassword(data)
        }catch(e){
            console.error(e)
        }
    }
)
const loginUser = createAsyncThunk(
    'AUTH/loginUser',
    async (data) => {
        try{
            return await apiServices.loginUser(data)
        }catch(e){
            console.error(e)
        }
    }
)
const refreshToken = createAsyncThunk(
    'AUTH/refreshToken',
    async (refreshToken)=>{
        try{
            if(refreshToken.success !== 'true') throw new Error('Ошибка обновления токена')
            return await apiServices.refreshToken(refreshToken)
        }catch(e){
            console.error(e)
        }
    }
)
const registerUser = createAsyncThunk(
    'AUTH/registerUser',
    async (data) => {
        try{
            return await apiServices.registerUser(data)
        }catch(e){
            console.error(e)
        }
    }
)
//PROFILE__FORM__SLICE
const getUserData = createAsyncThunk(
    'PROFILEFORM/getUserData',
    async () => {
           return await apiServices.getUserData(getCookie('accessToken'))
    }
)
const setUserData = createAsyncThunk(
    'PROFILEFORM/setUserData',
    async (data) => {
            return apiServices.setUserData(getCookie('accessToken'), data)
    }
)
const logoutUser = createAsyncThunk(
    'PROFILEFORM/logoutUser',
    async (data) => {
        return await apiServices.logoutUser(data)
    }
)
export {
  getIngredients,
  getOrderNumber,
  resetPasswordSearch,
  resetPassword,
  registerUser,
  loginUser,
  refreshToken,
  getUserData,
  setUserData,
  logoutUser
}