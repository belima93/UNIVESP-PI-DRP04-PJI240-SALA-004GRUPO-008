import { createContext, useContext, useState, ReactNode } from 'react'

interface UserContextType {
  userData: Record<string, unknown>
  putUserData: (userLogin: Record<string, unknown>) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<Record<string, unknown>>({})

  const putUserData = (userLogin: Record<string, unknown>) => (
    setUserData(userLogin)
  )

  return (
    <UserContext.Provider value={{ putUserData, userData}}>
      {children}
    </UserContext.Provider>
  )
}

