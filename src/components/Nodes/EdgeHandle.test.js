import { ReactFlowProvider } from 'react-flow-renderer'
import { cleanup, render } from '@testing-library/react'
import React from 'react'

import EdgeHandle from './EdgeHandle'

describe('<EdgeHandle/>', () => {
  afterEach(cleanup)

  it('should render a target', () => {
    const { getByTestId } = render(
      <ReactFlowProvider>
        <EdgeHandle type="target" />
      </ReactFlowProvider>,
    )

    expect(getByTestId('edgeHandle')).toHaveStyle('background: red')
    expect(getByTestId('edgeHandle')).toHaveAttribute('data-handlepos', 'left')
  })
  it('should render a source', () => {
    const { getByTestId } = render(
      <ReactFlowProvider>
        <EdgeHandle type="source" />
      </ReactFlowProvider>,
    )

    expect(getByTestId('edgeHandle')).toHaveStyle('background: green')
    expect(getByTestId('edgeHandle')).toHaveAttribute('data-handlepos', 'right')
  })
  it('should render a rework target', () => {
    const { getByTestId } = render(
      <ReactFlowProvider>
        <EdgeHandle type="reworkTarget" />
      </ReactFlowProvider>,
    )

    expect(getByTestId('edgeHandle')).toHaveStyle('background: red')
    expect(getByTestId('edgeHandle')).toHaveAttribute(
      'data-handlepos',
      'bottom',
    )
  })
  it('should render a source', () => {
    const { getByTestId } = render(
      <ReactFlowProvider>
        <EdgeHandle type="reworkSource" />
      </ReactFlowProvider>,
    )

    expect(getByTestId('edgeHandle')).toHaveStyle('background: green')
    expect(getByTestId('edgeHandle')).toHaveAttribute('data-handlepos', 'left')
  })
})
