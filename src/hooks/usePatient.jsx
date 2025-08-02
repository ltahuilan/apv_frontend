import { useContext } from "react";
import PatientContext from "../context/PatienteProvider";

const usePatient = () => {
    return useContext(PatientContext);
}

export default usePatient;