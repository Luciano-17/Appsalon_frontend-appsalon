import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/axios'

const ServiciosContext = createContext()

const ServiciosProvider = ({children}) => {
    const [servicios, setServicios] = useState([])
    const [servicio, setServicio] = useState({})

    useEffect(() => {
        const obtenerServicios = async () => {
            const token = localStorage.getItem('token')

            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.post('/appsalon/servicios', config)
                setServicios(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerServicios()
    }, [])

    const guardarServicio = async servicio => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(servicio.id) {
            try {
                const {data} = await clienteAxios.put(`/appsalon/servicio/${servicio.id}`, servicio, config)

                const servicioActualizado = servicios.map(servicioState => servicioState._id === data._id ? data : servicioState)
                setServicios(servicioActualizado)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const {data} = await clienteAxios.post('/appsalon/servicio/guardar', servicio, config)

                const {createdAt, updateAt, __v, ...servicioAlmacenado} = data
                setServicios([servicioAlmacenado, ...servicios])
            } catch (error) {
                console.log(error)
            }
        }
    }

    const setEdicion = servicio => {
        setServicio(servicio)
    }

    const eliminarServicio = async id => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?')
        if(confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios.delete(`/appsalon/servicio/${id}`, config)

                const serviciosActualizados = servicios.filter(servicioState => servicioState._id !== id)
                setServicios(serviciosActualizados)
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    return (
        <ServiciosContext.Provider
            value={{
                servicios,
                guardarServicio,
                setEdicion,
                servicio,
                eliminarServicio
            }}
        >
            {children}
        </ServiciosContext.Provider>
    )
}

export {ServiciosProvider}
export default ServiciosContext