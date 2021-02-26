import { render, screen } from '@testing-library/react'
import React from 'react'

import App from '../App'

it.skip('renders learn react link', () => {
  render(<App />)
  console.log(screen)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
