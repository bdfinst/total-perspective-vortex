import { render, screen } from '@testing-library/react'
import React from 'react'

import ContextMenu from './ContextMenu'

it('renders learn react link', () => {
  render(<ContextMenu />)

  expect(screen.getByText(/menu/i)).toBeInTheDocument()
})

it.skip('sets the default state', () => {
  const {getByTestId} = render(<ContextMenu />)

  expect(getByTestId("state")).toEqual(false)
})
