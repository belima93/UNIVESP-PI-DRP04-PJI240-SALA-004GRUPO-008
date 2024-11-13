import { test, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import Home from './../../pages/Home'
import '@testing-library/jest-dom/vitest'

test("Aside Menu renders", () => {
  render(<Home />)
  const asideMenuElement = screen.getByTestId("asideMenu")
  expect(asideMenuElement).toBeInTheDocument()
})
