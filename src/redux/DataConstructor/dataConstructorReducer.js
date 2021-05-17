import {GET__ORDERED__START,GET__ORDERED__SUCCESS, GET__ORDERED__FAIL, PUSH__ITEM__DATA, SET__BUN} from '../types'
import { apiServices } from '../../services/api-services'

const initialStateDataConstuctor = {
    data: [],

    requestOrder:false,
    requestSuccessOrder:false,
    requestErrorOrder:false,
    order:null,
    bun:null,

  }
const handlers = {
  [PUSH__ITEM__DATA]: (state = initialStateDataConstuctor, { payload }) => ({
    ...state,
    data: [...state.data, payload]
  }),
  [GET__ORDERED__START]:(state) => ({
    ...state,
    requestOrder:true,
    requestErrorOrder:false,
    requestSuccessOrder:false,
  }),
  [GET__ORDERED__SUCCESS]:(state, {payload})=> ({
    ...state,
    order:+payload,
    requestOrder:false,
    requestSuccessOrder:true,
  }),
  [GET__ORDERED__FAIL]:(state) => ({
    ...state,
    requestOrder:false,
    requestSuccessOrder:false,
    requestErrorOrder:true,
  }),
  [SET__BUN]:(state, {payload}) => ({
    ...state,
    bun:payload,
  }),
  DEFAULT: state => state
}
const dataConstructorReducer = (state = initialStateDataConstuctor, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

const getOrderedNumber = (data) => {
  return async (dispatch) => {
    dispatch({type:GET__ORDERED__START})
    try {
        const res = await apiServices.getOrderedNumber(data)
        await dispatch({type:GET__ORDERED__SUCCESS, payload:res.order.number})
    } catch (e) {
      dispatch({type:GET__ORDERED__FAIL})
      console.error(e)
    }
  }
}

export { dataConstructorReducer, getOrderedNumber }
