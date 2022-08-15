import { useState } from "react"

import Titulo from "../../component/auth/Titulo"
import Nav from "../../component/auth/Nav"
import Alerta from "../../component/general/Alerta"
import EvaluarInput from "../../helpers/EvaluarInput"
import clienteAxios from "../../config/axios"

const Registrar = () => {
    const [alerta, setAlerta] = useState({})

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        const nombreInput = document.querySelector('#nombre')
        const apellidoInput = document.querySelector('#apellido')
        const telefonoInput = document.querySelector('#telefono')
        const emailInput = document.querySelector('#email')
        const passwordInput = document.querySelector('#password')
        const password2Input = document.querySelector('#password2')
        EvaluarInput(nombre, nombreInput)
        EvaluarInput(apellido, apellidoInput)
        EvaluarInput(telefono, telefonoInput)
        EvaluarInput(email, emailInput)
        EvaluarInput(password, passwordInput)
        EvaluarInput(password2, password2Input)

        if([nombre, apellido, telefono, email, password, password2].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
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
        if(password !== password2) {
            setAlerta({
                msg: 'Las contraseñas no coinciden',
                error: true
            })
            return
        }

        setAlerta({})

        try {
            await clienteAxios.post('/appsalon/registrar', {email, nombre, apellido, telefono, password})
            setAlerta({
                msg:'Creado correctamente, revisa tu email',
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
            <Titulo mensaje={'Registra una nueva cuenta para tu salón'} />

            <div className="bg-gray-700 px-4 py-6 shadow-md rounded-md w-11/12 md:w-8/12 lg:w-5/12 mt-12 md:mt-16">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='nombre'>Nombre</label>
                        <input 
                            type='text'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su nombre"
                            id="nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='apellido'>Apellido</label>
                        <input 
                            type='text'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su apellido"
                            id="apellido"
                            value={apellido}
                            onChange={e => setApellido(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='telefono'>Teléfono</label>
                        <input 
                            type='tel'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su teléfono"
                            id="telefono"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='email'>E-mail</label>
                        <input 
                            type='email'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su E-mail"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='password'>Contraseña</label>
                        <input 
                            type='password'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su contraseña"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='password2'>Repite contraseña</label>
                        <input 
                            type='password'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Repite su contraseña"
                            id="password2"
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                        />
                    </div>

                    {msg && <Alerta alerta={alerta} />}

                    <input 
                        type='submit'
                        value='Crear cuenta'
                        className="font-bold uppercase shadow-md bg-purple-700 rounded-md w-full md:w-6/12 mx-auto px-2 py-4 cursor-pointer duration-300 hover:bg-purple-900 mt-8"
                    />
                </form>
            </div>

            <Nav link={['/', '/olvide-password']} mensaje={['¿Ya tienes una cuenta?', '¿Olvidaste tu contraseña?']} />
        </>
    )
}

export default Registrar