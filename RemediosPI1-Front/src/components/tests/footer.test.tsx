import { test, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import  Footer from '../Footer'
import '@testing-library/jest-dom/vitest'

test("Footer renders", () => {
  render(<Footer />)
  const footerElement = screen.getByTestId("footer")
  expect(footerElement).toBeInTheDocument()
})
