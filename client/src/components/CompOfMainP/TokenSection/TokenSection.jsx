import React from "react";
import {useDispatch, useSelector} from 'react-redux'

import {setToken} from '../../../store/slices/GitTokenSlice'
import CallDatabase from '../../../Services/NetworkService'

import './TokenSection.scss'

export default function MainPage(){

   const GitTokenS = useSelector(state => state.GitTokenS.token)
   const dispatch = useDispatch()

   const [token, setTokenState] = React.useState('')
   
   const inputWrapper = React.useRef()
   const btnSave = React.useRef()
   
   React.useEffect(() => {
      console.log(!!GitTokenS)
      if(!GitTokenS) communicationDB.getTokenFromDB()
   }, [])

   class Styling{
      static add(){
         inputWrapper.current.classList.add('complete')
         btnSave.current.classList.add('complete')
      }
      static remove(){
         inputWrapper.current.classList.remove('complete')
         btnSave.current.classList.remove('complete')
      }
   }
      
   class communicationDB{
      static async postTokenToDB(e){
         e.preventDefault()
         const {user} = JSON.parse(localStorage.getItem('user'))
         const response = await CallDatabase.postToDB('git-token', {user, token})
         dispatch(setToken(response.gitToken))
      }
      static async getTokenFromDB(){
         const {user} = JSON.parse(localStorage.getItem('user'))
         const response = await CallDatabase.getFromDB('get-token', user)
         console.log(response)
         const {gitToken} = response
         if(gitToken){
            dispatch(setToken(gitToken))
            setTokenState(gitToken)
            Styling.add()
         }
         else Styling.remove()
      }
   }

   class changeInputWrapperStyle{
      static empty(){
         inputWrapper.current.classList.add('empty')
      }
      static notEmpty(){
         inputWrapper.current.classList.remove('empty')
      }
   }

   function inviteToken(e){
      const value = e.target.value
      setTokenState(value)
      if(value !== '') changeInputWrapperStyle.empty()
      else {
         changeInputWrapperStyle.notEmpty()
      }
   }

   return(
      <section className="main token">
         <div className="info-container">
               <p>
                  Follow the link and create 
                  <a href="https://github.com/settings/tokens/new" 
                  className="link-create-token" target="blank"> new Token </a>
                     or enter an exsiting Token:
               </p>    
         </div>
         <form className="token-form">
            <div ref={inputWrapper} className="input-wrapper">
                  <input placeholder="Invite Your Token:" onInput={e => inviteToken(e)}
                  className="input-auth" autoComplete="on" type="text" defaultValue={token} />
            </div>
            <button className="token-save" ref={btnSave}
            onClick={e => communicationDB.postTokenToDB(e)}>Save Token</button>
         </form>
      </section>
   )
}