import { isNode } from 'react-flow-renderer'
import validateKeys from 'object-key-validator'

import {
  buildEdge,
  buildNode,
  getEdges,
  getNodeSums,
  getNodes,
  roundTo2,
} from '../src/helpers'
import { elements as elementFixture } from './fixtures/elements'

const buildData = (processTime, waitTime, pctCompleteAccurate) => {
  return {
    description: '',
    actors: 1,
    processTime,
    waitTime,
    pctCompleteAccurate,
  }
}

const elements = elementFixture.map((el, idx) => {
  return isNode(el)
    ? {
        ...el,
        data: buildData(idx + 1, idx + 2, (idx + 1) * 2),
      }
    : el
})

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

    expect(result.id).toEqual('1_2')
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
    expect(filtered[0].elType).toEqual('NODE')
  })
  it('should return an array of only EDGE', () => {
    const nodes = [
      buildNode({ id: 1, x: 100, y: 80 }),
      buildNode({ id: 2, x: 100, y: 80 }),
    ]

    const elements = nodes.concat(buildEdge(nodes[0], nodes[1]))

    const filtered = getEdges(elements)

    // expect(filtered.length).toEqual(1)
    expect(filtered[0].elType).toEqual('EDGE')
  })
  it('should require coordinates', () => {
    expect(() => {
      buildNode({ id: 0 })
    }).toThrow('XY Coordinates not available for buildNode')
  })
})

describe('Building totals', () => {
  it('should have the correct properties', () => {
    const rule = {
      $and: [
        'processTime',
        'waitTime',
        'totalTime',
        'flowEfficiency',
        'avgPCA',
      ],
    }
    const results = getNodeSums(elements)

    expect(validateKeys(rule, results)).toEqual(true)
  })

  it('should sum the values of the nodes', () => {
    const results = getNodeSums(elements)
    const actorTime = elements
      .filter((el) => isNode(el))
      .map((node) => node.data)
      .reduce((acc, val) => acc + val.actors * val.processTime, 0)

    const processTime = elements
      .filter((el) => isNode(el))
      .reduce((acc, el) => {
        return acc + el.data.processTime
      }, 0)

    const waitTime = elements
      .filter((el) => isNode(el))
      .reduce((acc, el) => {
        return acc + el.data.waitTime
      }, 0)

    const totalTime = processTime + waitTime
    const flowEfficiency = roundTo2((processTime / totalTime) * 100)

    expect(results.actorTime).toEqual(actorTime)
    expect(results.averageActors).toEqual(1)
    expect(results.processTime).toEqual(processTime)
    expect(results.waitTime).toEqual(waitTime)
    expect(results.totalTime).toEqual(totalTime)
    expect(results.flowEfficiency).toEqual(flowEfficiency)
    expect(results.avgPCA).toEqual(6.5)
  })
})
