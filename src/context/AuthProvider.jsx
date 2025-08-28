import { createContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import axiosClient from "../config/axiosClient";

//definir el context
const AuthContext = createContext();

//definir el provider
const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const [tokenError, setTokenError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem('apv_token');

            //Si no hay token, no hay nada que hacer, simplemente terminamos la carga
            if(!token) {
                setLoading(false);
                return;
            }

            //configuracion para auth JWT
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        
            try {
                const url = '/veterinarian/profile'
                const {data} = await axiosClient(url, config);
                setAuth(data);              

            } catch (error) {
                //esta respuesta proviene del middleware isAuthenticated
                // console.log(error.response.data.message);
                setTokenError(error.response.data.message);
                setAuth({});
                navigate('/admin');
            } finally {
                setLoading(false);
            }
        };
        authUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('apv_token');
        setAuth({});
    }

    const updateProfile = async (updatedProfile) => {
        const token = localStorage.getItem('apv_token');
        //Si no hay token, no hay nada que hacer, simplemente terminamos la carga
        if(!token) {
            setLoading(false);
            return;
        }

        //configuracion para auth JWT
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarian/profile/update/${updatedProfile._id}`;
            const {data} = await axiosClient.put(url, updatedProfile, config);
            //sincronizar con el state
            setAuth(data);
            return {message: "Datos actualizados correctamente", error: false}
        }catch(error) {
            return {message: error.response.data.message, error: true, status: error.status}
        }
        
    }

    const passwordChange = async (password) => {

        const token = localStorage.getItem('apv_token');
        //Si no hay token, no hay nada que hacer, simplemente terminamos la carga
        if(!token) {
            setLoading(false);
            return;
        }

        //configuracion para auth JWT
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarian/profile/update-password';
            const response = await axiosClient.put(url, password, config);
            return {message: response.data.message, error: false}
        }catch(error) {
            return {message: error.response.data.message, error: true, status: error.status}
        }

    }

    return(
        <AuthContext.Provider value={
            {
                auth,
                setAuth,
                loading,
                tokenError,
                logout,
                updateProfile,
                passwordChange
            }
        }>
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthProvider
};

export default AuthContext;