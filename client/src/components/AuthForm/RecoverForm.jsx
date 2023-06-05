import React from "react";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import CallDatabase from '../../Services/NetworkService'
import Link from "../Link";

export default function AuthForm(props){

   const AuthS = useSelector(state => state.AuthS)

   const [password, setPassword] = React.useState('')

   const passRef = React.useRef()
   const confRef = React.useRef()
   const btnRef = React.useRef()

   const navigate = useNavigate()

   class DataOfUser{
      static newPassword(e){
         const len = e.target.value.length
         if(len === 4) comparePassword()
      }
      static confirmPassword(e){
         const len = e.target.value.length
         if(len === 4) comparePassword()
      }
   }

   function comparePassword(){
      const passwordR = passRef.current.value
      const confirmR = confRef.current.value
      if(passwordR === confirmR){
         setPassword(passwordR)
         btnRef.current.classList.add('active')}
      else btnRef.current.classList.remove('active')
   }

   async function handleClick(e){
      e.preventDefault()
      const pRoute = props.data.route
      const body = {email: AuthS.email, password}

      const response = await CallDatabase.postToDB(pRoute, body)
      checkResponse(response)
   }

   function checkResponse(response){
      localStorage.setItem('token', JSON.stringify(response.token))
      return navigate("/login")
   }

   return(
      <div className="container auth">
         <form className="form-auth">
            <h1>Recover Password</h1>
            <div className="input-wrapper">
               <input placeholder="New Password:" ref={passRef} onInput={e => DataOfUser.newPassword(e)}
                type="password" className="input-auth" />
            </div>
            <div className="input-wrapper">
               <input placeholder="Confirm Password:" ref={confRef} onChange={e => DataOfUser.confirmPassword(e)} 
               type="password" className="input-auth" />
            </div>
            <button ref={btnRef} className="btn-submit" onClick={e => handleClick(e)}>Submit</button>
            <Link text="Back to get code" path="/invite-code" />
            <Link text="Back to login" path="/login" /> 
         </form>
      </div>
   )
}