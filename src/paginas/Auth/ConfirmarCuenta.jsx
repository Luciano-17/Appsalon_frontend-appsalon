import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

import clienteAxios from "../../config/axios"
import Titulo from "../../component/auth/Titulo"
import Alerta from "../../component/general/Alerta"

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const navigate = useNavigate()

    const params = useParams()
    const{id} = params

    useEffect(() => {
        const cuentaConfirmada = async () => {
            try {
                const {data} = await clienteAxios(`/appsalon/confirmar/${id}`)
                setCuentaConfirmada(true)
                
                if(cuentaConfirmada) {
                    setAlerta({
                        msg: data.msg,
                        error: false
                    })
                    return
                }
            } catch (error) {
                if(!cuentaConfirmada) {
                    setAlerta({
                        msg: error.response.data.msg,
                        error: true
                    })
                    return
                }
            }

            setCargando(false)
        }
        cuentaConfirmada()
    }, [])

    setTimeout(() => {
        navigate('/')
    }, 5000);

    return (
        <>
            <Titulo mensaje={'Confirmar cuenta en appsalón'} />

            <div className="py-8 w-full flex flex-col md:flex-row justify-around items-center gap-6 md:gap-0">
                {!cargando &&  <Alerta alerta={alerta} />}
            </div>
        </>
    )
}

export default ConfirmarCuenta