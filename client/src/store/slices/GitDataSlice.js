import {createSlice} from '@reduxjs/toolkit'

const GitDataSlice = createSlice({
   name: 'gitToken',
   initialState: {data: {}},
   reducers: {
      setData(state, action){state.data = action.payload},
   }
})

export const {setData} = GitDataSlice.actions
export default GitDataSlice.reducer