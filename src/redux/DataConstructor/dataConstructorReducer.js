import {  PUSH__ITEM__DATA, SET__BUN, SORT__ARRAY, REMOVE__ITEM, SET__BUNS__DATA__CONSTRUCTOR } from '../types'

const initialStateDataConstuctor = {
    data: [],

    bun:null,

  }
const handlers = {
  [PUSH__ITEM__DATA]: (state, { payload }) => ({
    ...state,
    data: [...state.data, payload]
  }),
  [SET__BUNS__DATA__CONSTRUCTOR]:(state, {payload}) => ({
    ...state,
    data: setBunsDataConstructor(state.data, payload)
  }),
  [SET__BUN]:(state, {payload}) => ({
    ...state,
    bun:payload,
  }),
  [SORT__ARRAY]:(state, { payload }) => ({
    ...state,
    data:sortArray(state.data, payload)
  }),
  [REMOVE__ITEM]:(state, {payload}) => ({
    ...state,
    data:deleteItemInArray(state.data, payload)
  }),
  DEFAULT: state => state
}
const dataConstructorReducer = (state = initialStateDataConstuctor, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

const sortArray = (array, payload) => {
  const { idFrom, idTo } = payload
  const newArray = [...array]
  newArray.splice(idTo, 0, 
    newArray.splice(idFrom, 1)[0])
  return newArray
}
const deleteItemInArray = (array, payload) => {
  const newArray = [...array]
  newArray.splice(
    payload,
    1
  )
  return newArray
}
const setBunsDataConstructor = (state, payload) => {
  const newState = [...state]
  const index = newState.findIndex(item => item.type === 'bun')
  if(index !== -1){
    newState.splice(state.findIndex(item => item.type === 'bun'), 1, payload)
  }else{
    newState.push(payload)
  }
  return newState
}
export { dataConstructorReducer }
