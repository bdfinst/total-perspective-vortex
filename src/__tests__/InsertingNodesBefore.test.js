import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import {
  ValueStreamProvider,
  useValueStream,
} from '../components/ValueStreamMap/valueStreamContext'
import {
  getElementById,
  getLastEdge,
  getLastProcessNode,
  getNodeById,
  getNodeIndexes,
} from '../helpers'

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

    return { node, index }
  }

  const addEdge = (source, target) => {
    act(() => {
      result.current.createEdge({ source: source, target: target })
    })
    return getLastEdge(result.current.state.elements)
  }

  it('should select the second node', () => {
    const node1 = addNode()
    const node2 = addNode()
    const newEdge = addEdge(node1.node, node2.node)
    expect(node2.node.selected).toEqual(false)
    act(() => {
      result.current.toggleNodeSelect(node2.node)
    })

    const selected = getElementById(
      node2.node.id,
      result.current.state.elements,
    )

    expect(selected.selected).toEqual(true)
  })
  it('should insert a node before the second node and update the edges', () => {
    const node1 = addNode()
    const node2 = addNode()
    const oldEdge = addEdge(node1.node, node2.node)

    act(() => {
      result.current.addNodeBefore(node2.node)
    })

    const elements = result.current.state.elements
    const nodeIndexes = getNodeIndexes(elements)
    const insertedNode = getNodeById(elements, result.current.state.maxNodeId)

    const node1Index = nodeIndexes.find((i) => i.id === node1.node.id).index
    const node2Index = nodeIndexes.find((i) => i.id === node2.node.id).index
    const insertedNodeIndex = nodeIndexes.find((i) => i.id === insertedNode.id)
      .index

    const updatedEdge = getElementById(oldEdge.id, elements)
    const newEdge = getLastEdge(elements)

    expect(node2Index).toBeGreaterThan(insertedNodeIndex)
    expect(node1Index).toBeLessThan(insertedNodeIndex)

    expect(updatedEdge.source).toEqual(oldEdge.source)
    expect(updatedEdge.target).toEqual(insertedNode.id)
    expect(newEdge.source).toEqual(insertedNode.id)
    expect(newEdge.target).toEqual(node2.node.id)
  })
})
