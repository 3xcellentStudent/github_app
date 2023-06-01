import {createSlice} from '@reduxjs/toolkit'

const AuthSlice = createSlice({
   name: 'authS',
   initialState: {},
   reducers: {
      setUser(state, action){
         state = action.payload
      }
   }
})

export const {setUser} = AuthSlice.actions
export default AuthSlice.reducer