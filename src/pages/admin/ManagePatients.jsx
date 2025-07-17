import { useState } from "react";
import FormPatients from "../../components/FormPatients";
import ListPatients from "../../components/ListPatients";

function ManagePatients() {

    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(!showForm)
    }

    return (
        <div className="text-white flex flex-col md:flex-row p-10">
            <div className="md:w-1/2 lg:w-2/5">              
                <button
                    className="md:hidden to-zinc-400 from-zinc-600 hover:to-zinc-600 hover:from-zinc-800 bg-gradient-to-tl text-white text-center font-bold transition-colors py-2 px-6 rounded-lg cursor-pointer mt-6"
                    onClick={() => handleClick()}
                >
                    {showForm ? 'Hide Form' : 'Show Form'}
                </button>
                
                <FormPatients
                    className={`${showForm ? 'block' : 'hidden'} md:block form-layout`}
                 />
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <ListPatients />
            </div>
        </div>
    )
}

export default ManagePatients