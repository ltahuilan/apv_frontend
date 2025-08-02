import { createContext, useState, useEffect } from "react";
import axiosClient from '../config/axiosClient';

//definción del contexto
const PatientContext = createContext();

//definición del provider
export const PatientProvider = ({children}) => {
    
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({}); // Este es el paciente individual para edición
    const [success, setSuccess] = useState(false);

    //config
    const token = localStorage.getItem('apv_token');
    // Mueve la configuración a una función memoizada o al lugar donde se usa
    // para evitar que se recree en cada render si token cambia

    // obtener todos los pacientes al cargar el componente
    // Este useEffect solo debe ejecutarse una vez al montar, o cuando el token cambie si es que lo necesita.
    // La actualización de pacientes individuales se manejará directamente después de la operación PUT.
    useEffect(() => {
        // Asegúrate de que el token esté disponible antes de hacer la llamada
        const currentToken = localStorage.getItem('apv_token');
        if (!currentToken) {
            console.log("No token found, skipping patient fetch.");
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}`
            }
        };

        const getAllPatients = async() => {
            try {
                const {data} = await axiosClient.get('/patient/get-patients', config);
                setPatients(data);
            } catch (error) {
                console.log("Error fetching patients:", error);
                // Aquí podrías manejar un error de token inválido, etc.
            }
        }
        
        getAllPatients();
    }, []); // El array de dependencias vacío asegura que se ejecute solo una vez al montar.

    //almacenar un paciente en la DB
    const savePatient = async (patientToSave) => { // Renombré 'patient' a 'patientToSave' para mayor claridad
        const currentToken = localStorage.getItem('apv_token'); // Obtén el token fresco aquí
        if (!currentToken) {
            console.log("No token found, cannot save patient.");
            return;
        }

        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${currentToken}`
            }
        };

        //actualizar un paciente
        if(patientToSave.id) {
            try {
                const {data} = await axiosClient.put(`/patient/update/${patientToSave.id}`, patientToSave, config);
                // Aquí es donde actualizamos el estado de `patients`
                const patientsUpdated = patients.map(currentPatient => {
                    return currentPatient.id === data._id ? data : currentPatient; // Asegúrate de usar data._id si es lo que devuelve tu API
                });
                setPatients(patientsUpdated);
                // Opcional: limpiar el paciente de edición después de guardar
                setPatient({});
                setSuccess(true);
            } catch (error) {
                console.log("Error updating patient:", error.response?.data?.message || error.message);
                setSuccess(false);
            }
            return;
        }

        //crear nuevo paciente
        try {
            const {data} = await axiosClient.post('/patient/create', patientToSave, config);
            //excluir elementos de la respuesta (usar destructuring para mayor claridad)
            const {createdAt, updatedAt, __v, ...savedPatientData} = data;

            //almacenar el paciente en el state
            setPatients([savedPatientData, ...patients]);

            setSuccess(true);

        } catch (error) {
            console.log("Error creating patient:", error.response?.data?.message || error.message);
            setSuccess(false);
        }

    }

    const editPatient = (patientToEdit) => {
        setPatient(patientToEdit);
        console.log('State de patient actualizado');
    }

    const resetPatient = () => {
        setPatient({});
    }

    return(
        <PatientContext.Provider value={{ patients, savePatient, editPatient, patient, resetPatient, success }}>
            {children}
        </PatientContext.Provider>
    )
}

export default PatientContext;