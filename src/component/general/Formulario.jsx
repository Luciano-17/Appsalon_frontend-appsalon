import {useState, useEffect} from 'react'
import Alerta from '../general/Alerta'
import useServicios from '../../hooks/useServicios'
import EvaluarInput from '../../helpers/EvaluarInput'

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const {guardarServicio, servicio} = useServicios()

    useEffect(() => {
        if(servicio?.nombre) {
            setNombre(servicio.nombre)
            setPrecio(servicio.precio)
            setId(servicio._id)
        }
    }, [servicio])

    const handleSubmit = e => {
        e.preventDefault()

        const nombreInput = document.querySelector('#nombre')
        const precioInput = document.querySelector('#precio')
        EvaluarInput(nombre, nombreInput)
        EvaluarInput(precio, precioInput)

        if([nombre, precio].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        guardarServicio({nombre, precio, id})
        setAlerta({
            msg: 'Guardado correctamente',
            error: false
        })

        setNombre('')
        setPrecio('')
        setId('')

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const {msg} = alerta

    return (
        <>
            <h2 className='font-bold text-lg text-center'>Administrador de servicios</h2>
            <p className='text-md mt-4 mb-5 text-center pb-5 border-b-2 border-gray-600'>
                Añade tus servicios y {""}
                <span className='text-purple-700 font-bold'>administralos</span>
            </p>

            <div className='bg-gray-700 px-2 md:pr-8 py-4 shadow-md rounded-md'>
                <form
                    className='flex flex-col gap-4'
                    onSubmit={handleSubmit}
                >
                    <div className='flex flex-col md:flex-row md:items-center gap-1 md:gap-4'>
                        <label className='label-admin font-bold uppercase text-md cursor-pointer' htmlFor='nombre'>Nombre</label>
                        <input 
                            type='text'
                            id='nombre'
                            placeholder='Nombre del servicio'
                            className='rounded-md p-1 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md'
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col md:flex-row md:items-center gap-1 md:gap-4'>
                        <label className='label-admin font-bold uppercase text-md cursor-pointer' htmlFor='precio'>Precio</label>
                        <input 
                            type='number'
                            id='precio'
                            placeholder='Precio del servicio'
                            className='rounded-md p-1 bg-gray-300 text-gray-800 border-2 outline-none focus:border-purple-500 focus:shadow-md'
                            value={precio}
                            onChange={e => setPrecio(e.target.value)}
                        />
                    </div>

                    {msg && <Alerta alerta={alerta} />}

                    <input 
                        type='submit'
                        value={id ? 'Guardar cambios' : 'Agregar servicio'}
                        className='font-bold uppercase shadow-md bg-purple-700 rounded-md w-full md:w-6/12 mx-auto py-2 cursor-pointer duration-300 hover:bg-purple-900 mt-2'
                    />
                </form>
            </div>
        </>
    )
}

export default Formulario