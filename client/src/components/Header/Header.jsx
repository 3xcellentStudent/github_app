import React from "react";
import {NavLink} from 'react-router-dom'
import './Header.scss'

export default function Header(props){
   return(
      <header>
         <h3>{props.title}</h3>
         <nav>
            <ul>
               <li>
                  <NavLink to="/">Home</NavLink>
               </li>
            </ul>
         </nav>
      </header>
   )
}