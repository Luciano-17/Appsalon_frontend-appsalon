const Alerta = ({alerta}) => {
    return (
        <>
            <div className={`${alerta.error ? 'bg-red-500' : 'bg-green-500'} rounded-md shadow-md text-center p-2 uppercase font-bold mt-5`}>
                {alerta.msg}
            </div>
        </>
    )
}

export default Alerta