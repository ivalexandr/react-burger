import constructorSlice, { IinitialState } from "./constructorSlice"
import { pushItem, setBuns, setBun, sortArray, removeItem, checkBunEmpty } from "./constructorSlice"
import { TObjectIngredient } from "../../types"

const initialState = { data: [], bun: null, isBunEmpty:false} as IinitialState
const ingredientExample: TObjectIngredient = {calories: 123, carbohydrates: 555, fat:523, image:'', image_large:'', image_mobile:'',  name:'bun',  price:1235, proteins:0, type:'bun',  __v:0, _id: '123456'}
const ingredientExample_2: TObjectIngredient = {calories: 123, carbohydrates: 555, fat:523, image:'', image_large:'', image_mobile:'',  name:'bun',  price:1235, proteins:0, type:'bun',  __v:0, _id: '7894561'}
const ingredientExample_3: TObjectIngredient = {calories: 123, carbohydrates: 555, fat:523, image:'', image_large:'', image_mobile:'',  name:'main',  price:1235, proteins:0, type:'',  __v:0, _id: '5541336'}
const ingredientExample_4: TObjectIngredient = {calories: 123, carbohydrates: 555, fat:523, image:'', image_large:'', image_mobile:'',  name:'main',  price:1235, proteins:0, type:'',  __v:0, _id: '5544123'}

describe('constructorSlice', () => {
  describe('initialState test', () => {
    it('when no action', () => {
      const state = constructorSlice(initialState, {type:null})
      expect(state).toEqual({ data: [], bun: null, isBunEmpty:false})
    })
  })
  describe('typical reducers', () => {
    describe('pushItem reducer', () => {
      it('when push ingredient to data', () => {
        const rand = Date.now()
        const action = {type:pushItem.type, payload:{...ingredientExample, key:rand}}
        const state = constructorSlice(initialState, action)
        expect(state).toEqual({data: [{...ingredientExample, key:rand}], bun: null, isBunEmpty:false})
      })
    })
    describe('setBuns reducer', () => {
    it('when push bun to data without buns in state', () => {
      const action = {type:setBuns.type, payload:ingredientExample}
      const state = constructorSlice(initialState, action)
      expect(state).toEqual({data: [ingredientExample], bun: null, isBunEmpty:false})
    })
    it('when replace bun to data if buns in state', () => {
      const initialStateForTest: IinitialState = { data: [ingredientExample], bun: null, isBunEmpty:false}
      const action = {type:setBuns.type, payload:ingredientExample_2}
      const state = constructorSlice(initialStateForTest, action)
      expect(state).toEqual({ data: [ingredientExample_2], bun: null, isBunEmpty:false})
    })
    })
    describe('setBun reducer', () => {
      it('when push bun in bun in state', () => {
      const action = {type:setBun.type, payload:ingredientExample_2}
      const state = constructorSlice(initialState, action)
      expect(state).toEqual({ data: [], bun: ingredientExample_2, isBunEmpty:false})
      })
    })
    describe('sortArray reducer', () => {
      it('when sort array in state data[] idFrom:0, idTo:1', () => {
        const initialStateForTest: IinitialState = { data: [ingredientExample_3, ingredientExample_4], bun: null, isBunEmpty:false}
        const action = {type:sortArray.type, payload:{idFrom:0, idTo:1}}
        const state = constructorSlice(initialStateForTest, action)
        expect(state).toEqual({ data:[ingredientExample_4, ingredientExample_3] , bun: null, isBunEmpty:false})
      })
    })
    describe('removeItem reducer', () => {
      it('when remove item in state data[]', () => {
        const initialStateForTest: IinitialState = { data: [ingredientExample_3], bun: null, isBunEmpty:false}
        const action = {type:removeItem.type, payload:0}
        const state = constructorSlice(initialStateForTest, action)
        expect(state).toEqual({data:[], bun: null, isBunEmpty:false})
    })
  })
  describe('checkBunEmpty reducer', () => {
    it('when checked bun is empty', () => {
      const action = {type:checkBunEmpty.type, payload:true}
      const state = constructorSlice(initialState, action)
      expect(state).toEqual({data:[], bun: null, isBunEmpty:true})
    })
  })
})
})
