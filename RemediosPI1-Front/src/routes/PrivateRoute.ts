import { useNavigate } from 'react-router-dom'
import { ReactNode, useEffect } from 'react'

interface PrivateRouteProps {
  element: ReactNode
}

function PrivateRoute({ element }: PrivateRouteProps) {
  const navigate = useNavigate()
  const user = localStorage.getItem('remediosolidario:userLogin')

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true })
    }
  }, [user, navigate])

  return user ?  element  : null
}

export default PrivateRoute