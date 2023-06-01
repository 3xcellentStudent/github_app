import React from "react";
import {NavLink} from 'react-router-dom'
import SVGArrow from '../../components/SVG/SVGArrow'

import './AuthForm.scss'

export default function LoginPage(){

   const [email, setEmail] = React.useState('')
   const [password, setPassword] = React.useState('')

   const btnRef = React.useRef()

   function changeEmail(e){
      const value = e.target.value
      if(value.includes('@') && value.length > 7) btnRef.current.classList.add('active')
      else btnRef.current.classList.remove('active')
   }
   function changePassword(e){

   }

   return(
      <div className="container auth">
         <form className="form-auth">
            <div className="input-wrapper">
               <input placeholder="Email:" onInput={e => changeEmail(e)} type="text" className="input-auth" />
            </div>
            <div className="input-wrapper">
               <input placeholder="Password:" onInput={e => changePassword(e)} type="text" className="input-auth" />
            </div>
         </form>
      </div>
   )
}