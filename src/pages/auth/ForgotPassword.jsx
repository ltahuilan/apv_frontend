import { Link } from 'react-router-dom'
import { useState } from 'react'
import AuthHeader from '../../components/authHeader'
import ButtonSubmit from '../../components/ButtonSubmit'
import Alert from '../../components/Alert'
import axiosClient from '../../config/axiosClient'

function ForgotPassword() {

    const [alert, setAlert] = useState({});
    const [email, setEmail] = useState('');

    const {message} = alert;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/veterinarian/forgot-password', {email});
            setAlert({message: response.data.message});
        } catch (error) {
            setAlert({message: error.response.data.message, error: true})
        }
    }

    return (
        <>
            <AuthHeader text='Recupera tu cuenta para' />

            <div className='form-layout'>
                {message && 
                    <Alert alert={alert} />
                }

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="w-full text-zinc-600 dark:text-zinc-300 font-bold">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Your email"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mt-6">
                        <ButtonSubmit type='submit' value='Send instructions' />
                    </div>
                </form>

                <nav className="flex justify-between  mt-10">
                    <Link to="/register" className="text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-500 text-sm">
                        ¿No tienes cuenta? Regístrate
                    </Link>
                    <Link to="/" className="text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-500 text-sm">
                        ¿Ya tienes cuenta? Inicia sesión
                    </Link>
                </nav>
            </div>
        </>
    )
}

export default ForgotPassword