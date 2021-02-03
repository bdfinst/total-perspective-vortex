import validateKeys from 'object-key-validator'

import { getNodeSums } from '../src/utils/utilities'

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
    actorTime: 8,
    processTime: 6,
    waitTime: 9,
    totalTime: 15,
    flowEfficiency: 0.4,
    avgPCA: 66.67,
  })
})
