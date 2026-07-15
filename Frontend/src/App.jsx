import React from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Route , Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'


export const serverUrl="http://localhost:8000"
function App() {
  return (
    <Routes>
      <Route path='/'  element={<SignIn/>}/>
      <Route path='/signup'  element={<SignUp/>}/>
      <Route path="/signin"  element={<SignIn/>}/>
      <Route path="/forgotpaasword"  element={<ForgotPassword/>}/>
      <Route path="/resetpassword/:token" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  )
}

export default App
