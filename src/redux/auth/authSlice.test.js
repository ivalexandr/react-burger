import { resetPasswordSearch, resetPassword, registerUser, loginUser, refreshToken, setUserData, getUserData, logoutUser } from '../actions'
import { setForm, setStateHistory } from './authSlice'
import authSlice from './authSlice'

const initialState = { status:'', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''}

describe('authReducer', () => {
  describe('initialState test', () => {
    it('when no action', () => {
      const state = authSlice(initialState, {type:null})
      expect(state).toEqual({ status:'', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
    })
  })
  describe('extraReducers', () => {
    describe('registerUser reducer', () => {
      it('when fetching pending', () => {
        const action = {type:registerUser.pending.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'', user:null, refreshStatus:'', stateHistory:'', registerStatus:'loading', resetPasswordStatus:''})
      })
      it('when fetching fulfilled', () => {
        const action = {type:registerUser.fulfilled.type, payload:{name:'John', email:'test@test.ru'}}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'', user:{name:'John', email:'test@test.ru'}, refreshStatus:'', stateHistory:'', registerStatus:'success', resetPasswordStatus:''})
      })
      it('when fetching rejected', () => {
        const action = {type:registerUser.rejected.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'', user:null, refreshStatus:'', stateHistory:'', registerStatus:'failed', resetPasswordStatus:''})
      })
    })
    describe('resetPasswordSearch reducer', () => {
      it('when fetching fulfilled', () => {
        const action = {type:resetPasswordSearch.fulfilled.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:'success'})
      })
    })
    describe('resetPassword reducer', () => {
      it('when fetching fulfilled', () => {
        const action = {type:resetPassword.fulfilled}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:'success'})
      })
    })
    describe('loginUser reducer', () => {
      it('when fetching pending', () => {
        const action = {type:loginUser.pending.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'loading', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
      it('when fetching fulfilled', () => {
        const action = {type:loginUser.fulfilled.type, payload:{name:'John', email:'test@test.ru'}}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'success', user:{name:'John', email:'test@test.ru'}, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
      it('when fetching rejected', () => {
        const action = {type:loginUser.rejected.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'failed', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
    })
    describe('refreshToken reducer', () => {
      it('when fetching fulfilled', () => {
        const action = {type:refreshToken.fulfilled.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'', user:null, refreshStatus:'success', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
    })
    describe('setUserData reducer', () => {
      it('when fetching pending', () => {
        const action = {type:setUserData.pending.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'loading', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
      it('when fetching fulfilled', () => {
        const action = {type:setUserData.fulfilled.type, payload:{success:true, user:{name:'John', email:'test@test.com'}}}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'success', user:{success:true, user:{name:'John', email:'test@test.com'}}, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
      it('when fetching rejected', () => {
        const action = {type:setUserData.rejected.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'failed', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
    })
    describe('getUserData reducer', () => {
      it('when fetching pending', () => {
        const action = {type:getUserData.pending.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'loading', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
      it('when fetching fulfilled', () => {
        const action = {type:getUserData.fulfilled.type, payload:{success:true, user:{name:'John', email:'test@test.com'}}}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'success', user:{success:true, user:{name:'John', email:'test@test.com'}}, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
      it('when fetching rejected', () => {
        const action = {type: getUserData.rejected.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'failed', user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
    })
    describe('logoutUser reducer', () => {
      it('when fetching fulfilled', () => {
        const action = {type:logoutUser.pending.type}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:null, user:null, refreshStatus:'', stateHistory:'', registerStatus:'', resetPasswordStatus:''})
      })
    })
  })
  describe('typical reducers', () => {
    describe('setForm reducer', () => {
      it('when name in payload', () => {
        const action = {type:setForm.type, payload:{name:'name', value:'John'}}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'', user:null, refreshStatus:'', stateHistory:'', name:'John', registerStatus:'', resetPasswordStatus:''})
      })
      it('when email in payload', () => {
        const action = {type:setForm.type, payload:{name:'email', value:'test@test.ru'}}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'', user:null, refreshStatus:'', stateHistory:'', email:'test@test.ru', registerStatus:'', resetPasswordStatus:''})
      })
    })
    describe('setStateHistory reducer', () => {
      it('when location-object in payload', () => {
        const action = {type:setStateHistory.type, payload:{pathname:'/profile', action:''}}
        const state = authSlice(initialState, action)
        expect(state).toEqual({status:'', user:null, refreshStatus:'', stateHistory:{pathname:'/profile', action:''}, registerStatus:'', resetPasswordStatus:''})
      })
    })
  })
})