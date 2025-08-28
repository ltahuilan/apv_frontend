import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider} from './context/AuthProvider';
import { PatientProvider } from './context/PatienteProvider';

//layouts
import AuthLayout from './layout/AuthLayout';
import PrivateLayout from './layout/PrivateLayout';

//Public pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ConfirmAccount from './pages/auth/ConfirmAccount';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

//Protected pages
import ManagePatients from './pages/admin/ManagePatients';
import Profile from './pages/admin/Profile';

//css
import './App.css'
import UpdatePassword from './pages/admin/UpdatePassword';


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public routes */}
                    <Route path='/' element={<AuthLayout />}>
                        <Route index element={<Login />}/>
                        <Route path='register' index element={<Register />}/>
                        <Route path='confirm/:token' index element={<ConfirmAccount />}/>
                        <Route path='forgot-password' index element={<ForgotPassword />}/>
                        <Route path='forgot-password/:token' index element={<ResetPassword />}/>
                    </Route>

                        {/*Private routes*/}                        
                        <Route path='/admin' element={
                            <PatientProvider>
                                <PrivateLayout />
                            </PatientProvider>
                        }>
                        <Route index element={<ManagePatients />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='update-password' element={<UpdatePassword />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
