import _ from 'lodash'

import { buildEdge, buildNode } from './elementUtils'
import {
  buildElementsFromFile,
  buildFileFromElements,
  isValidFile,
} from './formatVsmData'
import dataFile from '../__mocks__/vsmInit'
import isSameJsonSchema from './isSameJsonSchema'

describe('Converting loaded data to elements', () => {
  const nodes = [
    buildNode({ id: 1, x: 1, y: 1 }),
    buildNode({ id: 2, x: 1, y: 1 }),
  ]
  const edge = buildEdge(nodes[0], nodes[1])
  const elements = nodes.concat(edge)

  it('should convert the file to elements', () => {
    const newElements = buildElementsFromFile(dataFile)

    expect(isSameJsonSchema(elements, newElements)).toEqual(true)
  })
  it('should convert the elements to the file formet', () => {
    const converted = buildFileFromElements(elements)

    expect(isSameJsonSchema(converted, dataFile)).toEqual(true)
  })
  describe('Idnetifying bad files', () => {
    it('should reject a data file that is not an array', () => {
      expect(isValidFile({})).toEqual(false)
      expect(isValidFile([])).toEqual(true)
    })
    it('should reject a data file that does not contain nodes', () => {
      expect(isValidFile({})).toEqual(false)
    })
    it('should reject a data file that has bad nodes', () => {
      const badFile = [
        {
          id: '1',
          data: {
            processName: '',
            people: 0,
            waitTime: 0,
            pctCompleteAccurate: 100,
          },
        },
      ]
      expect(isValidFile(badFile)).toEqual(false)
    })
    it('should reject a data file that has bad edges', () => {
      const badFile = [
        {
          target: '2',
        },
      ]
      expect(isValidFile(badFile)).toEqual(false)
    })
    it('should accept a good data file', () => {
      expect(isValidFile(dataFile)).toEqual(true)
    })
  })
})
