import { isNode } from 'react-flow-renderer'

import getGraphLayout from '../src/helpers/getGraphLayout'

const elements = [
  {
    id: '1',
    sourcePosition: 'right',
    targetPosition: 'left',
    position: {
      x: 87.50006149411689,
      y: 150,
    },
  },
  {
    id: '2',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: {
      waitTime: 0,
    },

    position: {
      x: 312.50005313585376,
      y: 150,
    },
  },
  {
    id: '1_2',
    source: '1',
    target: '2',
  },
  {
    id: '3',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: {
      waitTime: 3,
    },
    position: {
      x: 687.500039657312,
      y: 150,
    },
  },
  {
    id: '2_3',
    source: '2',
    target: '3',
  },
  {
    id: '4',

    sourcePosition: 'right',
    targetPosition: 'left',
    data: {
      waitTime: 2,
    },

    position: {
      x: 862.5000823083907,
      y: 150,
    },
  },
  {
    id: '3_4',
    source: '3',
    target: '4',
  },
]

test('should lay out the graph horizontally', () => {
  // const layout = getGraphLayout(elements, false)
  elements.map((el) => {
    if (isNode(el)) {
      expect(el.position.y).toEqual(1)
    }
  })
})
