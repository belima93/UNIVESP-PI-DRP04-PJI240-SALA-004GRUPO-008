import { test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Medicament from '../../pages/Medicament'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
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

test('Render Medicament form', () => {
  render(<Medicament />)

  expect(screen.getByLabelText(/medicamento/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/quantidade/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/data do vencimento/i)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
})

test('Submit register medicament function with success', async () => {
  (api.post as typeof api.post & { mockResolvedValueOnce: (arg0: { status: number; data: { formula: string; quantidade: number, vencimento: string } }) => void }).mockResolvedValueOnce({
    status: 200,
    data: { formula: 'Dipirona', quantidade: 10, vencimento: '2025-01-09' },
  })

  render(<Medicament />)

  fireEvent.change(screen.getByLabelText(/medicamento/i), { target: { value: 'Dipirona' } })
  fireEvent.change(screen.getByLabelText(/quantidade/i), { target: { value: 10 } })
  fireEvent.change(screen.getByLabelText(/data do vencimento/i), { target: { value: '2025-01-09' } })

  fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith('Medicamento cadastrado com sucesso!')
  })

  expect(api.post).toHaveBeenCalledWith('/medicamento', {
    formula: 'Dipirona',
    quantidade: 10,
    vencimento: '2025-01-09',
  }, 
  {
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

test('Submit register medicament function with duplicate', async () => {
  (api.post as typeof api.post & { mockResolvedValueOnce: (arg0: { status: number; data: { formula: string; quantidade: number, vencimento: string } }) => void }).mockResolvedValueOnce({
    status: 409,
    data: { formula: 'Dipirona', quantidade: 10, vencimento: '2025-01-09' },
  })

  render(<Medicament />)

  fireEvent.change(screen.getByLabelText(/medicamento/i), { target: { value: 'Dipirona' } })
  fireEvent.change(screen.getByLabelText(/quantidade/i), { target: { value: 10 } })
  fireEvent.change(screen.getByLabelText(/data do vencimento/i), { target: { value: '2025-01-09' } })

  fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Medicamento já cadastrado')
  })

  expect(api.post).toHaveBeenCalledWith('/medicamento', {
    formula: 'Dipirona',
    quantidade: 10,
    vencimento: '2025-01-09',
  }, 
  {
    headers: {
      'Content-Type': 'application/json'
    }
  })
})

test('Submit register medicament function with system failure', async () => {
  (api.post as typeof api.post & { mockRejectedValueOnce: (arg0: any) => void }).mockRejectedValueOnce({
    status: 409,
  })

  render(<Medicament />)

  fireEvent.change(screen.getByLabelText(/medicamento/i), { target: { value: 'Dipirona' } })
  fireEvent.change(screen.getByLabelText(/quantidade/i), { target: { value: 10 } })
  fireEvent.change(screen.getByLabelText(/data do vencimento/i), { target: { value: '2025-01-09' } })

  fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Falha no sistema! Tente novamente')
  })

  expect(api.post).toHaveBeenCalledWith('/medicamento', {
    formula: 'Dipirona',
    quantidade: 10,
    vencimento: '2025-01-09',
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})

