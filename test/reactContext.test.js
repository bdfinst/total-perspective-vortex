import { act, cleanup, renderHook } from '@testing-library/react-hooks'

import { ValueStreamProvider, useValueStream } from '../src/reactContext'
import { buildEdge, buildNode, getElementById } from '../src/utils/utilities'

const renderVSMHook = () => {
  const wrapper = ({ children }) => (
    <ValueStreamProvider>{children}</ValueStreamProvider>
  )
  const { result } = renderHook(() => useValueStream(), {
    wrapper,
  })
  return result
}

describe('Value Stream Context', () => {
  afterEach(cleanup)
  afterAll(cleanup)

  it('should increment the element ID store', () => {
    const result = renderVSMHook()

    act(() => {
      result.current.increment()
    })

    expect(result.current.state.lastElementId).toBe(1)
  })

  it('should initialize the state', () => {
    const result = renderVSMHook()

    expect(result.current.state.elements.length).toEqual(3)
  })

  it('should add a new node the store', () => {
    const result = renderVSMHook()

    act(() => {
      result.current.createNode(buildNode('1', { x: 1, y: 1 }))
    })

    expect(result.current.state.elements[0].id).toBe('1')
    expect(result.current.state.elements[0]).toHaveProperty('type')
    expect(result.current.state.elements[0]).toHaveProperty('data')
    expect(result.current.state.elements[0]).toHaveProperty('style')
    expect(result.current.state.elements[0]).toHaveProperty('position')
  })

  it('should update an existing node with a given node ID', () => {
    const result = renderVSMHook()

    const newData = {
      description: '',
      actors: 1,
      processTime: 1,
      waitTime: 2,
      pctCompleteAccurate: 3,
    }

    const testNodeId = '1'

    act(() => {
      result.current.createNode(buildNode(testNodeId, { x: 1, y: 1 }))
    })

    act(() => {
      result.current.changeNodeValues(testNodeId, newData)
    })

    const found = result.current.state.elements.filter(
      (node) => node.id === testNodeId,
    )

    expect(found[0].data).toEqual(newData)
  })

  it('should throw an update error for having the wrong properties', () => {
    const result = renderVSMHook()

    const testNodeId = '1'

    act(() => {
      result.current.createNode(buildNode(testNodeId, { x: 1, y: 1 }))
    })

    const newData = { processTime: 1, waitTime: 2 }

    act(() => {
      result.current.changeNodeValues(testNodeId, newData)
    })

    expect(result.error).toEqual(
      Error(
        'Invalid object sent to updateNode: {"processTime":1,"waitTime":2}',
      ),
    )
  })

  it('should throw an error for unknown dispatch', () => {
    const result = renderVSMHook()

    act(() => {
      result.current.dispatch({ type: 'FAKE' })
    })

    expect(result.error).toEqual(Error('Unsupported action type: FAKE'))
  })
})

describe('Adding new node to existing nodes', () => {
  afterAll(cleanup)

  it('should keep node value after adding another node and edge', () => {
    const result = renderVSMHook()

    const newData = {
      actors: 1,
      description: '',
      processTime: 1,
      waitTime: 2,
      pctCompleteAccurate: 3,
    }
    act(() => {
      result.current.changeNodeValues(1, newData)
    })

    act(() => {
      result.current.createNode(buildNode('9', { x: 1, y: 1 }))
    })

    const node = getElementById(1, result.current.state.elements)

    expect(node.data.pctCompleteAccurate).toEqual(3)

    act(() => {
      result.current.createEdge(buildEdge('e1', '1', '2'))
    })

    expect(node.data.pctCompleteAccurate).toEqual(3)

    expect(result.current.state.elements.length).toEqual(5)
  })
})
