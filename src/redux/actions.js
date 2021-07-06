import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiServices } from '../services/api-services'
import { getCookie, setCookie } from '../services/cookie'

//INGREDIENTS__SLICE
const getIngredients = createAsyncThunk(
  'INGREDIENTS/getIngredients',
  async () => {
    return await apiServices.getDataFromDataBase()
  }
)
const getIngredientsNoModal = createAsyncThunk(
  'INGREDIENTS/getIngredientsNoModal',
  async id => {
    return { data: await apiServices.getDataFromDataBase(), id }
  }
)
//MODAL__SLICE
const getOrderNumber = createAsyncThunk('MODAL/getOrderNumber', async data => {
  return await apiServices.getOrderedNumber(data)
})
//AUTH__SLICE
const resetPasswordSearch = createAsyncThunk(
  'AUTH/resetPasswordSearch',
  async email => {
    return await apiServices.resetPasswordSearch(email)
  }
)
const resetPassword = createAsyncThunk('AUTH/resetPassword', async data => {
  return await apiServices.resetPassword(data)
})
const loginUser = createAsyncThunk('AUTH/loginUser', async data => {
  const res = await apiServices.loginUser(data)
  setCookie('accessToken', res?.accessToken.split('Bearer ')[1])
  localStorage.setItem('refreshToken', res?.refreshToken)
  return res
})
const refreshToken = createAsyncThunk('AUTH/refreshToken', async () => {
  const res = await apiServices.refreshToken()
  setCookie('accessToken', res?.accessToken.split('Bearer ')[1])
  localStorage.setItem('refreshToken', res?.refreshToken)
  return res
})
const registerUser = createAsyncThunk('AUTH/registerUser', async data => {
  return await apiServices.registerUser(data)
})

const getUserData = createAsyncThunk('AUTH/getUserData', async () => {
  return await apiServices.getUserData(getCookie('accessToken'))
})
const setUserData = createAsyncThunk('AUTH/setUserData', async data => {
  return apiServices.setUserData(data)
})
const logoutUser = createAsyncThunk('AUTH/logoutUser', async () => {
  const res = await apiServices.logoutUser()
  setCookie('accessToken','')
  localStorage.setItem('refreshToken', '')
  return res
})
// WS
const getOrderItem = createAsyncThunk('WS/getOrderItem', async number => {
    const res = await apiServices.getOrderItem(number)
    return res
})
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
  logoutUser,
  getIngredientsNoModal,
  getOrderItem
}
