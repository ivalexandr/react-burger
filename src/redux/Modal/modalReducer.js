import { SET__INGREDIENT, SHOW__INGREDIENTS__DETAILS, SHOW__ORDER__DETAILS } from "../types"

const initialStateModal = {
  ingredient:{},
  isShowIngredients:false,
  isShowOrder:false
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
  DEFAULT:state => state
}
const modalReducer = (state = initialStateModal, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
export { modalReducer }