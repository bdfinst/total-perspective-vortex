import { highlightConstraints } from './elementUtils'
import config from '../globalConfig'
import nodeStylesMock from '../__mocks__/nodeStyles'

describe('Colorizing constraints', () => {
  it('should colorize the largest constraint and top two secondary constraints', () => {
    const highlighted = highlightConstraints(nodeStylesMock)

    const getNodeColor = id => {
      return highlighted.filter(el => el.id === `${id}`)[0].style.background
    }

    expect(getNodeColor(2)).toEqual(config.primaryConstraintColor)
    expect(getNodeColor(3)).toEqual(config.secondaryConstraintColor)
    expect(getNodeColor(5)).toEqual(config.secondaryConstraintColor)
    expect(getNodeColor(1)).toEqual(config.nodeDefaultColor)
    expect(getNodeColor(4)).toEqual(config.nodeDefaultColor)
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
