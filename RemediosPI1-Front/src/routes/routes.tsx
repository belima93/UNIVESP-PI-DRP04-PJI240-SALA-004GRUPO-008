import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Patient from '../pages/Patient'
import Medicine from '../pages/Medicament'
import Dispensation from '../pages/Dispensation'
import PatientRegistration from '../pages/PatientRegistration'
import MedicamentRegistration from '../pages/MedicamentRegistration'
import PrivateRoute from '../routes/PrivateRoute'

export default function AppRoutes() {
  return (
    <Routes>

      {/* Rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

      {/* Rotas privadas com autenticação */}
      <Route path="/home" element={<PrivateRoute element={<Home />} />}>     
        <Route path='paciente' element={<PrivateRoute element={<Patient />} />} />
        <Route path='lista-paciente' element={<PrivateRoute element={<PatientRegistration />} />} />
        <Route path="medicamento" element={<PrivateRoute element={<Medicine />} />} />
        <Route path='lista-medicamento' element={<PrivateRoute element={<MedicamentRegistration />} />} />
        <Route path="dispensacao" element={<PrivateRoute element={<Dispensation />} />} />
      </Route>

    </Routes>
  )
}
