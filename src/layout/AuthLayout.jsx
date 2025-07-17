import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function AuthLayout() {

    const {auth} = useAuth();

    return(
        <div className="max-w-5xl h-screen mx-auto my-auto md:grid grid-cols-2 gap-12 items-center p-10">
            {/* En Outlet se inyecta el contenido de las rutas hijas */}
            
            {auth?._id ? <Navigate to='/admin' /> : <Outlet /> }
        </div>
    )
}

export default AuthLayout;