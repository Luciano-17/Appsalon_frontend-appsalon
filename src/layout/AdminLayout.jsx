import { Outlet } from "react-router-dom"

import Header from '../component/general/Header'
import Footer from '../component/general/Footer'

const AdminLayout = () => {
    return (
        <>
            <Header />

            <main className="container mx-auto">
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default AdminLayout