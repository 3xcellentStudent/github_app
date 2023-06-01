import React from "react";
import {Route, Routes} from 'react-router-dom'
import LoginPage from "../pages/LoginPage/LoginPage";

export default function RoutingComp(){
   return(
      <Routes>
         <Route path="/" element={<LoginPage/>} />
      </Routes>
   )
}