import modalSlice from "./modalSlice"
import { showOrderModal, removeOrder } from "./modalSlice"
import { getOrderNumber } from "../actions"

const initialState = {isShowOrder:false, status:null,order:null}

describe('modalSlice reducer', () => {
  describe('initialState test', () => {
    it('when no action', () => {
      const state = modalSlice(initialState, {type:null})
      expect(state).toEqual({isShowOrder:false, status:null,order:null})
    })
  })
  describe('typical reducers', () => {
    describe('showOrderModal reducer', () => {
      it('when isShowOrder changed', () => {
        const action = {type:showOrderModal.type, payload:true}
        const state = modalSlice(initialState,action)
        expect(state).toEqual({isShowOrder:true, status:null,order:null})
      })
    })
    describe('removeOrder reducer', () => {
      it('when remove order in state order', () => {
        const initialStateForTest = {isShowOrder:false, order:32154, status:null}
        const action = {type:removeOrder.type}
        const state = modalSlice(initialStateForTest, action)
        expect(state).toEqual({isShowOrder:false, status:null,order:null})
      })
    })
  })
  describe('extra reducers', () => {
    describe('getOrderNumber reducer', () => {
      it('when fetching pending', () => {
        const action = {type:getOrderNumber.pending.type}
        const state = modalSlice(initialState, action)
        expect(state).toEqual({isShowOrder:false, status:'loading',order:null})
      })
      it('when fetching fulfilled', () => {
        const action = {type:getOrderNumber.fulfilled.type, payload:{order:{number:123456}}}
        const state = modalSlice(initialState, action)
        expect(state).toEqual({isShowOrder:false, status:'success',order:123456})
      })
      it('when fetching rejected', () => {
        const action = {type:getOrderNumber.rejected.type}
        const state = modalSlice(initialState, action)
        expect(state).toEqual({isShowOrder:false, status:'failed',order:null})
      })
    })
    
  })
})