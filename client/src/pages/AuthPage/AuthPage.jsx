import React from "react";
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {setEmail, setCode} from "../../store/slices/AuthSlice";

import Link from "../../components/Link";
import CallDatabase from '../../Services/NetworkService'
import './AuthPage.scss'

export default function AuthPage(props){

   const dispatch = useDispatch()
   const AuthS = useSelector(state => state.AuthS)

   const [email, setEmailState] = React.useState('')
   const [password, setPassword] = React.useState('')
   const [message, setMessage] = React.useState('')
   const [inputValue, setInputValue] = React.useState('')

   const btnRef = React.useRef()
   const spanMsg= React.useRef()

   const navigate = useNavigate()

   React.useEffect(() => {
      setInputValue('')
      setMessage('')
      btnRef.current.classList.remove('active')
   }, [props])

   class ChangeBtnState{
      static add(){btnRef.current.classList.add('active')}
      static remove(){btnRef.current.classList.remove('active')}
   }

   function validation(value){
      if(props.data.route === 'invite-code'){
         if(AuthS.code === value && value.length === 4) ChangeBtnState.add()
         else ChangeBtnState.remove()
      }
      else {
         if(value.includes('@') && value.length > 7) ChangeBtnState.add()
         else ChangeBtnState.remove()
      }
   }

   class DataOfUser{
      static changeEmail(e){
         const value = e.target.value
         setEmailState(value)
         setInputValue(value)
         validation(value)
      }

      static changePassword(e){
         const value = e.target.value
         setPassword(value)
      }
   }

   async function handleClick(e){
      e.preventDefault()
      const pRoute = props.data.route
      const body = {email, password}
      if(pRoute !== 'invite-code'){
         const response = await CallDatabase.postToDB(pRoute, body)
         checkResponse(response)
      }
      else if(pRoute === 'invite-code'){
         return navigate('/recover')
      }
   }

   function checkResponse(response){
      const pRoute = props.data.route
      if(!response.accessToken && !response.code){
         setMessage(response)
         spanMsg.current.classList.add('error')
      }
      else if(pRoute === 'registration' && response.accessToken){
         setMessage(`Check your email: ${email}`)
         spanMsg.current.classList.add('complete')
      }
      else if(pRoute === 'login' && response.accessToken){
         localStorage.setItem('user', JSON.stringify({user: response.user.id, token: response.accessToken}))
         return navigate('/')
      }
      else if(pRoute === 'reset-password'){
         localStorage.setItem('token', JSON.stringify(response.accessToken))
         dispatch(setCode(response.code))
         dispatch(setEmail(email))
         return navigate('/invite-code')
      }
   }

   return(
      <main className="container auth">
         <form className="form-auth">
            <h1>{props.data.title}</h1>
            <span ref={spanMsg} className="span-message">{message}</span>
            <div className="input-wrapper">
               <input placeholder={props.data.pholder || "Email:"} onInput={e => DataOfUser.changeEmail(e)}
               value={inputValue} className="input-auth" type={"email"} />
            </div>
            {props.data.route !== 'reset-password' && props.data.route !== 'invite-code' ?
            <div className="input-wrapper">
               <input placeholder="Password:" onInput={e => DataOfUser.changePassword(e)} 
               type="password" className="input-auth" />
            </div> : null
            }
            <button ref={btnRef} className="btn-submit" onClick={e => handleClick(e)}>Submit</button>
            <Link text={props.data.text} path={props.data.path} />
            {props.data.route === 'login' ?
               <Link path="/reset" text="Forget your password ?" /> : null 
            }
         </form>
      </main>
   )
}