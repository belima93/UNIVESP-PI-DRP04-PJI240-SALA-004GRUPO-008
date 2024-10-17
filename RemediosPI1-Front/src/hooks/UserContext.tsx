/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from 'react'

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

  const putUserData = (userLogin: Record<string, unknown>) => (
    setUserData(userLogin)
  )

  return (
    <UserContext.Provider value={{ putUserData, userData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if(!context) {
    throw new Error('useUser must be used with UserContext')
  }

  return context
}



