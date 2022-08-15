import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../../component/general/Alerta"
import useAuth from "../../hooks/useAuth"
import EvaluarInput from "../../helpers/EvaluarInput"

const CambiarPassword = () => {
    const {guardarPassword} = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        passActual: '',
        passNuevo: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        const passActualInput = document.querySelector('#passActual')
        const passNuevoInput = document.querySelector('#passNuevo')
        EvaluarInput(password.passActual, passActualInput)
        EvaluarInput(password.passNuevo, passNuevoInput)

        if(Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        if(password.passNuevo.length < 6) {
            setAlerta({
                msg: 'La contraseña debe contener al menos 6 caracteres',
                error: true
            })
            return
        }

        const resultado = await guardarPassword(password)
        setAlerta(resultado)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const {msg} = alerta

    return (
        <>
            <h2 className="mt-20 text-center text-4xl font-bold">Modifica tu <span className="text-purple-600">Contraseña</span></h2>

            <div className="bg-gray-700 px-4 py-6 md:pr-8 shadow-md rounded-md w-11/12 md:w-8/12 lg:w-5/12 mt-12 md:mt-16 mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='passActual'>Contraseña actual</label>
                        <input 
                            type='password'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su actual contraseña"
                            id="passActual"
                            name='passActual'
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='passNuevo'>Contraseña nueva</label>
                        <input 
                            type='password'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su nueva contraseña"
                            id="passNuevo"
                            name='passNuevo'
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    {msg && <Alerta alerta={alerta} />}

                    <input 
                        type='submit'
                        value='Guardar cambios'
                        className="font-bold uppercase shadow-md bg-purple-700 rounded-md w-full md:w-6/12 mx-auto p-2 cursor-pointer duration-300 hover:bg-purple-900 mt-5"
                    />
                </form>
            </div>

            <div className="w-full text-center mt-10">
                <Link
                    className="text-center duration-300 hover:text-purple-500"
                    to='/admin/perfil'>
                    Perfil
                </Link>
            </div>
        </>
    )
}

export default CambiarPassword