import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";

function PrivateLayout() {

    const {auth, loading} = useAuth();

    if(loading) {
        return <Spinner message="Waiting..."/>
    }

    return (
        <>
            <Header />
                <main className="flex-grow">
                    {auth?._id ? <Outlet /> : <Navigate to='/'/>}
                </main>
            <Footer />            
        </>
    )
}

export default PrivateLayout