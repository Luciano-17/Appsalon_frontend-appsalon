import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/axios'

const AdminContext = createContext()

const AdminProvider = ({children}) => {
    const [cargando, setCargando] = useState(true)
    const [citas, setCitas] = useState([])

    useEffect(() => {
        const obtenerCitas = async () => {
            const token = localStorage.getItem('token')

            if(!token) {
                setCargando(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.post('/appsalon/citas', config)
                setCitas(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setCitas({})
            }
            setCargando(false)
        }
        obtenerCitas()
    }, [])

    const eliminarCita = async id => {
        try {
            const {data} = await clienteAxios.delete(`/appsalon/eliminar-cita/${id}`)
            const citasActualizadas = citas.filter(citaState => citaState._id !== id)
            setCitas(citasActualizadas)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <AdminContext.Provider
            value={{
                cargando,
                citas,
                eliminarCita
            }}
        >
            {children}
        </AdminContext.Provider>
    )
}

export {AdminProvider}
export default AdminContext