import ingredientsSlice from "./ingredientsSlice"
import { getIngredients, getIngredientsNoModal } from "../actions"

const initialState = {data: [],status: null,ingredient: {}}

describe('ingredientSlice reducer', () => {
  describe('extra reducers', () => {
    describe('getIngredients reducer', () => {
      it('when fetchig pending', () => {
        const action = {type:getIngredients.pending.type}
        const state = ingredientsSlice(initialState, action)
        expect(state).toEqual({data: [],status: 'loading',ingredient: {}})
      })
      it('when fetching fulfilled', () => {
        const action = {type:getIngredients.fulfilled.type, payload:{data:[{type:'bun', _id:54631}, {type:'main', _id:521255}]}}
        const state = ingredientsSlice(initialState, action)
        expect(state).toEqual({data:[{type:'bun', _id:54631}, {type:'main', _id:521255}],status: 'success',ingredient: {}})
      })
      it('when fetching reject', () => {
        const action = {type:getIngredients.rejected.type}
        const state = ingredientsSlice(initialState, action)
        expect(state).toEqual({data: [], status:'failed', ingredient: {}})
      })
    })
    describe('getIngredientsNoModal reducer', () => {
      it('when fetching pending', () => {
        const action = {type:getIngredientsNoModal.pending.type}
        const state = ingredientsSlice(initialState, action)
        expect(state).toEqual({data: [], status:'loading', ingredient: {}})
      })
      it('when fetching fulfilled', () => {
        const action = {type:getIngredientsNoModal.fulfilled.type, payload:{id:123456, data:{data:[{type:'bun', _id:123456}, {type:'sauce', _id:546235}]}}}
        const state = ingredientsSlice(initialState, action)
        expect(state).toEqual({data: [], status:'success', ingredient: {type:'bun', _id:123456}})
      })
      it('when fetching rejected', () => {
        const action = {type:getIngredientsNoModal.rejected.type}
        const state = ingredientsSlice(initialState, action)
        expect(state).toEqual({data: [], status:'failed', ingredient: {}})
      })
    })
  })
})