import { test, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Patient from '../../pages/Patient'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import '@testing-library/jest-dom'

vi.mock('../../services/api')
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

test('Submit register patient function', async () => {
  const mockPost = vi.fn().mockResolvedValue({ status: 201 })
  api.post = mockPost

  render(<Patient />)

  fireEvent.change(screen.getByLabelText(/cpf do paciente/i), { target: { value: '439.000.000-00' } })
  fireEvent.change(screen.getByLabelText(/nome do paciente/i), { target: { value: 'Usuário' } })
  fireEvent.change(screen.getByLabelText(/telefone do paciente/i), { target: { value: '(19) 99999-9999' } })
  fireEvent.change(screen.getByPlaceholderText('CEP'), { target: { value: '13476-000' } })
  fireEvent.change(screen.getByPlaceholderText('Informe o endereço completo'), { target: { value: 'Rua do Teste' } })
  fireEvent.change(screen.getByPlaceholderText('Número'), { target: { value: '00' } })
  fireEvent.change(screen.getByPlaceholderText('Informe o bairro'), { target: { value: 'Vitest' } })
  fireEvent.change(screen.getByPlaceholderText('Complemento'), { target: { value: 'Sem' } })
  fireEvent.change(screen.getByPlaceholderText('Informe a cidade'), { target: { value: 'Americana' } })
  fireEvent.change(screen.getByPlaceholderText('Informe o UF'), { target: { value: 'SP' } })

  fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  await waitFor(() => {
    expect(mockPost).toHaveBeenCalledWith(
      '/paciente',
      {
        cpf: '439.000.000-00',
        nome: 'Usuário',
        telefone: '(19) 99999-9999',
        cep: '13476-000',
        rua: 'Rua do Teste',
        numero: '00',
        bairro: 'Vitest',
        complemento: 'Sem',
        cidade: 'Americana',
        uf: 'SP',
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(toast.success).toHaveBeenCalledWith('Paciente cadastrado com sucesso!')
  })
})

test('Submit register patient with duplicate CPF', async () => {
  const mockPost = vi.fn().mockResolvedValue({ status: 409 })
  api.post = mockPost

  render(<Patient />)

  fireEvent.change(screen.getByLabelText(/cpf do paciente/i), { target: { value: '439.000.000-00' } })
  fireEvent.change(screen.getByLabelText(/nome do paciente/i), { target: { value: 'Usuário' } })
  fireEvent.change(screen.getByLabelText(/telefone do paciente/i), { target: { value: '(19) 99999-9999' } })
  fireEvent.change(screen.getByPlaceholderText('CEP'), { target: { value: '13476-000' } })
  fireEvent.change(screen.getByPlaceholderText('Informe o endereço completo'), { target: { value: 'Rua do Teste' } })
  fireEvent.change(screen.getByPlaceholderText('Número'), { target: { value: '00' } })
  fireEvent.change(screen.getByPlaceholderText('Informe o bairro'), { target: { value: 'Vitest' } })
  fireEvent.change(screen.getByPlaceholderText('Complemento'), { target: { value: 'Sem' } })
  fireEvent.change(screen.getByPlaceholderText('Informe a cidade'), { target: { value: 'Americana' } })
  fireEvent.change(screen.getByPlaceholderText('Informe o UF'), { target: { value: 'SP' } })

  fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  await waitFor(() => {
    expect(mockPost).toHaveBeenCalledWith(
      '/paciente',
      {
        cpf: '439.000.000-00',
        nome: 'Usuário',
        telefone: '(19) 99999-9999',
        cep: '13476-000',
        rua: 'Rua do Teste',
        numero: '00',
        bairro: 'Vitest',
        complemento: 'Sem',
        cidade: 'Americana',
        uf: 'SP',
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(toast.error).toHaveBeenCalledWith('Paciente já cadastrado')
  })
})

test('Submit register patient with system failure', async () => {
  const mockPost = vi.fn().mockRejectedValue(new Error('Falha no sistema'))
  api.post = mockPost

  render(<Patient />)

  fireEvent.change(screen.getByLabelText(/cpf do paciente/i), { target: { value: '439.000.000-00' } })
  fireEvent.change(screen.getByLabelText(/nome do paciente/i), { target: { value: 'Usuário' } })
  fireEvent.change(screen.getByLabelText(/telefone do paciente/i), { target: { value: '(19) 99999-9999' } })
  fireEvent.change(screen.getByPlaceholderText('CEP'), { target: { value: '13476-000' } })
  fireEvent.change(screen.getByPlaceholderText('Informe o endereço completo'), { target: { value: 'Rua do Teste' } })
  fireEvent.change(screen.getByPlaceholderText('Número'), { target: { value: '00' } })
  fireEvent.change(screen.getByPlaceholderText('Informe o bairro'), { target: { value: 'Vitest' } })
  fireEvent.change(screen.getByPlaceholderText('Complemento'), { target: { value: 'Sem' } })
  fireEvent.change(screen.getByPlaceholderText('Informe a cidade'), { target: { value: 'Americana' } })
  fireEvent.change(screen.getByPlaceholderText('Informe o UF'), { target: { value: 'SP' } })

  fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

  await waitFor(() => {
    expect(mockPost).toHaveBeenCalledWith(
      '/paciente',
      {
        cpf: '439.000.000-00',
        nome: 'Usuário',
        telefone: '(19) 99999-9999',
        cep: '13476-000',
        rua: 'Rua do Teste',
        numero: '00',
        bairro: 'Vitest',
        complemento: 'Sem',
        cidade: 'Americana',
        uf: 'SP',
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    expect(toast.error).toHaveBeenCalledWith('Falha no sistema! Tente novamente')
  })
})