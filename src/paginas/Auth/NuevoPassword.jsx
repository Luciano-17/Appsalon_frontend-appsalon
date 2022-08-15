import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import Titulo from "../../component/auth/Titulo"
import Alerta from "../../component/general/Alerta"
import clienteAxios from "../../config/axios"
import EvaluarInput from "../../helpers/EvaluarInput"

const NuevoPassword = () => {
    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    const params = useParams()
    const {token} = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/appsalon/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error en el enlace',
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        const passInput = document.querySelector('#password')
        EvaluarInput(password, passInput)

        if([password].includes('')) {
            setAlerta({
                msg: 'La contraseña es obligatoria',
                error: true
            })
            return
        }
        if(password.length < 6) {
            setAlerta({
                msg: 'La contraseña debe tener al menos 6 caracteres',
                error: true
            })
            return
        }

        try {
            const {data} = await clienteAxios.post(`/appsalon/olvide-password/${token}`, {password})
            setPasswordModificado(true)

            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alerta

    return (
        <>
            <Titulo mensaje={'Reestablece tu contraseña y no pierdas tu acceso a tu appsalón'} />

            <div className="bg-gray-700 px-4 py-6 shadow-md rounded-md w-11/12 md:w-8/12 lg:w-5/12 mt-12 md:mt-16">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='password'>Nueva contraseña</label>
                        <input 
                            type='password'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su contraseña"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    {msg && <Alerta alerta={alerta} />}

                    <input 
                        type='submit'
                        value='Cambiar contraseña'
                        className="font-bold uppercase shadow-md bg-purple-700 rounded-md w-full md:w-6/12 mx-auto px-2 py-4 cursor-pointer duration-300 hover:bg-purple-900 mt-8"
                    />
                </form>
            </div>

            <div className="py-8 w-full flex flex-col md:flex-row justify-around items-center gap-6 md:gap-0">
                {passwordModificado && (
                    <Link
                        className="duration-300 hover:text-purple-500"
                        to='/'>
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </>
    )
}

export default NuevoPassword