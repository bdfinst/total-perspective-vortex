import validateKeys from 'object-key-validator'

import { flowEfficiency, getNodeSums } from '../src/utils/utilities'

const elements = [
  {
    id: '1',
    elType: 'NODE',
    data: { processTime: 1, waitTime: 2, pctCompleteAccurate: 25 },
  },
  {
    id: '2',
    elType: 'NODE',
    data: { processTime: 2, waitTime: 3, pctCompleteAccurate: 75 },
  },
  {
    id: '3',
    elType: 'NODE',
    data: { processTime: 3, waitTime: 4, pctCompleteAccurate: 100 },
  },
  {
    id: 'e1',
    elType: 'EDGE',
  },
]

it('should have the correct properties', () => {
  const rule = {
    $and: ['processTime', 'waitTime', 'totalTime', 'flowEfficiency', 'avgPCA'],
  }
  const results = getNodeSums(elements)

  expect(validateKeys(rule, results)).toEqual(true)
})

it('should sum the values of the nodes', () => {
  const results = getNodeSums(elements)

  expect(results).toEqual({
    processTime: 6,
    waitTime: 9,
    totalTime: 15,
    flowEfficiency: 0.4,
    avgPCA: 66.67,
  })
})
