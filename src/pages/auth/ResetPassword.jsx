import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AuthHeader from '../../components/authHeader'
import FormLayout from '../../components/FormLayout'
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

            <FormLayout>
                {loading &&
                    <p className='text-white text-center'>Loading...</p>
                }

                {message && 
                    <Alert alert={alert} />
                }

                {verifiedToken && 
                    <>
                        <form className='space-y-4' onSubmit={handleSubmit}>

                            <div className="flex flex-col space-y-2">
                                <label htmlFor="password" className="w-full text-slate-600 dark:text-slate-300 font-bold">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    className="p-2 bg-slate-100 dark:bg-slate-900 dark:text-slate-200 border border-slate-400 rounded-lg"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="confirm-password" className="w-full text-slate-600 dark:text-slate-300 font-bold">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Confirm password"
                                    className="p-2 bg-slate-100 dark:bg-slate-900 dark:text-slate-200 border border-slate-400 rounded-lg"
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
                                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:dark:text-slate-500 text-sm">
                                    Iniciar sesión
                                </Link>
                            </nav>
                        )}
                    </>
                }

            </FormLayout>
        </>
    )
}

export default ResetPassword