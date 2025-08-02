import usePatient from "../hooks/usePatient";
import dateFormat from "../helpers/DateFormat";
import ButtonPrimary from "./ButtonPrimary";
import ButtonDanger from "./ButtonDanger"

function Patient({patient}) {

    const {_id, petName, namePetOwner, email, phone, date, symptoms, } = patient;

    const {editPatient, deletePatient} = usePatient();

    return (
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-2xl dark:shadow-zinc-950 space-y-1">
            <p className="text-indigo-500 dark:text-indigo-400 font-medium uppercase">Pet name:{' '}
                <span className="text-zinc-800 dark:text-zinc-300 font-bold normal-case">
                    {petName}
                </span>
            </p>
            <p className="text-indigo-500 dark:text-indigo-400 font-medium uppercase">Pet owner's name:{' '}
                <span className="text-zinc-800 dark:text-zinc-300 font-bold normal-case">
                    {namePetOwner}
                </span>
            </p>
            <p className="text-indigo-500 dark:text-indigo-400 font-medium uppercase">Email:{' '}
                <span className="text-zinc-800 dark:text-zinc-300 font-bold normal-case">
                    {email}
                </span>
            </p>
            <p className="text-indigo-500 dark:text-indigo-400 font-medium uppercase">Phone:{' '}
                <span className="text-zinc-800 dark:text-zinc-300 font-bold normal-case">
                    {phone}
                </span>
            </p>
            <p className="text-indigo-500 dark:text-indigo-400 font-medium uppercase">Registration date:{' '}
                <span className="text-zinc-800 dark:text-zinc-300 font-bold normal-case">
                    {dateFormat(date)}
                </span>
            </p>
            <p className="text-indigo-500 dark:text-indigo-400 font-medium uppercase">Symptoms:{' '}
                <span className="text-zinc-800 dark:text-zinc-300 font-bold normal-case">
                    {symptoms}
                </span>
            </p>

            <div className="flex flex-col md:flex-row md:justify-center gap-3 md:gap-10 mt-6">
                <ButtonPrimary type={'button'} label={'Edit'} onClick={() => editPatient(patient)}/>
                <ButtonDanger type={'button'} label={'Delete'} onClick={() => deletePatient(patient._id)}/>
            </div>
        </div>
    )
}

export default Patient