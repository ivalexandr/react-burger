import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import constructorSlice from "./constructor/constructorSlice";
import ingredientsSlice from "./ingredients/ingredientsSlice";
import modalSlice from "./modal/modalSlice";

const store = configureStore({
  reducer:{
    INGREDIENTS:ingredientsSlice,
    CONSTRUCTOR:constructorSlice,
    MODAL:modalSlice,
  },
  middleware:getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store