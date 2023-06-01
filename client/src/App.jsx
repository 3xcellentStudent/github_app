import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import RoutingComp from './RoutingComp/RoutingComp';

function App() {

   const AuthS = useSelector(state => state.AuthS)

   return(
      <div className="wrapper">
         <RoutingComp/>
      </div>
   )
}

export default App;
