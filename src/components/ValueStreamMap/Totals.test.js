import { ReactFlowProvider } from 'react-flow-renderer'
import { cleanup, render } from '@testing-library/react'
import React from 'react'

import { ValueStreamProvider } from './valueStreamContext'
import Totals from './Totals'

afterEach(cleanup)

const renderSidebar = () => {
  return render(
    <ValueStreamProvider>
      <ReactFlowProvider>
        <Totals />
      </ReactFlowProvider>
    </ValueStreamProvider>,
  )
}

describe('Totals', () => {
  it('should equal to 0', () => {
    const { getByTestId } = renderSidebar()

    expect(getByTestId('processTime')).toHaveTextContent(0)
  })
  it('should default the values if no data exists', () => {
    const { getByTestId } = renderSidebar()

    expect(getByTestId('processTime')).toHaveTextContent(0)
    expect(getByTestId('waitTime')).toHaveTextContent(0)
    expect(getByTestId('totalTime')).toHaveTextContent(0)
    expect(getByTestId('avgPCA')).toHaveTextContent(0)
    expect(getByTestId('flowEfficiency')).toHaveTextContent(0)
  })
})
