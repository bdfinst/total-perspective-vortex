import config from '../globalConfig'
import dataFile from '../__mocks__/layout'
import getGraphLayout from './getGraphLayout'

describe('Layout VSM path', () => {
  const verticalOffset = config.nodeHeight
  const horizontalOffset = config.betweenNodes + config.nodeWidth

  it('should add new nodes with no edges below the last node', () => {
    const newNode = {
      id: '3',
      position: { x: 100, y: 100 },
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
        position: { x: 100, y: 100 },
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
    expect(Math.round(updatedNode.position.y)).toEqual(
      Math.round(lastPosition.y),
    )
  })
  it('should arrange parallel flows', () => {
    const newElements = [
      {
        id: '1',
        position: { x: 100, y: 100 },
      },
      {
        id: '2',
        position: { x: 100, y: 100 },
      },
      {
        id: '3',
        position: { x: 100, y: 100 },
      },
      {
        id: '4',
        position: { x: 100, y: 100 },
      },
      {
        id: '5',
        position: { x: 100, y: 100 },
      },
      {
        id: 'e1',
        source: '1',
        target: '2',
      },
      {
        id: 'e2',
        source: '1',
        target: '3',
      },
      {
        id: 'e3',
        source: '3',
        target: '5',
      },
      {
        id: 'e4',
        source: '2',
        target: '4',
      },
    ]

    const elements = getGraphLayout(newElements)

    const node1 = elements.find((el) => el.id === '1')
    const node2 = elements.find((el) => el.id === '2')
    const node3 = elements.find((el) => el.id === '3')
    const node4 = elements.find((el) => el.id === '4')
    const node5 = elements.find((el) => el.id === '5')

    expect(Math.round(node2.position.y)).toEqual(Math.round(node1.position.y))
    expect(Math.round(node2.position.x)).toEqual(Math.round(node3.position.x))
    expect(Math.round(node2.position.y)).toBeLessThan(
      Math.round(node3.position.y),
    )
    expect(Math.round(node4.position.y)).toEqual(Math.round(node2.position.y))
    expect(Math.round(node5.position.y)).toEqual(Math.round(node3.position.y))
  })
})
