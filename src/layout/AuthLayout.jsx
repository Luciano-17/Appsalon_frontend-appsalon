import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto min-h-screen flex flex-col items-center justify-center">
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout