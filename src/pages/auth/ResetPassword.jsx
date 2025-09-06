import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthHeader from '../../components/authHeader'
import ButtonSubmit from '../../components/ButtonSubmit'
import Alert from '../../components/Alert'
import axiosClient from '../../config/axiosClient'

function ResetPassword() {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(true);
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [verifiedToken, setVerifiedToken] = useState(false);
    const params = useParams();
    const {token} = params;
    const {message} = alert;

    //verificar que el token exista
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axiosClient(`/veterinarian/forgot-password/${token}`)
                setAlert({message: response.data.message, error: false});
                setVerifiedToken(true);
            } catch (error) {
                // setAlert({message: error});
                setAlert({message: error.response.data.message, error: true});
            }
            setLoading(false);
        }
        verifyToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!password) {
            setAlert({message: "El password es requerido", error: true});
            return;
        }

        if(password !== confirmPassword) {
            setAlert({message: "Los paswords no son coinciden", error: true});
            return;
        }

        try {
            const url = `/veterinarian/forgot-password/${token}`;
            const response = await axiosClient.post(url, {password});
            setAlert({message: response.data.message, error: false});
            setPasswordUpdated(true);
        } catch(error) {
            setAlert({message: error.response.data.message, error: true});
        }

        console.log('Cambiando password');
    }

    return (
        <>
            <AuthHeader text='Recupera tu password para' />

            <class className="form-layout">
                {loading &&
                    <p className="text-center text-gray-500">Cargando...</p>
                }

                {message && 
                    <Alert alert={alert} />
                }

                {verifiedToken && 
                    <>
                        <form className='space-y-4' onSubmit={handleSubmit}>

                            <div className="flex flex-col space-y-2">
                                <label htmlFor="password" className="w-full text-zinc-600 dark:text-zinc-300 font-bold">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="confirm-password" className="w-full text-zinc-600 dark:text-zinc-300 font-bold">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Confirm password"
                                    className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div className="mt-6">
                                <ButtonSubmit type='submit' value='Save new password' />
                            </div>
                        </form>

                        {passwordUpdated && (
                            <nav className="flex justify-center mt-10">
                                <Link to="/" className="text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-500 text-sm">
                                    Iniciar sesión
                                </Link>
                            </nav>
                        )}
                    </>
                }
            </class>
        </>
    )
}

export default ResetPassword