import { flowEfficiency, getNodeSums } from '../src/utils/utilities'

it('should sum the values of the nodes', () => {
  const elements = [
    {
      id: '1',
      elType: 'NODE',
      data: { processTime: 1, cycleTime: 4, pctCompleteAccurate: 100 },
    },
    {
      id: '2',
      elType: 'NODE',
      data: { processTime: 2, cycleTime: 5, pctCompleteAccurate: 100 },
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

  const results = getNodeSums(elements)

  expect(results).toEqual({
    processTime: 6,
    cycleTime: 15,
    pctCompleteAccurate: 100,
  })
})

it('should return flow efficiency', () => {
  expect(flowEfficiency(10, 20)).toEqual(50)
})
