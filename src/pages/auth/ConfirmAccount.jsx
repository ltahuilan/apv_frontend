import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthHeader from "../../components/authHeader";
import FormLayout from "../../components/FormLayout";
import Alert from "../../components/Alert";
import axiosClient from "../../config/axiosClient";


function ConfirmAccount() {

    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(true);
    const [confirmatedAccount, setConfirmatedAccount] = useState(false);

    const params = useParams();
    const {token} = params;

    useEffect(() => {
        const confirmAccount = async() => {
            try {
                const url = `/veterinarian/confirm/${token}`;
                const response = await axiosClient(url);
                setAlert({
                    message: response.data.message,
                    error: false
                });
                setConfirmatedAccount(true);
            } catch (error) {
                setAlert({
                    message: error.response.data.message,
                    error: true
                });
                setConfirmatedAccount(false);
            }
            setLoading(false);
        }
        confirmAccount();        
    }, [token]);
    
    return(
        <>
            <AuthHeader text='Confirma tu cuenta para ' />

            <FormLayout>
                {loading && <p className="text-white">Loading...</p>}

                {!loading && <Alert alert={alert} /> }

                {confirmatedAccount && 
                    <nav className="flex justify-center mt-10">
                        <Link to="/" className="text-slate-600 dark:text-slate-400 hover:dark:text-slate-500 text-sm">
                            Iniciar sesión
                        </Link>
                    </nav>               
                }
            </FormLayout>
        </>
    )
}

export default ConfirmAccount