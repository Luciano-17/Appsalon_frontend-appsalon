import ServicioCita from "./ServicioCita"
import useAdmin from "../../hooks/useAdmin"

const Cita = ({cita}) => {
    const {eliminarCita} = useAdmin()
    const {nombre, fecha, hora, servicios, _id} = cita

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const fechaArray = fecha.split('-')

    const year = fechaArray[0]
    const mesIndex = fechaArray[1]
    const mes = meses[mesIndex - 1]
    const diaArray = fechaArray[2].split('T')
    const dia = diaArray[0]

    let totalPagar = 0
    servicios.forEach(servicio => {
        totalPagar += parseInt(servicio.precio)
    })

    const confirmarEliminacion = (id) => {
        const confirmar = confirm("¿Deseas eliminar la cita?")

        if(confirmar) {
            eliminarCita(id)
        }
    }

    return (
        <>
            <div className="bg-gray-700 px-4 py-2 rounded-md shadow-md font-bold text-purple-600">
                <li>
                    Nombre: <span className="font-normal text-gray-200">{nombre}</span>
                </li>
                <li>
                    Fecha: <span className="font-normal text-gray-200">El {dia} de {mes} del {year}</span>
                </li>
                <li>
                    Hora: <span className="font-normal text-gray-200">{hora} hs</span>
                </li>
                <li className="mt-5">
                    <ul>
                        {servicios.map(servicio => (
                            <ServicioCita key={servicio.id} servicio={servicio} />
                        ))}
                    </ul>
                </li>
                <li className="border-4 border-transparent border-t-gray-600 mt-2 pt-1 flex justify-between">
                    <p>Total a cobrar</p>
                    <p className="text-gray-200 font-normal">${totalPagar}</p>
                </li>

                <button
                    type='button'
                    className="bg-red-500 text-gray-200 px-4 py-1 rounded-md my-2 duration-300 hover:bg-red-700 w-full"
                    onClick={() => confirmarEliminacion(_id)}>
                    Eliminar cita
                </button>
            </div>
        </>
    )
}

export default Cita