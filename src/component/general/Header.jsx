import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const Header = () => {
    const {cerrarSesion} = useAuth()

    return (
        <>
            <header className="px-2 py-2 md:py-4 flex justify-center items-center relative">
                <div className="hidden md:fixed top-0 md:flex justify-around items-center shadow-md bg-gray-300 text-gray-800 mx-auto w-full py-4">
                    <div>
                        <Link
                            className="text-2xl md:text-4xl font-bold cursor-pointer duration-300 hover:text-purple-700"
                            to='/admin'>
                            TuLogo
                        </Link>
                    </div>

                    <nav className="flex gap-2 md:gap-6 text-xl">
                        <Link
                            className="md:font-bold duration-300 hover:text-purple-700"
                            to='/admin/servicios'>
                            Servicios
                        </Link>
                        
                        <Link
                            className="md:font-bold duration-300 hover:text-purple-700"
                            to='/admin/perfil'>
                            Perfil
                        </Link>

                        <button
                            type='button'
                            className="md:font-bold duration-300 hover:text-purple-700"
                            onClick={cerrarSesion}>
                            Cerrar sesión
                        </button>
                    </nav>
                </div>

                <div className="fixed md:hidden top-2 bg-gray-300 text-gray-800 w-11/12 rounded-full mx-auto px-2 py-2 mt-2 shadow-md">
                    <div className="flex gap-4 justify-between">
                        <Link 
                            to='/admin'>
                            <div className="flex flex-col items-center justify-center gap-1 duration-300 hover:text-purple-700">
                                <i className="fa-solid fa-grip"></i>
                                <p className="text-sm">Admin</p>
                            </div>
                        </Link>
                        
                        <Link 
                            to='/admin/servicios'>
                            <div className="flex flex-col items-center justify-center gap-1 duration-300 hover:text-purple-700">
                                <i className="fa-solid fa-grip"></i>
                                <p className="text-sm">Servicios</p>
                            </div>
                        </Link>

                        <Link 
                            to='/admin/perfil'>
                            <div className="flex flex-col items-center justify-center gap-1 duration-300 hover:text-purple-700">
                                <i className="fa-solid fa-align-left"></i>
                                <p className="text-sm">Perfil</p>
                            </div>
                        </Link>

                        <Link 
                            to='/'>
                            <div className="flex flex-col items-center justify-center gap-1 duration-300 hover:text-purple-700">
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <p className="text-sm">Cerrar sesión</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header