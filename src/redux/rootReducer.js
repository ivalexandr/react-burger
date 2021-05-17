import { combineReducers } from 'redux'
import { totalCostReducer } from './TotalCost/totalCostReducer'
import { dataConstructorReducer } from './DataConstructor/dataConstructorReducer'
import { dataIngredientsReducer } from './DataIngredients/dataIngredientsReducer'
import { modalReducer } from './Modal/modalReducer'

export const rootReducer = combineReducers({
  totalCost: totalCostReducer,
  burgerConstructor:dataConstructorReducer,
  dataIngredients:dataIngredientsReducer,
  modalData:modalReducer,
})