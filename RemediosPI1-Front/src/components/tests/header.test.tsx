import { test, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import  Header from '../Header'
import '@testing-library/jest-dom/vitest'

test("Header renders", () => {
  render(<Header />)
  const headerElement = screen.getByTestId("header")
  expect(headerElement).toBeInTheDocument()
})
