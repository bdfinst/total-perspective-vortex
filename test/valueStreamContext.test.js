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
    const beforeLen = result.current.state.elements.length
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    const afterLen = result.current.state.elements.length
    const newNode = getLastNode(result.current.state.elements)

    expect(beforeLen + 1).toEqual(afterLen)
    expect(newNode).toHaveProperty('type')
    expect(newNode).toHaveProperty('data')
    expect(newNode).toHaveProperty('style')
    expect(newNode).toHaveProperty('position')
  })

  describe('Updating a node', () => {
    it('should update data for a node', () => {
      const newData = {
        processName: '',
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
      newData.processName = 'New processName'
      const currentPos = testNode.position

      act(() => {
        result.current.changeNodeValues({
          node: testNode,
          data: newData,
        })
      })

      const found = result.current.state.elements.find(
        (node) => node.id === testNode.id,
      )

      expect(found.data).toEqual(newData)
    })

    it.skip('should update a node position', () => {
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
})

describe('Linking nodes with edges', () => {
  let result
  let nodes
  let source
  let target1
  let target2

  beforeEach(() => {
    result = renderVSMHook()
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })

    nodes = getNodes(result.current.state.elements)
    source = nodes[nodes.length - 1]
    target1 = nodes[nodes.length - 2]
    target2 = nodes[nodes.length - 3]
  })

  afterEach(cleanup)

  it('should add an edge between two nodes', () => {
    act(() => {
      result.current.createEdge({ source: source, target: target1 })
    })

    const edges = getEdges(result.current.state.elements)

    expect(edges[edges.length - 1].source).toEqual(source.id)
    expect(edges[edges.length - 1].target).toEqual(target1.id)
  })

  it('should prevent adding a duplicate edge', () => {
    act(() => {
      result.current.createEdge({ source: source, target: target1 })
    })
    const before = getEdges(result.current.state.elements).length

    act(() => {
      result.current.createEdge({ source: source, target: target1 })
    })

    const after = getEdges(result.current.state.elements).length

    expect(after).toEqual(before)
  })

  it('should update an edge to point to a new node', () => {
    act(() => {
      result.current.createEdge({ source: source, target: target1 })
    })

    let edges = getEdges(result.current.state.elements)
    expect(edges[edges.length - 1].source).toEqual(source.id)
    expect(edges[edges.length - 1].target).toEqual(target1.id)

    act(() => {
      result.current.changeEdgeTarget(edges[edges.length - 1], target2)
    })

    edges = getEdges(result.current.state.elements)
    expect(edges[edges.length - 1].source).toEqual(source.id)
    expect(edges[edges.length - 1].target).toEqual(target2.id)
  })
})

describe('Deleting elements', () => {
  afterAll(cleanup)
  it('should delete elements', () => {
    const result = renderVSMHook()

    const elms = result.current.state.elements
    expect(elms.length).toBeGreaterThan(1)

    const elementsToRemove = elms
      .filter((el) => el.id !== elms[0].id)
      .map((el) => ({ id: el.id }))

    act(() => {
      result.current.removeElements(elementsToRemove)
    })

    expect(result.current.state.elements.length).toEqual(1)
  })
  it.skip('should not delete the last element', () => {
    const result = renderVSMHook()

    expect(result.current.state.elements.length).toBeGreaterThan(1)

    let elementsToRemove = result.current.state.elements
      .filter((el) => el.id !== '1')
      .map((el) => ({ id: el.id }))

    act(() => {
      result.current.removeElements(elementsToRemove)
    })

    elementsToRemove = result.current.state.elements
      .filter((el) => el.id === '1')
      .map((el) => ({ id: el.id }))

    act(() => {
      result.current.removeElements(elementsToRemove)
    })

    const len = result.current.state.elements.length
    expect(len).toEqual(1)
    expect(result.current.state.elements[len - 1].id).toEqual('1')
  })
})
describe('Adding and inserting nodes', () => {
  afterEach(cleanup)
  let result
  beforeEach(() => {
    result = renderVSMHook()
  })

  const addNode = () => {
    act(() => {
      result.current.createNode({ x: 1, y: 1 })
    })
    return getLastNode(result.current.state.elements)
  }

  const addEdge = (source, target) => {
    act(() => {
      result.current.createEdge({ source: source, target: target })
    })
    return getLastEdge(result.current.state.elements)
  }

  it('should Insert a node before the previous node and update the edges', () => {
    const prevNode = addNode()
    const selectedNode = addNode()
    const prevEdge = addEdge(prevNode, selectedNode)

    expect(prevEdge.source).toEqual(prevNode.id)
    expect(prevEdge.target).toEqual(selectedNode.id)

    act(() => {
      result.current.addNodeBefore(selectedNode)
    })

    const newNode = getLastNode(result.current.state.elements)
    const newEdge = getLastEdge(result.current.state.elements)
    const updatedEdge = getElementById(
      prevEdge.id,
      result.current.state.elements,
    )

    expect(updatedEdge.source).toEqual(prevNode.id)
    expect(updatedEdge.target).toEqual(newNode.id)
    expect(newEdge.source).toEqual(newNode.id)
    expect(newEdge.target).toEqual(selectedNode.id)
  })
  it('should do nothing if no node is selected', () => {
    const prevNode = addNode()
    const selectedNode = addNode()
    const prevEdge = addEdge(prevNode, selectedNode)
    const prevCount = result.current.state.elements.length

    expect(prevEdge.source).toEqual(prevNode.id)
    expect(prevEdge.target).toEqual(selectedNode.id)

    act(() => {
      result.current.addNodeBefore()
    })

    const newCount = result.current.state.elements.length

    expect(prevCount).toEqual(newCount)
    expect(prevEdge.source).toEqual(prevNode.id)
    expect(prevEdge.target).toEqual(selectedNode.id)
  })
  it('should insert a node after the selected node', () => {
    const node1 = addNode()
    const node2 = addNode()
    const edge1_2 = addEdge(node1, node2)

    const prevNodeCount = getNodes(result.current.state.elements).length

    expect(edge1_2.target).toEqual(node2.id)
    expect(edge1_2.source).toEqual(node1.id)

    act(() => {
      result.current.addNodeAfter(node1)
    })

    const newNodeCount = getNodes(result.current.state.elements).length
    const node3 = getLastNode(result.current.state.elements)
    const edge3_2 = getElementById(edge1_2.id, result.current.state.elements)
    const edge1_3 = getLastEdge(result.current.state.elements)

    expect(prevNodeCount + 1).toEqual(newNodeCount)
    expect(edge1_3.source).toEqual(node1.id)
    expect(edge1_3.target).toEqual(node3.id)

    expect(edge3_2.source).toEqual(node3.id)
    expect(edge3_2.target).toEqual(node2.id)
  })

  it('should add a node at the end if no node is selected', () => {
    const startNode = addNode()
    const prevNodeCount = getNodes(result.current.state.elements).length
    const prevEdgeCount = getEdges(result.current.state.elements).length

    act(() => {
      result.current.addNodeAfter()
    })

    const newNodeCount = getNodes(result.current.state.elements).length
    const newEdgeCount = getEdges(result.current.state.elements).length

    const newNode = getLastNode(result.current.state.elements)
    const newEdge = getLastEdge(result.current.state.elements)

    expect(prevNodeCount + 1).toEqual(newNodeCount)
    expect(prevEdgeCount + 1).toEqual(newEdgeCount)
    expect(newEdge.source).toEqual(startNode.id)
    expect(newEdge.target).toEqual(newNode.id)
  })
})
