import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Footer from "../components/Footer";

function PrivateLayout() {

    const {auth} = useAuth();

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