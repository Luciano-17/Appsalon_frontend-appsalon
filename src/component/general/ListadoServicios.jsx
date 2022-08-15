import useServicios from "../../hooks/useServicios"
import Servicio from "./Servicio"

const ListadoServicios = () => {
    const {servicios} = useServicios()

    return (
        <>
            {servicios.length ? (
                <>
                    <h2 className='font-bold text-lg text-center'>Listado de servicios</h2>
                    <p className='text-md mt-4 mb-5 text-center pb-5 border-b-2 border-gray-600'>
                        Administra tus {""}
                        <span className='text-purple-700 font-bold'>servicios</span>
                    </p>

                    {servicios.map(servicio => (
                        <Servicio key={servicio._id} servicio={servicio} />
                    ))}
                </>
            ) : (
                <>
                    <h2 className='font-bold text-lg text-center'>No hay servicios</h2>
                    <p className='text-md mt-4 mb-5 text-center'>
                        Comienza agregando tus {""}
                        <span className='text-purple-700 font-bold'>servicios</span>
                    </p>
                </>
            )}
        </>
    )
}

export default ListadoServicios