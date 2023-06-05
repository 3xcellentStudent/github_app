import {createSlice} from '@reduxjs/toolkit'

const GitTokenSlice = createSlice({
   name: 'gitToken',
   initialState: {token: ''},
   reducers: {
      setToken(state, action){state.token = action.payload},
   }
})

export const {setToken} = GitTokenSlice.actions
export default GitTokenSlice.reducer