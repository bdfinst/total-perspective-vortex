import { cleanup, render } from '@testing-library/react'
import React from 'react'

import { VSMProvider, useVSMDispatch } from '../src/reactContext'
import { buildNode } from '../src/utils/utilities'
import Sidebar from '../src/components/Sidebar'

afterEach(cleanup)

const renderSidebar = (user) => {
  return render(
    <VSMProvider>
      <Sidebar />
    </VSMProvider>,
  )
}

describe('Sidebar', () => {
  it('should take a snapshot', () => {
    const { asFragment } = render(
      <VSMProvider>
        <Sidebar />
      </VSMProvider>,
    )

    expect(asFragment(<Sidebar />)).toMatchSnapshot()
  })
  it('should equal to 0', () => {
    const { getByTestId } = render(
      <VSMProvider>
        <Sidebar />
      </VSMProvider>,
    )
    expect(getByTestId('processTime')).toHaveTextContent(0)
  })
  it('should default the values if no data exists', () => {
    const { getByTestId } = render(
      <VSMProvider>
        <Sidebar />
      </VSMProvider>,
    )
    expect(getByTestId('processTime')).toHaveTextContent(0)
    expect(getByTestId('totalTime')).toHaveTextContent(0)
    expect(getByTestId('pctca')).toHaveTextContent(0)
    expect(getByTestId('flow')).toHaveTextContent(0)
  })

  it.skip('should show the total process time', () => {
    const elements = [
      buildNode('1', { x: 100, y: 150 }),
      buildNode('2', { x: 350, y: 150 }),
    ]

    const dispatch = useVSMDispatch()
    dispatch({ type: 'SYNC', elements: elements })

    const { getByTestId } = render(
      <VSMProvider>
        <Sidebar />
      </VSMProvider>,
    )
    expect(getByTestId('processTime')).toHaveTextContent(0)
    expect(getByTestId('totalTime')).toHaveTextContent(0)
    expect(getByTestId('pctca')).toHaveTextContent(0)
    expect(getByTestId('flow')).toHaveTextContent(0)
  })
})
