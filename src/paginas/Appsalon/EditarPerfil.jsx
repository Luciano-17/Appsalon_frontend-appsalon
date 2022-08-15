import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Alerta from "../../component/general/Alerta"
import EvaluarInput from "../../helpers/EvaluarInput"

const EditarPerfil = () => {
    const {auth, actualizarPerfil} = useAuth()
    const [perfil , setPerfil] = useState({})
    const [alerta , setAlerta] = useState({})

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault()

        const {nombre, apellido, email, telefono} = perfil

        const nombreInput = document.querySelector('#nombre')
        const apellidoInput = document.querySelector('#apellido')
        const emailInput = document.querySelector('#email')
        const telefonoInput = document.querySelector('#telefono')
        EvaluarInput(nombre, nombreInput)
        EvaluarInput(apellido, apellidoInput)
        EvaluarInput(email, emailInput)
        EvaluarInput(telefono, telefonoInput)

        if([nombre, apellido, email, telefono].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const {msg} = alerta

    return (
        <>
            <h2 className="mt-20 text-center text-4xl font-bold">Administra tu <span className="text-purple-600">Perfil</span></h2>

            <div className="bg-gray-700 px-4 py-6 md:pr-8 shadow-md rounded-md w-11/12 md:w-8/12 lg:w-5/12 mt-12 md:mt-16 mx-auto">
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
                            name='nombre'
                            value={perfil.nombre || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='apellido'>Apellido</label>
                        <input 
                            type='text'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su apellido"
                            id="apellido"
                            name='apellido'
                            value={perfil.apellido || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='email'>E-mail</label>
                        <input 
                            type='email'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su e-mail"
                            id="email"
                            name='email'
                            value={perfil.email || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name] : e.target.value
                            })}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                        <label className="font-bold uppercase text-md md:text-lg cursor-pointer" htmlFor='telefono'>Teléfono</label>
                        <input 
                            type='tel'
                            className="w-full rounded-md p-2 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md"
                            placeholder="Ingrese su teléfono"
                            id="telefono"
                            name='telefono'
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil({
                                ...perfil,
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
                    to='/admin/cambiar-password'>
                    Cambiar contraseña
                </Link>
            </div>
        </>
    )
}

export default EditarPerfil