const Footer = () => {
    const fecha = new Date
    const añoActual = fecha.getFullYear('Y')

    return (
        <>
            <div className="text-xl mt-16 pb-5">
                <p className="text-center"><span className="font-bold text-purple-600">AppSalón</span> | &copy; {añoActual}</p>
            </div>
        </>
    )
}

export default Footer