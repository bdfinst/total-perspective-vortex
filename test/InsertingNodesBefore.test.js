import { act, cleanup, renderHook } from '@testing-library/react-hooks'

import {
  ValueStreamProvider,
  useValueStream,
} from '../src/appContext/valueStreamContext'
import {
  getElementById,
  getLastEdge,
  getLastNode,
  getNodeById,
} from '../src/helpers'

const renderVSMHook = () => {
  const wrapper = ({ children }) => (
    <ValueStreamProvider>{children}</ValueStreamProvider>
  )
  const { result } = renderHook(() => useValueStream(), {
    wrapper,
  })
  return result
}

describe('Inserting a node before a selected node', () => {
  afterAll(cleanup)
  let result
  beforeAll(() => {
    result = renderVSMHook()
  })
  const addNode = () => {
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    const node = getLastNode(result.current.state.elements)
    const index = result.current.state.elements.findIndex(
      (e) => e.id === node.id,
    )

    return { node, index }
  }

  const addEdge = (source, target) => {
    act(() => {
      result.current.createEdge({ source: source, target: target })
    })
    return getLastEdge(result.current.state.elements)
  }

  let node1, node2, selected

  it('should add two connected nodes', () => {
    node1 = addNode()
    node2 = addNode()
    const newEdge = addEdge(node1.node, node2.node)

    expect(newEdge.source).toEqual(node1.node.id)
    expect(newEdge.target).toEqual(node2.node.id)
    expect(result.current.state.elements[node1.index]).toEqual(node1.node)
    expect(result.current.state.elements[node2.index]).toEqual(node2.node)
  })
  it('should select the second node', () => {
    expect(node2.node.selected).toEqual(false)
    act(() => {
      result.current.toggleNodeSelect(node2.node)
    })

    selected = getElementById(node2.node.id, result.current.state.elements)

    expect(selected.selected).toEqual(true)
  })
  it('should insert a node before the second node and update the edges', () => {
    const oldEdge = getLastEdge(result.current.state.elements)

    act(() => {
      result.current.addNodeBefore(node2.node)
    })

    const elements = result.current.state.elements
    const updatedEdge = getElementById(oldEdge.id, elements)
    const newEdge = getLastEdge(elements)

    const newId = result.current.state.maxNodeId
    const insertedNode = getNodeById(elements, newId)

    const newNode2Index = elements.findIndex((e) => e.id === node2.node.id)

    expect(elements[newNode2Index].id).toEqual(node2.node.id)
    expect(elements[node2.index].id).toEqual(insertedNode.id)

    expect(updatedEdge.source).toEqual(oldEdge.source)
    expect(updatedEdge.target).toEqual(insertedNode.id)
    expect(newEdge.source).toEqual(insertedNode.id)
    expect(newEdge.target).toEqual(node2.node.id)
  })
})
