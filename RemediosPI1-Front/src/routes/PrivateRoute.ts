import { useNavigate } from 'react-router-dom'
import { ReactNode, useEffect, useState } from 'react'

interface PrivateRouteProps {
  element: ReactNode
}

function PrivateRoute({ element }: PrivateRouteProps) {
  const navigate = useNavigate()
  const [user, setUser] = useState<string | null>(localStorage.getItem('remediosolidario:userLogin'))

  useEffect(() => {
    const storedUser = localStorage.getItem('remediosolidario:userLogin')

    console.log('User from localStorage:', storedUser)

    setUser(storedUser)

    if (!storedUser) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  return user ? element : null
}

export default PrivateRoute