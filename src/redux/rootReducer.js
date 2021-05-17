import { combineReducers } from 'redux'
import { totalCostReducer } from './TotalCost/totalCostReducer'
import { dataConstructorReducer } from './DataConstructor/dataConstructorReducer'


export const rootReducer = combineReducers({
  totalCost: totalCostReducer,
  burgerConstructor:dataConstructorReducer,
})