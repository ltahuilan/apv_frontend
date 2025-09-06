import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import AdminNav from "../../components/AdminNav";
import ButtonPrimary from "../../components/ButtonPrimary";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";

function Profile() {
    const {auth, updateProfile} = useAuth();
    const [profile, setProfile] = useState({});
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setProfile(auth);
    }, [auth]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const {name, email, password} = profile;

        if([name, email].includes('')) {
            setAlert({message: 'Email y nombre son requeridos', error: true});
            setLoading(false);
            return;
        }

        if(!password) {
            setAlert({message: 'Debes proporcionar tu password', error: true});
            setLoading(false);
            return;
        }

        //limpiar los errores
        setAlert({});
        const response = await updateProfile(profile)

        console.log(response); 

        setAlert(response);
        setLoading(false);
    }

    return (
        <div>
            <AdminNav/>
            <h3 className="text-zinc-800 dark:text-zinc-200 text-2xl font-bold text-center">
                Profile
            </h3>
            <p className="text-zinc-800 dark:text-zinc-200 font-bold text-center">
                <span className="text-indigo-500">Actualiza </span> tus datos aquí
            </p>
            <div className="w-full sm:w-9/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mx-auto my-10 p-3">

                <form className="space-y-3 form-layout" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="name"
                            className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={profile.name || ''}
                            onChange={e => setProfile({...profile, [e.target.name] : e.target.value})}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="email"
                            className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={profile.email || ''}
                            onChange={e => setProfile({...profile, [e.target.name] : e.target.value})}
                        />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="phone"
                            className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase"
                        >
                            Phone
                        </label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            placeholder="Ej. 55 1234 5678"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={profile.phone || ''}
                            onChange={e => setProfile({...profile, [e.target.name] : e.target.value})}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="web"
                            className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase"
                        >
                            Website
                        </label>
                        <input
                            type="text"
                            id="web"
                            name="web"
                            placeholder="Ej. www.mywebsite.com / youtube.com/profile"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={profile.web || ''}
                            onChange={e => setProfile({...profile, [e.target.name] : e.target.value})}
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="password"
                            className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase"
                        >
                            Enter your password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Confirm your password"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={profile.password || ''}
                            onChange={e => setProfile({...profile, [e.target.name] : e.target.value})}
                        />
                    </div>

                    {alert.message &&
                        <Alert alert={alert}/>
                    }

                    {loading
                        ?
                        <Spinner />
                        :
                        <ButtonPrimary
                            type={'submit'}
                            label={'Update'}
                            className="mt-3"
                        />
                    }

                    
                </form>

            </div>
        </div>
    )
}

export default Profile