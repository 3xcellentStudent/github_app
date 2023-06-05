import React from 'react'
import {useNavigate, Route, Routes} from 'react-router-dom'
// import {useDispatch, useSelector} from 'react-redux'
import AuthPage from './pages/AuthPage/AuthPage';
import RecoverForm from './components/AuthForm/RecoverForm';
import MainPage from './pages/MainPage/MainPage';

function App() {

   const navigate = useNavigate()

   React.useEffect(() => {isAuth()}, [])

   function isAuth(){
      const token = JSON.parse(localStorage.getItem('user'))
      if(!token) return navigate("/login")
   }

   return(
      <div className="wrapper">
         <Routes>
            <Route path='/' element={<MainPage/>} />

            <Route path="/login" element={<AuthPage
            data={{title: 'Log In', text: "Don't have an account ?", route: 'login', path: '/registration'}}/>} />

            <Route path="/registration" element={<AuthPage
            data={{title: 'Registration', text: "Do you have an account ?", 
            route: 'registration', path: '/login'}}/>} />

            <Route path="/reset" element={<AuthPage
            data={{title: 'Reset Password', text: "Back to Login", 
            route: 'reset-password', routeToNext: 'invite-code', path: '/login'}}/>} />

            <Route path="/invite-code" element={<AuthPage
            data={{title: 'Invite Code:', text: "Back", route: 'invite-code',
            routeToNext: 'recover', path: '/reset', pholder: 'Invite your code:'}}/>} />

            <Route path="/recover" element={<RecoverForm 
            data={{title: 'Recover Password:', text: "Back to Log In", route: 'recover-password', path: '/reset'}}/>} />
         </Routes>
      </div>
   )
}

export default App;
