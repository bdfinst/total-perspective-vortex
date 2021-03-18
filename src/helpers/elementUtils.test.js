import { highlightConstraints } from './elementUtils'
import config from '../globalConfig'
import nodeStylesMock from '../__mocks__/nodeStyles'

describe('Colorizing constraints', () => {
  it('should colorize the largest constraint', () => {
    const highlighted = highlightConstraints(nodeStylesMock)
    const node3 = highlighted.filter((el) => el.id === '3')[0]
    const node1 = highlighted.filter((el) => el.id === '1')[0]
    const node2 = highlighted.filter((el) => el.id === '2')[0]

    expect(node3.style.background).toEqual(config.primaryConstraintColor)
    expect(node1.style.background).toEqual(config.secondaryConstraintColor)
    expect(node2.style.background).toEqual(config.secondaryConstraintColor)
  })
  it('should pass elements with no nodes', () => {
    const elements = [
      {
        id: 'e1',
        source: '1',
        target: '2',
      },
    ]
    const highlighted = highlightConstraints(elements)

    expect(highlighted).toEqual(elements)
  })
  it('should pass an empty array', () => {
    const elements = []
    const highlighted = highlightConstraints(elements)

    expect(highlighted).toEqual(elements)
  })
  it('should not highlight nodes with 0 time', () => {
    const elements = [
      {
        id: '2',
        data: {
          processName: '',
          people: 1,
          processTime: 0,
          waitTime: 0,
          pctCompleteAccurate: 100,
        },
        style: {
          width: 220,
          background: '#fff',
          borderColor: 'rgb(37, 50, 77)',
          borderRadius: '12px',
          borderStyle: 'solid',
          borderWidth: '4px',
          padding: 5,
        },
      },
    ]
    const highlighted = highlightConstraints(elements)

    expect(highlighted[0].style.background).toEqual(
      elements[0].style.background,
    )
  })
})
