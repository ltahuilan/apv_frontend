import { Link} from "react-router-dom";
import { useState } from "react";
import axiosClient from "../../config/axiosClient";
import AuthHeader from "../../components/authHeader";
import FormLayout from "../../components/FormLayout";
import Alert from "../../components/Alert";
import ButtonSubmit from "../../components/ButtonSubmit";


function Register() {

    const [name, setName] = useState('');
    let [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState({});

    async function handleSubmit(e) {
        e.preventDefault();

        if( [name, email, password, confirmPassword].includes('') ) {
            setAlert({message: 'Todos los campos son requeridos', error: true});
            return;
        }

        if(password !== confirmPassword) {
            setAlert({message: 'Los passwords no son iguales', error: true});
            return;
        }

        if(password.length < 6) {
            setAlert({message: 'El password debe contener al menos 6 caracteres', error: true});
            return;
        }
        
        setAlert({});

        //enviar los datos hacia el backend
        try {
            email = email.toLowerCase();
            const url = `/veterinarian`;
            await axiosClient.post(url, {name, email, password, confirmPassword});
            setAlert({message: 'Hemos creado tu cuenta, revisa tu email', error: false});
        } catch (error) {
            setAlert({message: error.response.data.message, error: true });
            console.log(error.response.data.message);
        }
        
    }

    return(
        <>
            <AuthHeader text='Regístrate para' />

            <FormLayout>
                
                {alert.message && <Alert alert={alert} /> }

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="w-full text-slate-600 dark:text-slate-300 font-bold">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Your name"
                            className="p-2 bg-slate-100 dark:bg-slate-900 dark:text-slate-200 border border-slate-400 rounded-lg"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="w-full text-slate-600 dark:text-slate-300 font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Your email"
                            className="p-2 bg-slate-100 dark:bg-slate-900 dark:text-slate-200 border border-slate-400 rounded-lg"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="password" className="w-full text-slate-600 dark:text-slate-300 font-bold">
                            Password
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
                            Confirm Password
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
                        <ButtonSubmit type='submit' value='Register' onSubmit={handleSubmit} />
                    </div>
                </form>

                <nav className="flex justify-between  mt-10">
                    <Link to="/" className="text-slate-600 dark:text-slate-400 hover:dark:text-slate-500 text-sm">
                        ¿Ya tienes cuenta? Inicia sesión
                    </Link>
                    <Link to="/forgot-password" className="text-slate-600 dark:text-slate-400 hover:dark:text-slate-500 text-sm">
                        Olvide mi password
                    </Link>
                </nav>
            </FormLayout>
        </>
    )
}

export default Register;