import { isNode } from 'react-flow-renderer'
import dagre from 'dagre'

import { nodeDefaults } from './buildNode'

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

/**
 *
 * @param {Array} elements
 * @param {boolean} useProportional
 */
export const getGraphLayout = (
  elements,
  useProportional = true,
  waitOffset = 50,
) => {
  console.log(useProportional, waitOffset)
  dagreGraph.setGraph({ rankdir: 'LR' })

  const offsetWidth = (waitTime, offset) =>
    useProportional && waitTime > 0 ? waitTime * offset : 0

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: nodeDefaults.width + offsetWidth(el.data.waitTime, waitOffset),
        height: nodeDefaults.height,
      })
    } else {
      dagreGraph.setEdge(el.source, el.target)
    }
  })

  dagre.layout(dagreGraph)

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id)

      el.targetPosition = 'left'
      el.sourcePosition = 'right'
      // Pass a slightly different position to notify react flow about the change
      el.position = {
        x: nodeWithPosition.x,
        y: nodeWithPosition.y + Math.random() / 10000,
      }
    }
    return el
  })
}
