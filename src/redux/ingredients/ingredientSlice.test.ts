import ingredientsSlice, { IInitialState } from "./ingredientsSlice"
import { getIngredients } from "../actions"
import { getIngredient, cleanIngredients } from "./ingredientsSlice"
import { TObjectIngredient } from "../../types"

const initialState = {data: [],status: '',ingredient: null} as IInitialState

const ingredientExample: TObjectIngredient = {calories: 123, carbohydrates: 555, fat:523, image:'', image_large:'', image_mobile:'',  name:'BUN',  price:1235, proteins:0, type:'',  __v:0, _id: '123456'}
const ingredientExample_2: TObjectIngredient = {calories: 123, carbohydrates: 555, fat:523, image:'', image_large:'', image_mobile:'',  name:'MAIN',  price:1235, proteins:0, type:'',  __v:0, _id: '154879'}

describe('ingredientSlice reducer', () => {
  describe('initialState test', () => {
    it('when no action', () => {
      const state = ingredientsSlice(initialState, {type:null})
      expect(state).toEqual({data: [],status: '',ingredient: null})
    })
  })
  describe('typical reducers', () => {
    describe('getIngredien reducer', () => {
      it('when get ingredient', () => {
        const initialStateGetIngredient: IInitialState = {data: [ingredientExample], status: '',ingredient: null}
        const action = {type: getIngredient.type, payload: '123456'}
        const state = ingredientsSlice(initialStateGetIngredient, action)
        expect(state).toEqual({data: [ingredientExample], status: '', ingredient: ingredientExample})
      })
    })
    describe('cleanIngredients reducer', () => {
      it('when clean ingredient', () => {
        const action = {type: cleanIngredients.type, payload: null}
        const initialStateCleanIngredients: IInitialState = {data: [],status: '',ingredient: ingredientExample}
        const state = ingredientsSlice(initialStateCleanIngredients, action)
        expect(state).toEqual({data: [], status: '', ingredient: null})
      })
    })
  })
  describe('extra reducers', () => {
    describe('getIngredients reducer', () => {
      it('when fetchig pending', () => {
        const action = {type:getIngredients.pending.type}
        const state = ingredientsSlice(initialState, action)
        expect(state).toEqual({data: [],status: 'loading',ingredient: null})
      })
      it('when fetching fulfilled', () => {
        const action = {type:getIngredients.fulfilled.type, payload:{data:[ingredientExample, ingredientExample_2]}}
        const state = ingredientsSlice(initialState, action)
        expect(state).toEqual({data:[ingredientExample, ingredientExample_2],status: 'success',ingredient: null})
      })
      it('when fetching reject', () => {
        const action = {type:getIngredients.rejected.type}
        const state = ingredientsSlice(initialState, action)
        expect(state).toEqual({data: [], status:'failed', ingredient: null})
      })
    })
  })
})

