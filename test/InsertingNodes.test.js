import { act, cleanup, renderHook } from '@testing-library/react-hooks'

import {
  ValueStreamProvider,
  useValueStream,
} from '../src/appContext/valueStreamContext'
import {
  getEdges,
  getElementById,
  getLastEdge,
  getLastNode,
  getNodeById,
  getNodes,
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
  it('should insert a node before the second node', () => {
    expect(result.current.state.elements[node2.index].id).toEqual(node2.node.id)

    act(() => {
      result.current.addNodeBefore(node2.node)
    })

    const elements = result.current.state.elements

    const newId = Number(node2.node.id) + 1
    const insertedNode = getNodeById(elements, newId)

    const newNode1Index = elements.findIndex((e) => e.id === node2.node.id)

    expect(elements[newNode1Index].id).toEqual(node2.node.id)
    expect(elements[node2.index].id).toEqual(insertedNode.id)
  })
  it('should add a node after the previously inserted node and before the last node', () => {
    expect(result.current.state.elements[node2.index].id).toEqual(node2.node.id)

    act(() => {
      result.current.addNodeBefore(node2.node)
    })

    const elements = result.current.state.elements

    const newId = Number(node2.node.id) + 1
    const insertedNode = getNodeById(elements, newId)

    const newNode1Index = elements.findIndex((e) => e.id === node2.node.id)

    expect(elements[newNode1Index].id).toEqual(node2.node.id)
    expect(elements[node2.index].id).toEqual(1)
  })
})
// describe('Adding and inserting nodes', () => {
//   afterEach(cleanup)
//   let result
//   beforeEach(() => {
//     result = renderVSMHook()
//   })

//   const addNode = () => {
//     act(() => {
//       result.current.createNode({ x: 1, y: 1 })
//     })

//     const node = getLastNode(result.current.state.elements)
//     const index = result.current.state.elements.findIndex(
//       (e) => e.id === node.id,
//     )

//     return [node, index]
//   }

//   const addEdge = (source, target) => {
//     act(() => {
//       result.current.createEdge({ source: source, target: target })
//     })
//     return getLastEdge(result.current.state.elements)
//   }

//   it.skip('should Insert a node before the previous node and update the edges', () => {
//     const prevNode = addNode()
//     const selectedNode = addNode()
//     const prevEdge = addEdge(prevNode, selectedNode)

//     expect(prevEdge.source).toEqual(prevNode.id)
//     expect(prevEdge.target).toEqual(selectedNode.id)

//     act(() => {
//       result.current.addNodeBefore(selectedNode)
//     })

//     const newNode = getLastNode(result.current.state.elements)
//     const newEdge = getLastEdge(result.current.state.elements)
//     const updatedEdge = getElementById(
//       prevEdge.id,
//       result.current.state.elements,
//     )

//     expect(updatedEdge.source).toEqual(prevNode.id)
//     expect(updatedEdge.target).toEqual(newNode.id)
//     expect(newEdge.source).toEqual(newNode.id)
//     expect(newEdge.target).toEqual(selectedNode.id)
//   })
//   it.skip('should not insert a node if no node is selected', () => {
//     const prevNode = addNode()
//     const selectedNode = addNode()
//     const prevEdge = addEdge(prevNode, selectedNode)
//     const prevCount = result.current.state.elements.length

//     expect(prevEdge.source).toEqual(prevNode.id)
//     expect(prevEdge.target).toEqual(selectedNode.id)

//     act(() => {
//       result.current.addNodeBefore()
//     })

//     const newCount = result.current.state.elements.length

//     expect(prevCount).toEqual(newCount)
//     expect(prevEdge.source).toEqual(prevNode.id)
//     expect(prevEdge.target).toEqual(selectedNode.id)
//   })
//   it.skip('should insert a node after the selected node', () => {
//     const node1.node, index1 = addNode()
//     const node2.node, node2.index = addNode()

//     expect(index1 + 1).toEqual(node2.index)

//     const edge1_2 = addEdge(node1.node, node2.node)

//     const prevNodeCount = getNodes(result.current.state.elements).length

//     expect(edge1_2.target).toEqual(node2.node.id)
//     expect(edge1_2.source).toEqual(node1.node.id)

//     act(() => {
//       result.current.addNodeAfter(node1.node)
//     })

//     const newNodeCount = getNodes(result.current.state.elements).length
//     const node3 = getLastNode(result.current.state.elements)
//     const edge3_2 = getElementById(edge1_2.id, result.current.state.elements)
//     const edge1_3 = getLastEdge(result.current.state.elements)

//     expect(prevNodeCount + 1).toEqual(newNodeCount)
//     expect(edge1_3.source).toEqual(node1.node.id)
//     expect(edge1_3.target).toEqual(node3.id)

//     expect(edge3_2.source).toEqual(node3.id)
//     expect(edge3_2.target).toEqual(node2.node.id)
//   })

//   it.skip('should add a node at the end if no node is selected', () => {
//     const startNode = addNode()
//     const prevNodeCount = getNodes(result.current.state.elements).length
//     const prevEdgeCount = getEdges(result.current.state.elements).length

//     act(() => {
//       result.current.addNodeAfter()
//     })

//     const newNodeCount = getNodes(result.current.state.elements).length
//     const newEdgeCount = getEdges(result.current.state.elements).length

//     const newNode = getLastNode(result.current.state.elements)
//     const newEdge = getLastEdge(result.current.state.elements)

//     expect(prevNodeCount + 1).toEqual(newNodeCount)
//     expect(prevEdgeCount + 1).toEqual(newEdgeCount)
//     expect(newEdge.source).toEqual(startNode.id)
//     expect(newEdge.target).toEqual(newNode.id)
//   })
// })
