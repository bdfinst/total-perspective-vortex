import _ from 'lodash'

import { buildEdge } from './buildEdge'
import { buildElementsFromFile } from './formatVsmData'
import { buildNode } from './buildNode'
import isSameJsonSchema from './isSameJsonSchema'

const dataFile = [
  {
    id: '1',
    data: {
      processName: '',
      people: 0,
      processTime: 0,
      waitTime: 0,
      pctCompleteAccurate: 100,
    },
  },
  {
    id: '2',
    data: {
      processName: '',
      people: 0,
      processTime: 0,
      waitTime: 0,
      pctCompleteAccurate: 100,
    },
  },
  {
    source: '1',
    target: '2',
  },
]

describe('Converting loaded data to elements', () => {
  const nodes = [
    buildNode({ id: 1, x: 1, y: 1 }),
    buildNode({ id: 2, x: 1, y: 1 }),
  ]
  const edge = buildEdge(nodes[0], nodes[1])
  const elements = nodes.concat(edge)

  it('should produce a node element', () => {
    const newElements = buildElementsFromFile(dataFile)

    expect(isSameJsonSchema(elements, newElements)).toEqual(true)
  })
})
