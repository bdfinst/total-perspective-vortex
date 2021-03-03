import { render, screen } from '@testing-library/react'
import React from 'react'

import { ValueStreamProvider } from './valueStreamContext'
import NodeContextMenu from './NodeContextMenu'

// import userEvent from '@testing-library/user-event'

it.skip('renders learn react link', () => {
  render(
    <ValueStreamProvider>
      <NodeContextMenu menuId={1} />
    </ValueStreamProvider>,
  )

  // userEvent.click(screen.getByText('Edit'))

  // expect(screen.getByText(/edit/i)).toBeInTheDocument()
})

it.skip('sets the default state', () => {
  const { getByTestId } = render(<NodeContextMenu />)

  expect(getByTestId('state')).toEqual(false)
})
