import {configureStore} from '@reduxjs/toolkit'
import AuthSlice from './slices/AuthSlice'
import InputsData from './slices/InputsData'
import GitTokenSlice from './slices/GitTokenSlice'
import GitDataSlice from './slices/GitDataSlice'

export default configureStore({
   reducer: {
      AuthS: AuthSlice,
      InputsS: InputsData,
      GitTokenS: GitTokenSlice,
      GitDataS: GitDataSlice
   }
})