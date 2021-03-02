import { render, screen } from '@testing-library/react'
import React from 'react'

import ContextMenu from './ContextMenu'

it('renders learn react link', () => {
  render(<ContextMenu />)

  expect(screen.getByText(/menu/i)).toBeInTheDocument()
})
