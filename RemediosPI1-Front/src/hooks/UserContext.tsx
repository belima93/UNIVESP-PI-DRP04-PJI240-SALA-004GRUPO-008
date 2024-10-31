/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface UserContextType {
  userData: Record<string, unknown>
  putUserData: (userLogin: Record<string, unknown>) => void
}

interface UserProviderProps {
  children: ReactNode
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<Record<string, unknown>>({})

  const putUserData = async (userLogin: Record<string, unknown>) => {
    setUserData(userLogin)

    await localStorage.setItem('remediosolidario:userLogin', JSON.stringify(userLogin))
  }

  useEffect(() => {
    const loadUserLogin = async () => {
      const loginInfo = await localStorage.getItem('remediosolidario:userLogin')

      if (loginInfo) {
        setUserData(JSON.parse(loginInfo))
        console.log('Dados do usuário carregados:', JSON.parse(loginInfo))
      }
    }

    loadUserLogin()
  }, [])


  return (
    <UserContext.Provider value={{ putUserData, userData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used with UserContext')
  }

  return context
}



