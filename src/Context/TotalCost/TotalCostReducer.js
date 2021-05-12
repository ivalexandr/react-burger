import { ADD, SUB } from '../types'

const initialStateTotalCost = { total: 0 }

const handlers = {
  [ADD]: (state, { payload }) => ({
    total: +state.total + payload
  }),
  [SUB]: (state, { payload }) => ({
    total: +state.total - payload
  }),
  DEFAULT: state => state
}

const totalCostReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

export { initialStateTotalCost, totalCostReducer }
