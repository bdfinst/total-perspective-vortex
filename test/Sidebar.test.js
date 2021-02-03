import { act, renderHook } from '@testing-library/react-hooks'
import { cleanup, render } from '@testing-library/react'
import React from 'react'

import { ValueStreamProvider, useValueStream } from '../src/reactContext'
import { buildNode } from '../src/utils/utilities'
import Sidebar from '../src/components/Sidebar'

afterEach(cleanup)

const renderSidebar = () => {
  return render(
    <ValueStreamProvider>
      <Sidebar />
    </ValueStreamProvider>,
  )
}

describe('Sidebar', () => {
  it('should take a snapshot', () => {
    const { asFragment } = renderSidebar()

    expect(asFragment(<Sidebar />)).toMatchSnapshot()
  })
  it('should equal to 0', () => {
    const { getByTestId } = renderSidebar()

    expect(getByTestId('processTime')).toHaveTextContent(0)
  })
  it('should default the values if no data exists', () => {
    const { getByTestId } = renderSidebar()

    expect(getByTestId('processTime')).toHaveTextContent(0)
    expect(getByTestId('totalTime')).toHaveTextContent(0)
    expect(getByTestId('waitTime')).toHaveTextContent(0)
    expect(getByTestId('avgPCA')).toHaveTextContent(0)
    expect(getByTestId('flow')).toHaveTextContent(0)
  })

  it('should show the total process time', () => {
    const elements = [
      buildNode('1', { x: 100, y: 150 }),
      buildNode('2', { x: 350, y: 150 }),
    ]

    const wrapper = ({ children }) => (
      <ValueStreamProvider>{children}</ValueStreamProvider>
    )
    const { result } = renderHook(() => useValueStream(), {
      wrapper,
    })
    act(() => {
      result.current.dispatch({ type: 'SYNC', elements: elements })
    })

    const { getByTestId } = renderSidebar()

    expect(getByTestId('processTime')).toHaveTextContent(0)
    expect(getByTestId('totalTime')).toHaveTextContent(0)
    expect(getByTestId('avgPCA')).toHaveTextContent(0)
    expect(getByTestId('flow')).toHaveTextContent(0)
  })
})
