import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axiosClient";

//definir el context
const AuthContext = createContext();

//definir el provider
const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const [tokenError, setTokenError] = useState('');

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

    if(loading) {
        return <p className="text-center text-gray-500">Cargando...</p>;
    }

    return(
        <AuthContext.Provider value={
            {
                auth,
                setAuth,
                loading,
                tokenError,
                logout
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