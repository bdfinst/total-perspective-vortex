import { fireEvent, getByText, render, screen } from '@testing-library/react'
import React from 'react'

import { ValueStreamProvider } from '../valueStreamContext'
import FileUpload from './FileUpload'

it('should open the upload dialog', async () => {
  const { getByRole, debug } = render(
    <ValueStreamProvider>
      <FileUpload />
    </ValueStreamProvider>,
  )

  const button = getByRole('button')

  await fireEvent.click(button)

  expect(
    screen.getByText('Drag and drop a file here or click'),
  ).toBeInTheDocument()
})
