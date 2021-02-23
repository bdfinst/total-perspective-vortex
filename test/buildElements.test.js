import { isEdge, isNode } from 'react-flow-renderer'

import { buildEdge, buildNode, getEdges, getNodes } from '../src/helpers'

describe('Building nodes and edges', () => {
  it('should build a node with a default id', () => {
    const result = buildNode({ x: 100, y: 80 })

    expect(result.id).toEqual('-1')
    expect(result.position).toEqual({ x: 100, y: 80 })
  })
  it('should build a node with a specific id', () => {
    const result = buildNode({ id: 99, x: 100, y: 80 })

    expect(result.id).toEqual('99')
  })
  it('should not accept an id < 1', () => {
    const result = buildNode({ id: 0, x: 100, y: 80 })

    expect(result.id).toEqual('-1')
  })
  it('should build an edge connecting node 1 & 2', () => {
    const node1 = buildNode({ id: 1, x: 100, y: 80 })
    const node2 = buildNode({ id: 2, x: 100, y: 80 })
    const result = buildEdge(node1, node2)

    expect(result.source).toEqual('1')
    expect(result.target).toEqual('2')
  })

  it('should return an array of only NODE', () => {
    const nodes = [
      buildNode({ id: 1, x: 100, y: 80 }),
      buildNode({ id: 2, x: 100, y: 80 }),
    ]

    const elements = nodes.concat(buildEdge(nodes[0], nodes[1]))

    const filtered = getNodes(elements)

    expect(filtered.length).toEqual(2)
    expect(isNode(filtered[0])).toEqual(true)
  })
  it('should return an array of only EDGE', () => {
    const nodes = [
      buildNode({ id: 1, x: 100, y: 80 }),
      buildNode({ id: 2, x: 100, y: 80 }),
    ]

    const elements = nodes.concat(buildEdge(nodes[0], nodes[1]))

    const filtered = getEdges(elements)

    expect(isEdge(filtered[0])).toEqual(true)
  })
  it('should require coordinates', () => {
    expect(() => {
      buildNode({ id: 0 })
    }).toThrow('XY Coordinates not available for buildNode')
  })
})
