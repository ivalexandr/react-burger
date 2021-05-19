import { GET__INGREDIENTS__START, GET__INGREDIENTS__SUCCESS, GET__INGREDIENTS__FAIL } from '../types'
import { apiServices } from '../../services/api-services'

const initialStateIngredients = {
  ingredients:[],
  requestIngredients:false,
  requestSuccessIngredients:false,
  requestErrorIngredients:false,
  
  
  itemIngredients:null,

}
const handlers = {
[GET__INGREDIENTS__START]:(state) => ({
  ...state,
  requestIngredients:true,
  requestErrorIngredients:false,
  requestSuccessIngredients:false,
}),
[GET__INGREDIENTS__SUCCESS]:(state, {payload}) => ({
  ...state,
  ingredients:payload.map(item => ({
    ...item,
    counter:0,
  })),
  requestIngredients:false,
  requestSuccessIngredients:true,

}),
[GET__INGREDIENTS__FAIL]:(state) => ({
  ...state,
  requestIngredients:false,
  requestErrorIngredients:true,
}),
DEFAULT:state => state
}

const dataIngredientsReducer = (state = initialStateIngredients, action)  => {

const handler = handlers[action.type] || handlers.DEFAULT

return handler(state, action)
}

const getIngredients = () => {
  return async (dispatch) => {
    dispatch({type:GET__INGREDIENTS__START})
    try {
      const res = await apiServices.getDataFromDataBase()
      dispatch({type:GET__INGREDIENTS__SUCCESS, payload:res.data})
    } catch (e) {
      dispatch({type:GET__INGREDIENTS__FAIL})
      console.error(e)
    }
  }
}
export {dataIngredientsReducer, getIngredients}