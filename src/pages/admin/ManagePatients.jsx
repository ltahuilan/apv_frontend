import { useState } from "react";
import FormPatients from "../../components/FormPatients";
import ListPatients from "../../components/ListPatients";
import ButtonSecondary from "../../components/ButtonSecondary";

function ManagePatients() {

    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(!showForm)
    }

    return (
        <div className="text-white flex flex-col md:flex-row p-10">
            <div className="md:w-1/2 lg:w-2/5">
                
                <div className="flex justify-center md:hidden">
                    <ButtonSecondary
                        type={'button'}
                        label={showForm ? 'Hide Form' : 'Show Form'}
                        className={'md:hidden'}
                        onClick={handleClick}
                    />
                </div>
                
                <FormPatients
                    className={`${showForm ? 'block' : 'hidden'} md:block p-6`}
                 />
            </div>
            <div className="md:w-1/2 lg:w-3/5">                
                <ListPatients />
            </div>
        </div>
    )
}

export default ManagePatients