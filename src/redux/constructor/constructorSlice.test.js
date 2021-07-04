import constructorSlice from "./constructorSlice"
import { pushItem, setBuns, setBun, sortArray, removeItem, checkBunEmpty } from "./constructorSlice"

const initialState = { data: [], bun: null, isBunEmpty:false}

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
        const action = {type:pushItem.type, payload:{type:'bun', _id:12345, key: rand}}
        const state = constructorSlice(initialState, action)
        expect(state).toEqual({data: [{type:'bun', _id:12345, key:rand}], bun: null, isBunEmpty:false})
      })
    })
    describe('setBuns reducer', () => {
    it('when push bun to data without buns in state', () => {
      const action = {type:setBuns.type, payload:{type:'bun', _id:12345}}
      const state = constructorSlice(initialState, action)
      expect(state).toEqual({data: [{type:'bun', _id:12345}], bun: null, isBunEmpty:false})
    })
    it('when replace bun to data if buns in state', () => {
      const initialStateForTest = { data: [{type:'bun', _id:12345}], bun: null, isBunEmpty:false}
      const action = {type:setBuns.type, payload:{type:'bun', _id:569874}}
      const state = constructorSlice(initialStateForTest, action)
      expect(state).toEqual({ data: [{type:'bun', _id:569874}], bun: null, isBunEmpty:false})
    })
    })
    describe('setBun reducer', () => {
      it('when push bun in bun in state', () => {
      const action = {type:setBun.type, payload:{type:'bun', _id:569874}}
      const state = constructorSlice(initialState, action)
      expect(state).toEqual({ data: [], bun: {type:'bun', _id:569874}, isBunEmpty:false})
      })
    })
    describe('sortArray reducer', () => {
      it('when sort array in state data[] idFrom:2, idTo:0', () => {
        const initialStateForTest = { data: [{type:'bun', _id:12345}, {type:'main', _id:213544}, {type:'main', _id:5445887}], bun: null, isBunEmpty:false}
        const action = {type:sortArray.type, payload:{idFrom:2, idTo:0}}
        const state = constructorSlice(initialStateForTest, action)
        expect(state).toEqual({ data:[{type:'main', _id:5445887}, {type:'bun', _id:12345}, {type:'main', _id:213544}] , bun: null, isBunEmpty:false})
      })
      it('when sort array in state data[] idFrom:0, idTo:1', () => {
        const initialStateForTest = { data: [{type:'bun', _id:12345}, {type:'main', _id:213544}, {type:'main', _id:5445887}], bun: null, isBunEmpty:false}
        const action = {type:sortArray.type, payload:{idFrom:0, idTo:1}}
        const state = constructorSlice(initialStateForTest, action)
        expect(state).toEqual({ data:[{type:'main', _id:213544},{type:'bun', _id:12345}, {type:'main', _id:5445887}] , bun: null, isBunEmpty:false})
      })
    })
    describe('removeItem reducer', () => {
      it('when remove item in state data[]', () => {
        const initialStateForTest = { data: [{type:'bun', _id:12345}], bun: null, isBunEmpty:false}
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
