import { Outlet } from "react-router-dom";

function AuthLayout() {
    return(
        <>
            <div className="max-w-5xl h-screen mx-auto my-auto md:grid grid-cols-2 gap-12 items-center p-10">
                {/* En Outlet se inyecta el contenido de las rutas hijas */}
                <Outlet />
            </div>
        </>
    )
}

export default AuthLayout;