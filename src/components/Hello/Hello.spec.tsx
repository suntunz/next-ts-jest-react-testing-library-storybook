import React from 'react'
import { render, screen } from '@testing-library/react'
import Hello from '.'

it('renders "Hello World!"', () => {
  render(<Hello />)
  const myElement = screen.getByText(/Hello world/i)
  expect(myElement).toBeInTheDocument()
})
