import validateKeys from 'object-key-validator'

import { flowEfficiency, getNodeSums } from '../src/utils/utilities'

const elements = [
  {
    id: '1',
    elType: 'NODE',
    data: { processTime: 1, cycleTime: 4, pctCompleteAccurate: 25 },
  },
  {
    id: '2',
    elType: 'NODE',
    data: { processTime: 2, cycleTime: 5, pctCompleteAccurate: 75 },
  },
  {
    id: '3',
    elType: 'NODE',
    data: { processTime: 3, cycleTime: 6, pctCompleteAccurate: 100 },
  },
  {
    id: 'e1',
    elType: 'EDGE',
  },
]

it('should have the correct properties', () => {
  const rule = {
    $and: ['processTime', 'cycleTime', 'waitTime', 'flowEfficiency', 'avgPCA'],
  }
  const results = getNodeSums(elements)

  expect(validateKeys(rule, results)).toEqual(true)
})

it('should sum the values of the nodes', () => {
  const results = getNodeSums(elements)

  expect(results).toEqual({
    processTime: 6,
    cycleTime: 15,
    waitTime: 9,
    flowEfficiency: 0.4,
    avgPCA: 66.67,
  })
})
