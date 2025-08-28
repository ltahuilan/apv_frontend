import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

function PrivateLayout() {

    const {auth, loading} = useAuth();

    if(loading) return <Loading />;

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