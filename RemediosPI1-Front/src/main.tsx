import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './styles/theme.ts'
import AppRoutes from './routes/routes.tsx'
import { UserProvider } from '../../RemediosPI1-Front/src/hooks/UserContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
      <ToastContainer autoClose={1300} theme="colored" />
    </ChakraProvider>
  </React.StrictMode>,
)
