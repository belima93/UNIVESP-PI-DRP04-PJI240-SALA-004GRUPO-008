import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
// import Register from '../pages/Register'
import Home from '../pages/Home'
import Patient from '../pages/Patient'
import Medicine from '../pages/Medicament'
import Dispensation from '../pages/Dispensation'
import PatientRegistration from '../pages/PatientRegistration'
import MedicamentRegistration from '../pages/MedicamentRegistration'
import { UserProvider } from '../hooks/UserContext'

export default function AppRoutes() {
  return (
    <UserProvider>
      <Routes>
        {/* <Route path="/" element={<Register />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route path='paciente' element={<Patient />} />
          <Route path='lista-paciente' element={<PatientRegistration />} />
          <Route path="medicamento" element={<Medicine />} />
          <Route path='lista-medicamento' element={<MedicamentRegistration />} />
          <Route path="dispensacao" element={<Dispensation />} />
        </Route>
      </Routes>
    </UserProvider>
  )
}
