import { resetPasswordSearch, resetPassword, registerUser, loginUser, refreshToken, setUserData, getUserData, logoutUser } from '../actions'
import authSlice from './authSlice'


describe('authReducer', () => {
  describe('extraReducers', () => {
    const initialState = { status:'', user:null, refreshStatus:'', stateHistory:''}
    describe('registerUser reducer', () => {
      it('when fetching pending', () => {
        const action = {type:registerUser.pending.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'loading', user:null, refreshStatus:'', stateHistory:''})
      })
      it('when fetching fullfilled', () => {
        const action = {type:registerUser.fulfilled.type, payload:{name:'John', email:'test@test.ru'}}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'success', user:{name:'John', email:'test@test.ru'}, refreshStatus:'', stateHistory:''})
      })
      it('when fetching reject', () => {
        const action = {type:registerUser.rejected.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'failed', user:null, refreshStatus:'', stateHistory:''})
      })
    })
    describe('resetPasswordSearch reducer', () => {
      it('when fetching fullfiled', () => {
        const action = {type:resetPasswordSearch.fulfilled.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'success', user:null, refreshStatus:'', stateHistory:''})
      })
    })
    describe('resetPassword', () => {
      it('when fetching fullfiled', () => {
        const action = {type:resetPassword.fulfilled}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'success', user:null, refreshStatus:'', stateHistory:''})
      })
    })
  })
})