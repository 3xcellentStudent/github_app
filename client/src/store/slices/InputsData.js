import {createSlice} from '@reduxjs/toolkit'

const InputsData = createSlice({
    name: 'authS',
    initialState: {
        email: '',
        code: '',
        password: '',
        confirmP: '',
    },
    reducers: {
        setEmail(state, action){
            state.email = action.payload
        },
        setCode(state, action){
            state.code = action.payload
        },
        setPass(state, action){
            state.password = action.payload
        },
        setConf(state, action){
            state.confirmP = action.payload
        },
    }
})

export const {setEmail, setCode, setPass, setConf} = InputsData.actions
export default InputsData.reducer