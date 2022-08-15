import { Link } from "react-router-dom"

const Nav = ({link, mensaje}) => {
    return (
        <>
            <nav className="py-8 w-full flex flex-col md:flex-row justify-around items-center gap-6 md:gap-0">
                <Link
                    className="duration-300 hover:text-purple-500"
                    to={link[0]}>
                    {mensaje[0]}
                </Link>

                <Link
                    className="duration-300 hover:text-purple-500"
                    to={link[1]}>
                    {mensaje[1]}
                </Link>
            </nav>
        </>
    )
}

export default Nav