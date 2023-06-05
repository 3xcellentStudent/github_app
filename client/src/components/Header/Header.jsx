import React from "react";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import CallDatabase from "../../Services/NetworkService";
import './Header.scss'

export default function Header(props){

   const GitDataS = useSelector(state => state.GitDataS.data)

   const [data, setDataState] = React.useState({})

   const navigate = useNavigate()

   React.useEffect(() => {
      setDataState(GitDataS)
   }, [GitDataS])

   async function logOutFunc(e){
      const refreshToken = document.cookie
      await CallDatabase.logout('logout', refreshToken)
      navigate('/login')
   }

   return(
      <header>
         <div className="img-h3-container">
            <img src={data.avatar_url} alt="" />
         </div>
         <div className="h3-btn-container">
            <h3>Hello, {data.login} !</h3>
            <button className="logout" onClick={e => logOutFunc(e)}>Log Out</button>
         </div>
      </header>
   )
}