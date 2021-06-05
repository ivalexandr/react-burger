import { createSlice } from '@reduxjs/toolkit'

const constructorSlice = createSlice({
  name: 'CONSTRUCTOR',
  initialState: {
    data: [],
    bun: null
  },
  reducers: {
    pushItem(state, { payload }) {
      state.data.push(payload)
    },
    setBuns(state, { payload }) {
      const index = state.data.findIndex(item => item.type === 'bun')
      if (index !== -1)
        state.data.splice(
          state.data.findIndex(item => item.type === 'bun'),
          1,
          payload
        )
      else state.data.push(payload)
    },
    setBun(state, { payload }) {
      state.bun = payload
    },
    sortArray(state, { payload }) {
      const { idFrom, idTo } = payload
      state.data.splice(idTo, 0, state.data.splice(idFrom, 1)[0])
    },
    removeItem(state, { payload }) {
      state.data.splice(payload, 1)
    }
  }
})

export default constructorSlice.reducer
export const { pushItem, setBuns, setBun, sortArray, removeItem } =
  constructorSlice.actions