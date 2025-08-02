import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {

    const {logout} = useAuth();

    return (
        <header className="bg-indigo-600 dark:bg-zinc-800 p-2 shadow-xl">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
                <h1 className='text-zinc-200 dark:text-zinc-300 text-2xl text-center font-medium'>
                    Administrador de Pacientes de <span className="dark:text-indigo-500 font-black">Veterinaria</span>
                </h1>
                <nav className="flex flex-col md:flex-row md:gap-6 md:items-center text-center">
                    <div className="flex flex-col md:flex-row md:gap-3">
                        <Link className="text-zinc-200 hover:text-white dark:text-zinc-300 text-lg font-bold">
                            Pacientes
                        </Link>
                        <Link className="text-zinc-200 hover:text-white dark:text-zinc-300 text-lg font-bold">
                            Perfil
                        </Link>
                    </div>
                    <button
                        className="text-zinc-200 dark:text-zinc-300 hover:text-red-300 font-light cursor-pointer"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header