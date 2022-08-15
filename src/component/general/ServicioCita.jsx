const ServicioCita = ({servicio}) => {
    const {nombre, precio} = servicio

    return (
        <>
            <div className="text-gray-200 font-normal flex justify-between gap-2 md:gap-4">
                <li>
                    {nombre}
                </li>
                <li>
                    ${precio}
                </li>
            </div>
        </>
    )
}

export default ServicioCita