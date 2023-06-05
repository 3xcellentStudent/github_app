import {createSlice} from '@reduxjs/toolkit'

const AuthSlice = createSlice({
   name: 'authS',
   initialState: {email: '', code: ''},
   reducers: {
      setEmail(state, action){state.email = action.payload},
      setCode(state, action){state.code = action.payload},
   }
})

export const {setEmail, setCode} = AuthSlice.actions
export default AuthSlice.reducer