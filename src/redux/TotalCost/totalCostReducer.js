import { PUSH__ITEM, DELETE__ITEM, SET__BUNS, REMOVE__ITEM__DATA__COST } from '../types'

const initialStateTotalCost = { total: [] }

const handlers = {
  [PUSH__ITEM]: (state, { payload }) => ({
    total: [...state.total, payload],
  }),
  [SET__BUNS]:(state, {payload}) => ({
    total:calcTotalBuns(state, payload)
  }),
  [DELETE__ITEM]: (state, { payload }) => ({
    total: [...state.total].splice(payload, 1)
  }),
  [REMOVE__ITEM__DATA__COST]:(state, {payload}) => ({
    ...state,
    total:deleteItemInArray(state.total, payload)
  }),
  DEFAULT: state => state
}

const totalCostReducer = (state = initialStateTotalCost, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

const calcTotalBuns = (state, payload) => {
  const newState = [...state.total]
  const index = newState.findIndex(item => item.type === 'bun')
  if(index !== -1){
    newState.splice(state.total.findIndex(item => item.type === 'bun'), 1, payload)
  }else{
    newState.push(payload)
  }
  return newState
}

const deleteItemInArray = (array, payload) => {
  const newArray = [...array]
  newArray.splice(
    newArray.findIndex(item => item._id === payload),
    1
  )
  return newArray
}
export { totalCostReducer }
