import {BrowserRouter, Routes, Route} from 'react-router-dom'

import AuthLayout from './layout/AuthLayout'
import AdminLayout from './layout/AdminLayout'

import Login from './paginas/Auth/Login'
import Registrar from './paginas/Auth/Registrar'
import ConfirmarCuenta from './paginas/Auth/ConfirmarCuenta'
import OlvidePassword from './paginas/Auth/OlvidePassword'
import NuevoPassword from './paginas/Auth/NuevoPassword'

import Admin from './paginas/Appsalon/Admin'
import AdminServicios from './paginas/Appsalon/AdminServicios'
import EditarPerfil from './paginas/Appsalon/EditarPerfil'
import CambiarPassword from './paginas/Appsalon/CambiarPassword'

import {AuthProvider} from './context/AuthProvider'
import {AdminProvider} from './context/AdminProvider'
import {ServiciosProvider} from './context/ServiciosProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <ServiciosProvider>
            <Routes>
              <Route path='/' element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path='registrar' element={<Registrar />} />
                <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
                <Route path='olvide-password' element={<OlvidePassword />} />
                <Route path='olvide-password/:token' element={<NuevoPassword />} />
              </Route>

              <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path='servicios' element={<AdminServicios />} />
                <Route path='perfil' element={<EditarPerfil />} />
                <Route path='cambiar-password' element={<CambiarPassword />} />
              </Route>
            </Routes>
          </ServiciosProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
