import { act, cleanup, renderHook } from '@testing-library/react-hooks'

import {
  ValueStreamProvider,
  useValueStream,
} from '../src/appContext/valueStreamContext'
import {
  buildEdge,
  buildNode,
  getElementById,
  getNodes,
} from '../src/helpers/utilities'

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
  let result
  beforeEach(() => {
    result = renderVSMHook()
  })

  it('should initialize the state', () => {
    expect(result.current.state.elements.length).toEqual(3)
  })

  it('should increment the element ID store', () => {
    const previousId = result.current.state.maxNodeId
    act(() => {
      result.current.increment()
    })

    expect(result.current.state.maxNodeId).toEqual(previousId + 1)
  })

  it('should add a new node the store', () => {
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    const el = result.current.state.elements.length - 1

    expect(result.current.state.elements[el].id).toEqual('3')
    expect(result.current.state.elements.length).toEqual(4)
    expect(result.current.state.elements[el]).toHaveProperty('type')
    expect(result.current.state.elements[el]).toHaveProperty('data')
    expect(result.current.state.elements[el]).toHaveProperty('style')
    expect(result.current.state.elements[el]).toHaveProperty('position')
  })

  it('should update an existing node with a given node ID', () => {
    const newData = {
      description: '',
      actors: 1,
      processTime: 1,
      waitTime: 2,
      pctCompleteAccurate: 3,
      \,
    }

    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    const nodes = getNodes(result.current.state.elements)
    const testNode = nodes[nodes.length - 1]

    act(() => {
      result.current.changeNodeValues(testNode, newData)
    })

    const found = result.current.state.elements.filter(
      (node) => node.id === testNode.id,
    )

    expect(found[0].data).toEqual(newData)
    expect(found[0].position).toEqual({ x: 2, y: 2 })
  })

  it('should throw an update error for having the wrong properties', () => {
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
    act(() => {
      result.current.dispatch({ type: 'FAKE' })
    })

    expect(result.error).toEqual(Error('Unsupported action type: FAKE'))
  })
})

describe.skip('Adding new node to existing nodes', () => {
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
