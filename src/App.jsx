import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/authLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import './App.css'
import ConfirmAccount from './pages/auth/ConfirmAccount'

function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthLayout />}>
                    <Route index element={<Login />}/>
                    <Route path='register' index element={<Register />}/>
                    <Route path='confirm/:token' index element={<ConfirmAccount />}/>
                    <Route path='forgot-password/:token' index element={<ForgotPassword />}/>
                    <Route path='forgot-password' index element={<ForgotPassword />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
