import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthHeader from "../../components/authHeader";
import ButtonSubmit from "../../components/ButtonSubmit";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import axiosClient from "../../config/axiosClient";
import { useEffect } from "react";


function Login() {

    let [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(false);
    const {setAuth, tokenError} = useAuth({});

    const navigate = useNavigate();

    useEffect(() => {
        const resetTokenExpired = () => {
            if(tokenError) {
                setAlert({message: tokenError, error: true})
                localStorage.removeItem('apv_token');
                return;
            }
            setAlert({});
        }
        resetTokenExpired();
    }, []);

    async function handleSubmit (e) {
        e.preventDefault();

        //validar que los campos no esten vacíos desde el front, evita consulta al backend
        if( [email, password].includes('') ) {
            setAlert({message: 'Todos los campos son requeridos [FRONT]', error: true});
            return;
        }

        setLoading(true);

        try {
            email = email.toLowerCase();
            const url = '/veterinarian/auth';
            const {data} = await axiosClient.post(url, {email, password},{});

            setAlert({message: data.message, error: false});

            //almacenar el token en local storage
            localStorage.setItem('apv_token', data.token);
            // console.log(data.token);
            //pasar los datos del usaurio al context 
            setAuth(data);

            //redireccionar
            navigate('/admin');
            
        } catch (error) {
            setAlert({message: error.response.data.message, error: true});
        }

        setLoading(false);
    }

    return(
        <>
            <AuthHeader text='Inicia sesión para' />

            <div className='form-layout'>

                {alert.message && !loading &&
                    <Alert alert={alert} />
                }

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="w-full text-zinc-600 dark:text-zinc-300 font-bold">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Your email"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="w-full text-zinc-600 dark:text-zinc-300 font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Your password"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mt-6">
                        {loading ? <Spinner /> : <ButtonSubmit type='submit' value='Login' />}
                    </div>
                </form>

                <nav className="flex justify-between  mt-10">
                    <Link to="/register" className="text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-500 text-sm">
                        ¿No tienes cuenta? Regístrate
                    </Link>
                    <Link to="/forgot-password" className="text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-500 text-sm">
                        Olvide mi password
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default Login;