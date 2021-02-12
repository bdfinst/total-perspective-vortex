import { act, cleanup, renderHook } from '@testing-library/react-hooks'

import {
  ValueStreamProvider,
  useValueStream,
} from '../src/appContext/valueStreamContext'
import {
  buildEdge,
  buildNode,
  getEdges,
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

  it('should add an edge between two nodes', () => {
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    const nodes = getNodes(result.current.state.elements)
    const source = nodes[nodes.length - 1]
    const target = nodes[nodes.length - 2]

    act(() => {
      result.current.createEdge({ source, target })
    })

    const edges = getEdges(result.current.state.elements)

    expect(edges[edges.length - 1].source).toEqual(source.id)
    expect(edges[edges.length - 1].target).toEqual(target.id)
  })

  it('should prevent adding a duplicate node', () => {
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    const nodes = getNodes(result.current.state.elements)
    const source = nodes[nodes.length - 1]
    const target = nodes[nodes.length - 2]

    const previous = getEdges(result.current.state.elements).length

    act(() => {
      result.current.createEdge({ source, target })
    })

    act(() => {
      result.current.createEdge({ source, target })
    })

    expect(getEdges(result.current.state.elements).length).toEqual(previous + 1)
  })

  describe('Updating a node', () => {
    it('should update data for a node', () => {
      const newData = {
        description: '',
        actors: 1,
        processTime: 1,
        waitTime: 2,
        pctCompleteAccurate: 3,
      }

      act(() => {
        result.current.createNode({ x: 1, y: 1 })
      })

      const nodes = getNodes(result.current.state.elements)
      const testNode = nodes[nodes.length - 1]

      act(() => {
        result.current.changeNodeValues({
          node: testNode,
          data: newData,
        })
      })

      const found = result.current.state.elements.filter(
        (node) => node.id === testNode.id,
      )

      expect(found[0].data).toEqual(newData)
    })
    it('should update one data property for a node', () => {
      act(() => {
        result.current.createNode({ x: 1, y: 1 })
      })

      const nodes = getNodes(result.current.state.elements)
      const testNode = nodes[nodes.length - 1]

      const newData = testNode.data
      newData.description = 'New Description'

      act(() => {
        result.current.changeNodeValues({
          node: testNode,
          data: newData,
        })
      })

      const found = result.current.state.elements.filter(
        (node) => node.id === testNode.id,
      )

      expect(found[0].data).toEqual(newData)
    })
    it('should update a node position', () => {
      act(() => {
        result.current.createNode({ x: 1, y: 1 })
      })

      const nodes = getNodes(result.current.state.elements)
      const testNode = nodes[nodes.length - 1]

      act(() => {
        result.current.changeNodeValues({
          node: testNode,
          position: { x: 2, y: 2 },
        })
      })

      const found = result.current.state.elements.filter(
        (node) => node.id === testNode.id,
      )

      expect(found[0].position).toEqual({ x: 2, y: 2 })
    })
  })

  it('should throw an error for unknown dispatch', () => {
    act(() => {
      result.current.dispatch({ type: 'FAKE' })
    })

    expect(result.error).toEqual(Error('Unsupported action type: FAKE'))
  })
})
