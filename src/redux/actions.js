import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../services/api-services";

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


export {
  getIngredients,
  getOrderNumber
}