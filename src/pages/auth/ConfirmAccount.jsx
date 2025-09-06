import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../../config/axiosClient";
import AuthHeader from "../../components/authHeader";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";


function ConfirmAccount() {

    const [alert, setAlert] = useState({});
    const [waitingResponse, setWaitingResponse] = useState(true);
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
            setWaitingResponse(false);
        }
        confirmAccount();        
    }, [token]);
    
    return(
        <>
            <AuthHeader text='Confirma tu cuenta para ' />

            <div className="form-layout">
                {waitingResponse && <Spinner />}

                {!waitingResponse && <Alert alert={alert} /> }

                {confirmatedAccount && 
                    <nav className="flex justify-center mt-10">
                        <Link to="/" className="text-zinc-600 dark:text-zinc-400 hover:dark:text-zinc-500 text-sm">
                            Iniciar sesión
                        </Link>
                    </nav>               
                }
            </div>
        </>
    )
}

export default ConfirmAccount