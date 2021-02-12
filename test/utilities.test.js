import validateKeys from 'object-key-validator'

import {
  buildEdge,
  buildNode,
  getNodeSums,
  getNodes,
} from '../src/helpers/utilities'

const buildData = (processTime, waitTime, pctCompleteAccurate) => {
  return {
    description: '',
    actors: 1,
    processTime,
    waitTime,
    pctCompleteAccurate,
  }
}
const elements = [
  {
    id: '1',
    elType: 'NODE',
    data: buildData(1, 2, 25),
  },
  {
    id: '2',
    elType: 'NODE',
    data: buildData(2, 3, 75),
  },
  {
    id: '3',
    elType: 'NODE',
    data: buildData(3, 4, 100),
  },
  {
    id: 'e1',
    elType: 'EDGE',
  },
]

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

    const filtered = getNodes(elements)

    expect(filtered.length).toEqual(1)
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

    expect(results).toEqual({
      actorTime: 8,
      processTime: 6,
      waitTime: 9,
      totalTime: 15,
      flowEfficiency: 0.4,
      avgPCA: 66.67,
    })
  })
})
