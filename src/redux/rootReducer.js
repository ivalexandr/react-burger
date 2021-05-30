import { combineReducers } from 'redux'
import { dataConstructorReducer } from './DataConstructor/dataConstructorReducer'
import { dataIngredientsReducer } from './DataIngredients/dataIngredientsReducer'
import { modalReducer } from './Modal/modalReducer'

export const rootReducer = combineReducers({
  burgerConstructor:dataConstructorReducer,
  dataIngredients:dataIngredientsReducer,
  modalData:modalReducer,
})