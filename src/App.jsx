import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/authLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ConfirmAccount from './pages/auth/ConfirmAccount'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import './App.css'

function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthLayout />}>
                    <Route index element={<Login />}/>
                    <Route path='register' index element={<Register />}/>
                    <Route path='confirm/:token' index element={<ConfirmAccount />}/>
                    <Route path='forgot-password' index element={<ForgotPassword />}/>
                    <Route path='forgot-password/:token' index element={<ResetPassword />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
