import axios from "axios"

//crea diferentes instancias de axios cada vez que se llama
// function axiosClient() {
//     return axios.create({
//         baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
//     });
// }


//crea una única instancia de axios para toda la aplicación
const axiosClient = axios.create ({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default axiosClient