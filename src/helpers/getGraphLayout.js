import { isNode } from 'react-flow-renderer'
import dagre from 'dagre'

import { nodeDefaults } from './buildNode'

/**
 *
 * @param {Array} elements
 * @param {boolean} useProportional
 */
export const getGraphLayout = (
  elements,
  useProportional = true,
  offsetWidth = 50,
) => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  dagreGraph.setGraph({ rankdir: 'LR' })

  const offsetPosition = (waitTime, offset) => {
    return useProportional && waitTime > 0 ? waitTime * offset : 0
  }

  elements.forEach((el) => {
    if (isNode(el)) {
      const width = nodeDefaults.width
      const height = nodeDefaults.height

      dagreGraph.setNode(el.id, {
        width: width,
        height: height,
      })
    } else {
      dagreGraph.setEdge(el.source, el.target)
    }
  })

  dagre.layout(dagreGraph)

  let totalOffset = 0
  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id)

      totalOffset = totalOffset + offsetPosition(el.data.waitTime, offsetWidth)

      // Pass a slightly different position to notify react flow about the change
      el.position = {
        x: nodeWithPosition.x + totalOffset + Math.random() / 10000,
        y: nodeWithPosition.y,
      }
    }
    return el
  })
}
