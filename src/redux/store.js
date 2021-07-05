import { configureStore } from "@reduxjs/toolkit"
import logger from 'redux-logger'
import { wsMiddleware } from "./middlewares/wsMiddleware"
import constructorSlice from "./constructor/constructorSlice"
import ingredientsSlice from "./ingredients/ingredientsSlice"
import modalSlice from "./modal/modalSlice"
import authSlice from "./auth/authSlice"
import wsSlice from "./webSocket/wsSlice"



const store = configureStore({
  reducer:{
    INGREDIENTS:ingredientsSlice,
    CONSTRUCTOR:constructorSlice,
    MODAL:modalSlice,
    AUTH:authSlice,
    SOCKETS:wsSlice,
  },
  middleware:getDefaultMiddleware => getDefaultMiddleware().concat(logger, wsMiddleware()),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store