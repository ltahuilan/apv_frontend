import { useEffect, useState } from 'react';
import usePatient from '../hooks/usePatient';
import ButtonSecondary from './ButtonSecondary';
import Alert from './Alert';
import ButtonPrimary from './ButtonPrimary';

function FormPatients({className}) {

    const [petName, setPetName] = useState('');
    const [namePetOwner, setNamePetOwner] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [_id, setId] = useState(null);
    const [alert, setAlert] = useState({});

    const {patient, success, savePatient, resetPatient} = usePatient();
    // console.log('Render FormPatients.jsx');

    //detectar si el state patient ha cambiado
    useEffect(() => {
        
        const {_id, petName, namePetOwner, email, phone, date, symptoms} = patient;

        if(_id) {
            setPetName(petName);
            setNamePetOwner(namePetOwner);
            setEmail(email);
            setPhone(phone);
            setDate(date);
            setSymptoms(symptoms);
            setId(_id);
        }

        setAlert({});

    }, [patient]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //validar el formulario
        if([petName, namePetOwner, email, phone, date, symptoms].includes('')) {
            return setAlert({message: 'Todos los campos son obligatorios', error: true});
        }

        //reset alerta
        setAlert({});
        //reset form
        resetForm();
        //llamada a la función para almacenar el paciente
        savePatient({petName, namePetOwner, email, phone, date, symptoms, _id});
        
        if(success) {
            return setAlert({message: 'Paciente registrado correctamente', error: false});
        }
    }

    const resetForm = () => {
        setPetName('');
        setNamePetOwner('');
        setEmail('');
        setPhone('');
        setDate('');
        setSymptoms('');
        setId(null);
        resetPatient({});
    }

    return (
        <div className={className}>
            <h3 className='text-zinc-800 dark:text-zinc-200 text-3xl text-center font-bold'>
                Administra tus pacientes
            </h3>
            <p className='text-zinc-800 dark:text-zinc-200 text-xl text-center my-6'>
                Administra tus pacientes y citas
            </p>
            <form className='space-y-4 form-layout' onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="petName" className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase">
                        Pet Name
                    </label>
                    <input
                        type="text"
                        id="petName"
                        placeholder="Pet Name"
                        className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                        value={petName}
                        onChange={e => setPetName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label htmlFor="namePetOwner" className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase">
                        Pet owner's name
                    </label>
                    <input
                        type="text"
                        id="namePetOwner"
                        placeholder="Pet name Owner"
                        className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                        value={namePetOwner}
                        onChange={e => setNamePetOwner(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email address"
                        className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="phone" className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase">
                        Phone
                    </label>
                    <input
                        type="number"
                        id="phone"
                        placeholder="Phone number"
                        className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="date" className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                    />
                </div>

                <div className="flex flex-col space-y-2">
                    <label htmlFor="symptoms" className="w-full text-zinc-600 dark:text-zinc-300 font-bold uppercase">
                        Symptoms
                    </label>
                    <textarea
                        id="symptoms"
                        placeholder="Discribe symptoms"
                        className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                        value={symptoms}
                        onChange={e => setSymptoms(e.target.value)}
                    />
                </div>
                {alert.message &&
                    <Alert alert={alert}/>
                }

                <ButtonPrimary 
                    type={'submit'}
                    label={_id ? 'Update' : 'Save'}
                    className={!alert.message ? 'block' : 'opacity-25'}
                />

                {_id &&
                    <ButtonSecondary
                        type={'button'}
                        label={'Cancel'}
                        className={'w-full'}
                        onClick={resetForm}
                    />
                }
            </form>
        </div>
    )
}

export default FormPatients