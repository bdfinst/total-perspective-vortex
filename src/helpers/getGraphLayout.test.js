import { isNode } from 'react-flow-renderer'

import config from '../globalConfig'
import dataFile from '../__mocks__/layout'
import getGraphLayout from './getGraphLayout'

describe('Layout VSM path', () => {
  const verticalOffset = config.nodeHeight
  const horizontalOffset = config.betweenNodes + config.nodeWidth

  it.skip('should add new nodes with no edges below the last node', () => {
    const newNode = {
      id: '3',
      position: { x: 0, y: 0 },
    }
    const elements = getGraphLayout(dataFile.concat(newNode))

    const lastPosition = elements[1].position

    const updatedNode = elements.find((el) => el.id === '3')
    expect(Math.round(updatedNode.position.y)).toEqual(
      Math.round(lastPosition.y + verticalOffset),
    )
    expect(Math.round(updatedNode.position.x)).toEqual(
      Math.round(lastPosition.x),
    )
  })
  it('should layout attached nodes from left to right', () => {
    const newNode = [
      {
        id: '3',
        position: { x: 0, y: 0 },
      },
      {
        id: '42',
        source: '2',
        target: '3',
      },
    ]

    const elements = getGraphLayout(dataFile.concat(newNode))

    const updatedNode = elements.find((el) => el.id === '3')
    const lastPosition = elements.find((el) => el.id === '2').position

    expect(Math.round(updatedNode.position.x)).toEqual(
      Math.round(lastPosition.x + horizontalOffset),
    )
    expect(updatedNode.position.y).toEqual(lastPosition.y)
  })
  it('should arrange parallel flows', () => {
    const newElements = [
      {
        id: '3',
        position: { x: 0, y: 0 },
      },
      {
        id: '42',
        source: '1',
        target: '3',
      },
    ]

    const elements = getGraphLayout(dataFile.concat(newElements))

    console.log(elements)

    const node3 = elements.find((el) => el.id === '3')
    const node1Position = elements.find((el) => el.id === '1').position

    expect(Math.round(node3.position.x)).toEqual(
      Math.round(node1Position.x + horizontalOffset),
    )
    expect(Math.round(node3.position.y)).toEqual(
      Math.round(node1Position.y + verticalOffset),
    )
  })
})
