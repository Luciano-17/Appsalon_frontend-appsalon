import {useContext} from 'react'
import AdminContext from '../context/AdminProvider'

// Con el useContext podemos extraer los datos
const useAdmin = () => {
    return useContext(AdminContext)
}

export default useAdmin