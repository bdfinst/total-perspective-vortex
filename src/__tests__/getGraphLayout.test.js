import { isNode } from 'react-flow-renderer'

import { elements } from '../__mocks__/elements'
import { getGraphLayout } from '../../src/helpers/getGraphLayout'

test.skip('should lay out the graph horizontally', () => {
  const items = elements().map((el, idx) => {
    if (isNode(el) && el.id === '2') {
      el.data.waitTime = 10
    }
    if (isNode(el) && el.id === '3') {
      el.data.waitTime = 20
    }

    return el
  })

  const waitoffest = 5
  const layout = getGraphLayout(items, false, waitoffest).filter((x) =>
    isNode(x),
  )

  expect(Math.round(layout[0].position.y)).toEqual(150)
  expect(Math.round(layout[1].position.y)).toEqual(500)
  expect(Math.round(layout[2].position.y)).toEqual(850)
})
