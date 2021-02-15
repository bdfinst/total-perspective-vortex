import { isNode } from 'react-flow-renderer'

import { elements } from './fixtures/elements'
import { getGraphLayout } from '../src/helpers/getGraphLayout'
import { nodeDefaults } from '../src/helpers'

test.skip('should lay out the graph horizontally', () => {
  const items = elements().map((el, idx) => {
    if (isNode(el) && el.id === '2') {
      el.data.waitTime = 10
    }

    return el
  })

  const waitoffest = 5
  const layout = getGraphLayout(items, true, waitoffest)

  let lastY = 150

  layout
    .filter((el) => isNode(el))
    .map((el) => {
      if (el.id === '1') {
        expect(Math.round(el.position.y)).toEqual(lastY)
      } else if (el.id === '2') {
        console.log(el.position.y, lastY, el.data.waitTime, waitoffest)
        expect(Math.round(el.position.y)).toEqual(
          lastY + el.data.waitTime * waitoffest,
        )
      } else {
        expect(Math.round(el.position.y)).toEqual(lastY + 300)
      }
      lastY = Math.round(el.position.y)
    })
})
