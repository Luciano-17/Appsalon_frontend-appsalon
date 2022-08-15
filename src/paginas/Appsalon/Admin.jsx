import useAdmin from'../../hooks/useAdmin'

import Cita from '../../component/general/Cita'

const Admin = () => {
    const {citas} = useAdmin()

    return (
        <>
            <h2 className="mt-20 text-center text-4xl font-bold">Administra tu <span className="text-purple-600">AppSalón</span></h2>

            <div className='mt-14 flex flex-col items-center justify-center gap-4'>
                <h3 className="font-bold text-lg uppercase">Citas</h3>

                {!citas.length ? (
                    <p className='text-center'>No hay citas registradas</p>
                ) : (
                    <ul className='flex flex-col gap-4 md:grid md:grid-cols-2 md:place-items-center md:gap-6 lg:gap-10'>
                        {citas.map(cita => (
                            <Cita key={cita._id} cita={cita} />
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}

export default Admin