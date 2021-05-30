import { DELETE__INGREDIENT, SET__INGREDIENT, SHOW__INGREDIENTS__DETAILS, SHOW__ORDER__DETAILS, GET__ORDERED__START,GET__ORDERED__SUCCESS, GET__ORDERED__FAIL, REMOVE__ORDERED__DATA } from "../types"
import { apiServices }  from '../../services/api-services'


const initialStateModal = {
  ingredient:{},
  isShowIngredients:false,
  isShowOrder:false,

  requestOrder:false,
  requestSuccessOrder:false,
  requestErrorOrder:false,
  order:null,
}

const handlers = {
  [SET__INGREDIENT]:(state, {payload}) => ({
    ...state,
    ingredient:payload,
  }),
  [SHOW__INGREDIENTS__DETAILS]:(state, {payload}) => ({
    ...state,
    isShowIngredients:payload,
  }),
  [SHOW__ORDER__DETAILS]:(state, {payload}) => ({
    ...state,
    isShowOrder:payload,
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
  [REMOVE__ORDERED__DATA]:(state) => ({
    ...state,
    order:null,
  }),
  [DELETE__INGREDIENT]:(state) => ({
    ...state,
    ingredient:{},
  }),
  DEFAULT:state => state
}
const modalReducer = (state = initialStateModal, action) => {
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
export { modalReducer, getOrderedNumber }