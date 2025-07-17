import { useState } from 'react';
import ButtonSubmit from './ButtonSubmit';

function FormPatients({className}) {

    const [petName, setPetName] = useState('');
    const [namePetOwner, setNamePetOwner] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Guardando paciente');
    }

    return (
        <>
            <div className={className} >
                <h2 className='text-center text-zinc-800 dark:text-zinc-300 font-bold text-xl mb-6 uppercase'>
                    Add new patient
                </h2>
                <form className='space-y-4' onSubmit={handleSubmit}>
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
                            Name Pet Owner
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
                            id="petName"
                            placeholder="Discribe symptoms"
                            className="p-2 bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-400 rounded-lg"
                            value={symptoms}
                            onChange={e => setSymptoms(e.target.value)}
                        />
                    </div>

                    <ButtonSubmit
                        type={'submit'}
                        value={'Save'}
                        onSubmit={handleSubmit}
                    />
                </form>
            </div>
        </>
    )
}

export default FormPatients