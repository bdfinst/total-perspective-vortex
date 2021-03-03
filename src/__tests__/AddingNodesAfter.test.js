import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import React from 'react'

import {
  ValueStreamProvider,
  useValueStream,
} from '../components/ValueStreamMap/valueStreamContext'
import {
  getEdgesBySource,
  getElementById,
  getLastEdge,
  getLastNode,
  getNodeById,
  getNodeIndexes,
  getNodes,
} from '../../src/helpers'

const renderVSMHook = () => {
  const wrapper = ({ children }) => (
    <ValueStreamProvider>{children}</ValueStreamProvider>
  )
  const { result } = renderHook(() => useValueStream(), {
    wrapper,
  })
  return result
}

describe('Inserting a node after a selected node', () => {
  afterEach(cleanup)
  let result
  beforeEach(() => {
    result = renderVSMHook()
  })
  const addNode = () => {
    act(() => {
      result.current.createNode(1,  1 )
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

  it('should add two connected nodes', () => {
    const node1 = addNode()
    const node2 = addNode()
    const oldEdge = addEdge(node1.node, node2.node)

    expect(oldEdge.source).toEqual(node1.node.id)
    expect(oldEdge.target).toEqual(node2.node.id)
    expect(result.current.state.elements[node1.index]).toEqual(node1.node)
    expect(result.current.state.elements[node2.index]).toEqual(node2.node)
  })
  it('should insert a node after the first node and update the edges', () => {
    const node1 = addNode()
    const node2 = addNode()
    const oldEdge = addEdge(node1.node, node2.node)

    const node1Index = getNodeIndexes(result.current.state.elements).find(
      (i) => i.id === node1.node.id,
    ).index

    act(() => {
      result.current.addNodeAfter(node1.node)
    })

    const node2Index = getNodeIndexes(result.current.state.elements).find(
      (i) => i.id === node2.node.id,
    ).index

    const newIndexes = getNodeIndexes(result.current.state.elements)

    const newElements = result.current.state.elements

    const insertedNode = getNodeById(
      newElements,
      result.current.state.maxNodeId,
    )
    const insertedNodeIndex = newIndexes.find((i) => i.id === insertedNode.id)
      .index

    expect(insertedNodeIndex).toBeGreaterThan(node1Index)
    expect(insertedNodeIndex).toBeLessThan(node2Index)
  })
  it('should update an edge between the new node and the node after the selected node', () => {
    const node1 = addNode()
    const node2 = addNode()
    const oldEdge = addEdge(node1.node, node2.node)
    act(() => {
      result.current.addNodeAfter(node1.node)
    })

    const insertedNode = getNodeById(
      result.current.state.elements,
      result.current.state.maxNodeId,
    )
    const updatedEdge = getElementById(
      oldEdge.id,
      result.current.state.elements,
    )
    expect(updatedEdge.source).toEqual(insertedNode.id)
    expect(updatedEdge.target).toEqual(node2.node.id)
  })
  it('should add an edge between the selected node and new node', () => {
    const node1 = addNode()
    const node2 = addNode()
    const oldEdge = addEdge(node1.node, node2.node)
    act(() => {
      result.current.addNodeAfter(node1.node)
    })

    const newEdge = getEdgesBySource(
      result.current.state.elements,
      node1.node,
    )[0]

    const insertedNode = getNodeById(
      result.current.state.elements,
      result.current.state.maxNodeId,
    )

    expect(newEdge.source).toEqual(node1.node.id)
    expect(newEdge.target).toEqual(insertedNode.id)
  })
  it('should add a node at the end', () => {
    act(() => {
      result.current.addNodeAfter()
    })
    const nodes = getNodes(result.current.state.elements)

    const insertedNode = getNodeById(
      result.current.state.elements,
      result.current.state.maxNodeId,
    )

    expect(nodes[nodes.length - 1]).toEqual(insertedNode)
  })
})
