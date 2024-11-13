import { test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from './../../pages/Login'
import { BrowserRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import { UserProvider } from '../../hooks/UserContext'
import '@testing-library/jest-dom'

vi.mock('../../services/api', () => ({
  api: {
    post: vi.fn(),
  },
}))

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

test('Login form renders', () => {
  render(
    <BrowserRouter>
      <UserProvider>
        <Login />
      </UserProvider>
    </BrowserRouter>
  )

  expect(screen.getByLabelText('Login')).toBeInTheDocument()
  expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
})

test('Submit login function', async () => {
  (api.post as typeof api.post & { mockResolvedValueOnce: (arg0: { status: number; data: { nome: string; email: string } }) => void }).mockResolvedValueOnce({
    status: 200,
    data: { nome: 'Usuário', email: 'usuario@example.com' },
  })

  render(
    <BrowserRouter>
      <UserProvider>
        <Login />
      </UserProvider>
    </BrowserRouter>
  )

  fireEvent.change(screen.getByLabelText('Login'), {
    target: { value: 'usuario@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Senha'), {
    target: { value: 'senha123' },
  })

  fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith('Seja bem-vindo(a)!')
  })

  expect(api.post).toHaveBeenCalledWith('login', {
    email: 'usuario@example.com',
    senha: 'senha123',
  })
})
