import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Titulo from "../../component/auth/Titulo"
import Nav from "../../component/auth/Nav"
import Alerta from "../../component/general/Alerta"

import EvaluarInput from "../../helpers/EvaluarInput"

import useAuth from '../../hooks/useAuth'
import clienteAxios from "../../config/axios"

const Login = () => {
    const [alerta, setAlerta] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        const emailInput = document.querySelector('#email')
        const passwordInput = document.querySelector('#password')
        EvaluarInput(email, emailInput)
        EvaluarInput(password, passwordInput)

        if([email, password].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        try {
            const {data} = await clienteAxios.post('/appsalon/login', {email, password})
            localStorage.setItem('token', data.token)
            setAuth(data)
            navigate('/admin')   
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
            <Titulo mensaje={'Inicia sesion para administrar tu salón'} />

            <div className="bg-gray-700 px-4 py-6 shadow-md rounded-md w-11/12 md:w-8/12 lg:w-5/12 mt-12 md:mt-16">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
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

                    {msg && <Alerta alerta={alerta} />}

                    <input 
                        type='submit'
                        value='Iniciar sesión'
                        className="font-bold uppercase shadow-md bg-purple-700 rounded-md w-full md:w-6/12 mx-auto px-2 py-4 cursor-pointer duration-300 hover:bg-purple-900 mt-8"
                    />
                </form>
            </div>

            <Nav link={['/registrar', '/olvide-password']} mensaje={['¿Aún no tienes una cuenta?', '¿Olvidaste tu contraseña?']} />
        </>
    )
}

export default Login