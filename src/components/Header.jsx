import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {

    const location = useLocation()
    const {auth, logout} = useAuth();
    console.log(location);
    return (
        <header className="bg-indigo-600 dark:bg-zinc-800 p-2 shadow-xl">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
                <h1 className='text-zinc-200 dark:text-zinc-300 text-2xl text-center font-medium'>
                    Administrador de Pacientes de <span className="dark:text-indigo-500 font-black">Veterinaria</span>
                </h1>
                <nav className="flex flex-col md:flex-row md:gap-6 md:items-center text-center">
                    <div className="flex flex-col md:flex-row md:gap-3">

                        {location.pathname === '/admin' ? 

                            <Link
                                className="text-zinc-200 hover:text-white dark:text-zinc-300 text-lg font-bold"
                                to="/admin/profile"
                            >
                                {auth.name}
                            </Link>

                            :
                            <Link 
                                to="/admin"
                                className="text-zinc-200 hover:text-white dark:text-zinc-300 text-lg font-bold"
                            >
                                Mis Pacientes
                                
                            </Link>
                        }
                        
                        <button
                            className="text-zinc-200 dark:text-zinc-300 hover:text-red-300 cursor-pointer"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>

                </nav>
            </div>
        </header>
    )
}

export default Header