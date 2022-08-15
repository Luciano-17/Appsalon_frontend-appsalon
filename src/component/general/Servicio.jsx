import useServicios from "../../hooks/useServicios"

const Servicio = ({servicio}) => {
    const {nombre, precio, _id} = servicio
    const {setEdicion, eliminarServicio} = useServicios()

    return (
        <>
            <div className="my-2 bg-gray-700 shadow-md px-6 py-2 rounded-md mb-5 flex flex-col md:flex-row gap-2 md:gap-10 items-center justify-between">
                <div className="flex flex-col">
                    <p className="font-normal uppercase">
                        Nombre: {""}
                        <span className="font-bold text-purple-600 normal-case">{nombre}</span>
                    </p>

                    <p className="font-normal uppercase">
                        Precio: {""}
                        <span className="font-bold text-purple-600 normal-case">${precio}</span>
                    </p>
                </div>

                <div className="flex flex-row md:flex-col text-3xl md:text-2xl gap-8 md:gap-2">
                    <button
                        className="text-green-600 duration-300 hover:text-green-800"
                        type='button'
                        onClick={() => setEdicion(servicio)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button
                        className="text-red-600 duration-300 hover:text-red-800"
                        type='button'
                        onClick={() => eliminarServicio(_id)}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Servicio