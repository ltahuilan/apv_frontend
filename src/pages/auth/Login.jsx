import { Link } from "react-router-dom";
import AuthHeader from "../../components/authHeader";
import FormLayout from "../../components/FormLayout";
import ButtonSubmit from "../../components/ButtonSubmit";


function Login() {
    return(
        <>
            <AuthHeader text='Inicia sesión para' />

            <FormLayout>
                <form className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="w-full text-slate-600 dark:text-slate-300 font-bold">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Your email"
                            className="p-2 bg-slate-100 dark:bg-slate-900 dark:text-slate-200 border border-slate-400 rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="w-full text-slate-600 dark:text-slate-300 font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Your password"
                            className="p-2 bg-slate-100 dark:bg-slate-900 dark:text-slate-200 border border-slate-400 rounded-lg"
                        />
                    </div>

                    <div className="mt-6">
                        <ButtonSubmit type='submit' value='Login' />
                    </div>
                </form>

                <nav className="flex justify-between  mt-10">
                    <Link to="/register" className="text-slate-600 dark:text-slate-400 hover:dark:text-slate-500 text-sm">
                        ¿No tienes cuenta? Regístrate
                    </Link>
                    <Link to="/forgot-password" className="text-slate-600 dark:text-slate-400 hover:dark:text-slate-500 text-sm">
                        Olvide mi password
                    </Link>
                </nav>

            </FormLayout>

        </>
    )
}

export default Login;