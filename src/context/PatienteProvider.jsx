import { createContext, useState, useEffect } from "react";
import axiosClient from '../config/axiosClient';

//definción del contexto
const PatientContext = createContext();

//definición del provider
export const PatientProvider = ({children}) => {
    
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});
    const [success, setSuccess] = useState(false);

    //config
    
    //obtener todos los pacientes al cargar el componente
    useEffect(() => {
        
        const currentToken = localStorage.getItem('apv_token');
        if (!currentToken) {
            console.log("No token found, cannot save patient.");
            return;
        }
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${currentToken}`
            }
        }

        const getAllPatients = async() => {
            try {
                const {data} = await axiosClient.get('/patient/get-patients', config);
                setPatients(data);
            } catch (error) {
                console.log(error);
            }
        }
        
        getAllPatients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // con la dependencia patient cae un loop de renderizado


    //almacenar un paciente en la DB
    const savePatient = async (patientToSave) => {

        const currentToken = localStorage.getItem('apv_token'); //obtener el token fresco aquí
        if (!currentToken) {
            console.log("No token found, cannot save patient.");
            return;
        }
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${currentToken}`
            }
        }

        //actualizar un paciente
        if(patientToSave._id) {            
            try {
                const {data} = await axiosClient.put(`/patient/update/${patientToSave._id}`, patientToSave, config);
    
                //actualizar state de pacientes
                const patientsUpdated = patients.map(currentPatient => {
                    return currentPatient._id === data._id ? data : currentPatient
                });
                setPatients(patientsUpdated);
                console.log(patientsUpdated);
                // Opcional: limpiar el paciente de edición después de guardar
                setPatient({});
                
            } catch (error) {
                console.log("Error updating patient:", error.response?.data?.message || error.message);
                setSuccess(false);
            }

            return;
        }

        //crear nuevo paciente
        try {
            const {data} = await axiosClient.post('/patient/create', patientToSave, config);
            console.log(data)
            //excluir elementos de la respuesta (usar destructuring para mayor claridad)
            // eslint-disable-next-line no-unused-vars
            const {createdAt, updatedAt, __v, ...savedPatient} = data;
            console.log(savedPatient);
            //almacenar el paciente en el state
            setPatients([savedPatient, ...patients]);

            setSuccess(true);

        } catch (error) {
            console.log("Error creating patient:", error.response?.data?.message || error.message);
            setSuccess(false);
        }

    }

    const editPatient = (patientToEdit) => {
        setPatient(patientToEdit);
        // console.log('State de patien acualizado')
    }

    const resetPatient = () => {
        setPatient({});
    }

    const deletePatient = async (patienteIdToDelete) => {
        const confirmDelete = confirm('Eliminar el paciente?');

        if(confirmDelete) {
            console.log(`Eliminando...${patienteIdToDelete}`);
    
            const currentToken = localStorage.getItem('apv_token');
            if (!currentToken) {
                console.log("No token found, cannot save patient.");
                return;
            }
            const config = {
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${currentToken}`
                }
            }
    
            try {
                await axiosClient.delete(`/patient/delete/${patienteIdToDelete}`, config);
                const patientsUpdated = patients.filter(currentPatient => currentPatient._id !== patienteIdToDelete)
                setPatients(patientsUpdated);
            } catch (error) {
                console.log(error);
            }
        }

    }

    return(
        <PatientContext.Provider value={{
            patients,
            patient,
            success,
            savePatient,
            editPatient,
            resetPatient,
            deletePatient
        }}>
            {children}
        </PatientContext.Provider>
    )
}

export default PatientContext;