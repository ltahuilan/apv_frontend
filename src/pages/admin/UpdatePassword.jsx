import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import AdminNav from "../../components/AdminNav";
import ButtonPrimary from "../../components/ButtonPrimary";
import Alert from "../../components/Alert";

function UpdatePassword() {

    const {passwordChange} = useAuth();
    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {newPassword, confirmPassword} = password;
        
        //validar que no haya campos vacíos
        if(!Object.values(password).every(value => value !== '')) {
            return setAlert({message: 'Todos los campos son requeridos', error: true});            
        }
        
        //validar que el nuevo password contenga al menos 6 caracteres
        if(newPassword.length < 6) {
            return setAlert({message: 'El nuevo password requiere al menos 6 caracteres', error: true});
        }

        //verificar que newPassword y confirmPassword coincidan
        if(newPassword !== confirmPassword) {
            return setAlert({message: 'Los passwords no coinciden', error: true});
        }
        
        const response = await passwordChange(password);

        if(response.status === 401) {
            setPassword({...password, currentPassword: ''});
        }

        if(response.status === 200) {
            setPassword({currentPassword: "", newPassword: "", confirmPassword: ""});
        }

        setAlert(response);
        
    }
    return (
        <>
            <AdminNav/>
            <h3 className="text-zinc-800 dark:text-zinc-200 text-2xl font-bold text-center">
                Update password
            </h3>
            <p className="text-zinc-800 dark:text-zinc-200 font-bold text-center">
                <span className="text-indigo-500">Cambia</span> tu password aquí
            </p>

            <div className="w-full sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto my-10 p-3">

                <form className="space-y-3 form-layout" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="currentPassword"
                            className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase"
                        >
                            Current password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Your current password"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={password.currentPassword || ''}
                            onChange={e => setPassword({...password, [e.target.name] : e.target.value })}

                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="newPassword"
                            className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase"
                        >
                            New password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Your new password"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={password.newPassword || ''}
                            onChange={e => setPassword({...password, [e.target.name] : e.target.value})}
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="confirmPassword"
                            className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase"
                        >
                            Confirm new password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your new password"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={password.confirmPassword || ''}
                            onChange={e => setPassword({...password, [e.target.name] : e.target.value})}
                        />
                    </div>

                    {alert.message &&
                        <Alert alert={alert}/>
                    }

                    <ButtonPrimary
                        type={"submit"}
                        label={"Update"}
                        className="mt-3"
                    />
                </form>

            </div>
        </>
    )
}

export default UpdatePassword