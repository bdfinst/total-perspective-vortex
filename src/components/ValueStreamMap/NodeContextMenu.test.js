import { render, screen } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'

import NodeContextMenu from './NodeContextMenu'

it('renders learn react link', () => {
  render(<NodeContextMenu menuId={1} />)

  // userEvent.click(screen.getByText('Edit'))

  expect(screen.getByText(/edit/i)).toBeInTheDocument()
})

it.skip('sets the default state', () => {
  const { getByTestId } = render(<NodeContextMenu />)

  expect(getByTestId('state')).toEqual(false)
})
