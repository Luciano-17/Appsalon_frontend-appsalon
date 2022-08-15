import { useState } from "react"

import Titulo from "../../component/auth/Titulo"
import Nav from "../../component/auth/Nav"
import Alerta from "../../component/general/Alerta"
import EvaluarInput from "../../helpers/EvaluarInput"
import clienteAxios from "../../config/axios"

const OlvidePassword = () => {
    const [alerta, setAlerta] = useState({})
    const [email, setEmail] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()

        const emailInput = document.querySelector('#email')
        EvaluarInput(email, emailInput)

        if([email].includes('')) {
            setAlerta({
                msg: 'El e-mail es obligatorio',
                error: true
            })
            return
        }

        try {
            const {data} = await clienteAxios.post('/appsalon/olvide-password', {email})
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
            <Titulo mensaje={'Ingresa tu e-mail y no pierdas el acceso a tu appsalón'} />

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

                    {msg && <Alerta alerta={alerta} />}

                    <input 
                        type='submit'
                        value='Enviar instrucciones'
                        className="font-bold uppercase shadow-md bg-purple-700 rounded-md w-full md:w-6/12 mx-auto px-2 py-4 cursor-pointer duration-300 hover:bg-purple-900 mt-8"
                    />
                </form>
            </div>

            <Nav link={['/', '/registrar']} mensaje={['¿Ya tienes una cuenta?', '¿Aún no tinenes una cuenta?']} />
        </>
    )
}

export default OlvidePassword