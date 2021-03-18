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
    console.log(elements)
    const lastPosition = dataFile[1].position
    const verticalOffset =
      lastPosition.y + config.betweenRows + config.nodeHeight
    expect(elements[3].position.y).toEqual(verticalOffset)
    expect(Math.round(elements[3].position.x)).toEqual(
      Math.round(lastPosition.x),
    )
  })
})
