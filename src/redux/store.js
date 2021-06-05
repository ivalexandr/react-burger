import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import constructorSlice from "./constructor/constructorSlice";
import ingredientsSlice from "./ingredients/ingredientsSlice";
import modalSlice from "./modal/modalSlice";
import authSlice from "./auth/authSlice";

const store = configureStore({
  reducer:{
    INGREDIENTS:ingredientsSlice,
    CONSTRUCTOR:constructorSlice,
    MODAL:modalSlice,
    AUTH:authSlice
  },
  middleware:getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store