import { isNode } from 'react-flow-renderer'
import validateKeys from 'object-key-validator'

import { buildStaticElements } from './fixtures/elements'
import {
  calcFlowEfficiency,
  convertToNumeric,
  getNodeSums,
  roundTo2,
} from '../src/helpers'

const nodes = buildStaticElements()
// nodes = elementFixture(10)

describe('Building totals', () => {
  let results
  let processTime
  let waitTime
  beforeEach(() => {
    results = getNodeSums(nodes)

    processTime = nodes.reduce((acc, el) => {
      return acc + Number(el.data.processTime)
    }, 0)

    waitTime = nodes.reduce((acc, el) => {
      return acc + Number(el.data.waitTime)
    }, 0)
  })

  it('should convert the data properties to numbers', () => {
    const data = convertToNumeric(nodes[0].data)

    expect(typeof data.processName).toEqual('string')
    expect(typeof data.people).toEqual('number')
    expect(typeof data.processTime).toEqual('number')
    expect(typeof data.waitTime).toEqual('number')
    expect(typeof data.pctCompleteAccurate).toEqual('number')
  })

  it('should have the correct properties', () => {
    const rule = {
      $and: [
        'processTime',
        'waitTime',
        'totalTime',
        'flowEfficiency',
        'avgPCA',
        'peopleTime',
        'averageActors',
      ],
    }

    expect(validateKeys(rule, results)).toEqual(true)
  })

  it('should calculate flow efficiency', () => {
    const workTime = 10
    const totalTime = 20
    const expectedFE = 50
    expect(calcFlowEfficiency(workTime, totalTime)).toEqual(expectedFE)
  })
  it('should calacuate the total manual process time', () => {
    const peopleTime = 199

    expect(results.peopleTime).toEqual(peopleTime)
  })
  it('should calculate the total process time', () => {
    expect(results.processTime).toEqual(processTime)
  })

  it('should sum the the average number of people per process', () => {
    const expected = 5.4

    expect(results.averageActors).toEqual(expected)
  })
  it('should sum the total time waiting to start work', () => {
    expect(results.waitTime).toEqual(waitTime)
  })
  it('should sum the total duration of the value stream', () => {
    const totalTime = processTime + waitTime

    expect(results.totalTime).toEqual(totalTime)
  })
  it('should calculate the flow efficiency', () => {
    const totalTime = processTime + waitTime
    const flowEfficiency = roundTo2((processTime / totalTime) * 100)

    expect(results.flowEfficiency).toEqual(flowEfficiency)
  })
  it('should average the rework percentage of the value stream', () => {
    expect(results.avgPCA).toEqual(65)
  })
})
