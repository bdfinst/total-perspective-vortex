import { isNode } from 'react-flow-renderer'

import config from '../globalConfig'
import dataFile from '../__mocks__/layout'
import getGraphLayout from './getGraphLayout'

describe('Layout VSM path', () => {
  it('should add new nodes with no edges below the last node', () => {
    const newNode = {
      id: '3',
      type: 'processNode',
      sourcePosition: 'right',
      targetPosition: 'left',
      selected: false,
      data: {},
      style: {},
      position: { x: 0, y: 0 },
    }
    const elements = getGraphLayout(dataFile.concat(newNode))

    const lastPosition = dataFile[1].position
    const verticalOffset =
      lastPosition.y + config.betweenRows + config.nodeHeight

    const updatedNode = elements.find((el) => el.id === '3')
    expect(updatedNode.position.y).toEqual(verticalOffset)
    expect(Math.round(updatedNode.position.x)).toEqual(
      Math.round(lastPosition.x),
    )
  })
  it('should layout attached nodes from left to right', () => {
    const newNode = [
      {
        id: '3',
        type: 'processNode',
        sourcePosition: 'right',
        targetPosition: 'left',
        selected: false,
        data: {},
        style: {},
        position: { x: 0, y: 0 },
      },
      {
        id: '42',
        source: '2',
        target: '3',
        arrowHeadType: 'arrowclosed',
        type: 'custom',
        selected: false,
      },
    ]

    const elements = getGraphLayout(dataFile.concat(newNode))

    // const lastPosition = dataFile[1].position
    // const verticalOffset =
    //   lastPosition.y + config.betweenRows + config.nodeHeight

    const updatedNode = elements.find((el) => el.id === '3')
    const lastPosition = elements.find((el) => el.id === '2').position

    expect(updatedNode.position.x).toEqual(lastPosition.x)
    expect(updatedNode.position.y).toEqual(lastPosition.y)
  })
})
