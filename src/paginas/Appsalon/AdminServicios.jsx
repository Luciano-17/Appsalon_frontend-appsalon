import { useState } from "react"
import Formulario from "../../component/general/Formulario"
import ListadoServicios from "../../component/general/ListadoServicios"

const AdminServicios = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false)

    return (
        <>
            <h2 className="mt-20 text-center text-4xl font-bold">Administra tus <span className="text-purple-600">Servicios</span></h2>

            <div className='mt-14 flex flex-col items-center justify-center gap-4'>
                <h3 className="font-bold text-lg uppercase">Servicios</h3>

                <div className="w-full mt-10 flex flex-col md:flex-row px-6 md:px-0">
                    <button
                            type="button"
                            className='bg-purple-700 text-gray-200 font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden cursor-pointer'
                            onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                            {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
                    </button>

                    <div className="w-full flex flex-col md:flex-row md:items-start md:justify-evenly gap-16">
                        <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:block`}>
                            <Formulario />
                        </div>

                        <div className="">
                            <ListadoServicios />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminServicios