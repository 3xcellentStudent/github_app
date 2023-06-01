import React from "react";
import Header from '../../components/Header/Header'
import AuthForm from '../../components/AuthForm/AuthForm'

import './LoginPage.scss'

export default function LoginPage(){



   return(
      <div className="container">
         <Header title={"Log In"} />
         <AuthForm/>
      </div>
   )
}