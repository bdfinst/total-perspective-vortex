import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import {
  ValueStreamProvider,
  useValueStream,
} from '../components/ValueStreamMap/valueStreamContext'
import {
  getEdges,
  getLastEdge,
  getLastProcessNode,
  getLastReworkNode,
  getProcessNodes,
  getReworkNodes,
} from '../../src/helpers'
import config from '../globalConfig'

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
    const edges = getEdges(result.current.state.elements)
    const processNodes = getProcessNodes(result.current.state.elements)
    const reworkNodes = getReworkNodes(result.current.state.elements)

    expect(edges.length).toEqual(1)
    expect(processNodes.length).toEqual(2)
    expect(reworkNodes.length).toEqual(1)
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
      result.current.createNode(1, 1)
    })

    const afterLen = result.current.state.elements.length
    const newNode = getLastProcessNode(result.current.state.elements)

    expect(beforeLen + 1).toEqual(afterLen)
    expect(newNode).toHaveProperty('type')
    expect(newNode.type).toEqual(config.processNodeType)
    expect(newNode).toHaveProperty('data')
    expect(newNode).toHaveProperty('style')
    expect(newNode).toHaveProperty('position')
  })

  describe('Updating a node', () => {
    it('should update data for a node', () => {
      const newData = {
        processName: '',
        people: 1,
        processTime: 1,
        waitTime: 2,
        pctCompleteAccurate: 3,
      }

      act(() => {
        result.current.createNode(1, 1)
      })

      const nodes = getProcessNodes(result.current.state.elements)
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
        result.current.createNode(1, 1)
      })

      const nodes = getProcessNodes(result.current.state.elements)
      const testNode = nodes[nodes.length - 1]

      const newData = testNode.data
      newData.processName = 'New processName'

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
  })
})

describe('Rework Nodes', () => {
  afterEach(cleanup)
  let result
  beforeEach(() => {
    result = renderVSMHook()
  })

  it('should add a new rework node the store', () => {
    const beforeLen = result.current.state.elements.length
    act(() => {
      result.current.createReworkNode(1, 1)
    })

    const afterLen = result.current.state.elements.length
    const newNode = getLastReworkNode(result.current.state.elements)

    expect(beforeLen + 1).toEqual(afterLen)
    expect(newNode.type).toEqual(config.reworkNodeType)
    expect(newNode).toHaveProperty('data')
    expect(newNode.data).toHaveProperty('description')
    expect(newNode).toHaveProperty('position')
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
      result.current.createNode(1, 1)
    })
    act(() => {
      result.current.createNode(1, 1)
    })

    nodes = getProcessNodes(result.current.state.elements)
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
  it('should not delete the last element', () => {
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
describe('Adding nodes', () => {
  afterEach(cleanup)
  let result
  beforeEach(() => {
    result = renderVSMHook()
  })

  const addNode = () => {
    act(() => {
      result.current.createNode(1, 1)
    })

    const node = getLastProcessNode(result.current.state.elements)
    const index = result.current.state.elements.findIndex(
      (e) => e.id === node.id,
    )

    return [node, index]
  }

  it('should add a node at the end if no node is selected', () => {
    const [startNode] = addNode()
    const prevNodeCount = getProcessNodes(result.current.state.elements).length
    const prevEdgeCount = getEdges(result.current.state.elements).length

    act(() => {
      result.current.addNodeAfter()
    })

    const newNodeCount = getProcessNodes(result.current.state.elements).length
    const newEdgeCount = getEdges(result.current.state.elements).length

    const newNode = getLastProcessNode(result.current.state.elements)
    const newEdge = getLastEdge(result.current.state.elements)

    expect(prevNodeCount + 1).toEqual(newNodeCount)
    expect(prevEdgeCount + 1).toEqual(newEdgeCount)
    expect(newEdge.source).toEqual(startNode.id)
    expect(newEdge.target).toEqual(newNode.id)
  })
})
