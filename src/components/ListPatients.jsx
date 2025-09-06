import usePatient from '../hooks/usePatient';
import Patient from './Patient';


function ListPatients() {

    const {patients} = usePatient();
    // console.log('render ListPatients.jsx');

    return (
        <>
            {patients.length ?
                (
                    <div className='p-6'>
                        <h3 className='text-zinc-800 dark:text-zinc-200 text-3xl text-center font-bold'>
                            Listado de pacientes
                        </h3>
                        <p className='text-zinc-800 dark:text-zinc-200 text-xl text-center my-6'>
                            Administra tus pacientes y citas
                        </p>

                        <div className='space-y-6'>
                            {patients.map(patient => (
                                <Patient
                                    key={patient._id}
                                    patient={patient}
                                />
                            ))}
                        </div>
                    </div>
                )
                :
                (
                <>
                    <h3 className='text-zinc-800 dark:text-zinc-200 text-3xl text-center font-bold'>
                        No hay pacientes
                    </h3>
                    <p className='text-zinc-800 dark:text-zinc-200 text-xl text-center mt-6'>
                        Agrega pacientes para comenzar a administrar tus citas
                    </p>                    
                </>
            )}
        </>
    )
}

export default ListPatients