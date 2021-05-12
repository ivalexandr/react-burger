import { ADD__ORDERED__NUMBER, PUSH__ITEM__DATA, PUSH__ITEM__ID } from '../types'

const initialStateDataConstuctor = { data: [], _id: [], order:null }
const handlers = {
  [PUSH__ITEM__DATA]: (state, { payload }) => ({
    ...state,
    data: [...state.data, payload]
  }),
  [PUSH__ITEM__ID]: (state, { payload }) => ({
    ...state,
    _id: [...state._id, payload]
  }),
  [ADD__ORDERED__NUMBER]:(state, {payload})=> ({
    ...state,
    order:+payload
  }),
  DEFAULT: state => state
}
const dataConstructorReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

export { initialStateDataConstuctor, dataConstructorReducer }
