import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async () => {
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
                const {data} = await clienteAxios('/appsalon/admin', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
        navigate('/')
    }

    const actualizarPerfil = async datos => {
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
            const {data} = await clienteAxios.put(`/appsalon/perfil/${datos._id}`, datos, config)

            return {
                msg: 'Almacenado correctamente',
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async datos => {
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
            const {data} = await clienteAxios.put('/appsalon/cambiar-password', datos, config)

            return {
                msg: data.msg,
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }
    
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider}
export default AuthContext