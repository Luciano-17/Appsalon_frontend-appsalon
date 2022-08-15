import {useContext} from 'react'
import ServiciosContext from '../context/ServiciosProvider'

// Con el useContext podemos extraer los datos
const useServicios = () => {
    return useContext(ServiciosContext)
}

export default useServicios