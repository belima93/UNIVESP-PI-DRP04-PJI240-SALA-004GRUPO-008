import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () => {
  const user = true   //To do: Context API, user verification, geting from API / Cookie

  return user ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes