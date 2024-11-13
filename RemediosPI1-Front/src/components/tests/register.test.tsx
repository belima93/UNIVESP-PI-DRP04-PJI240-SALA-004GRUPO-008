import { test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Register from '../../pages/Register'
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

test('Register form renders', () => {
  render(
    <BrowserRouter>
      <UserProvider>
        <Register />
      </UserProvider>
    </BrowserRouter>
  )

  expect(screen.getByLabelText('Nome')).toBeInTheDocument()
  expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
  expect(screen.getByLabelText('Senha')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument()
})

test('Submit register function', async () => {
  (api.post as typeof api.post & { mockResolvedValueOnce: (arg0: { status: number; data: { nomeUsuario: string; senha: string; email: string } }) => void }).mockResolvedValueOnce({
    status: 200,
    data: { nomeUsuario: 'Usuário', senha: 'usuario123', email: 'usuario@example.com' },
  })

  render(
    <BrowserRouter>
      <UserProvider>
        <Register />
      </UserProvider>
    </BrowserRouter>
  )

  fireEvent.change(screen.getByLabelText('Nome'), {
    target: { value: 'usuario' },
  })
  fireEvent.change(screen.getByLabelText('E-mail'), {
    target: { value: 'usuario@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Senha'), {
    target: { value: 'senha123' },
  })

  fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith('Usuário cadastrado com sucesso!')
  })

  expect(api.post).toHaveBeenCalledWith('usuarios', {
    email: 'usuario@example.com',
    senha: 'senha123',
    nomeUsuario: 'usuario',
  })
})