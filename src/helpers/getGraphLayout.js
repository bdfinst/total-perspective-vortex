import { isNode } from 'react-flow-renderer'
import dagre from 'dagre'

import { nodeDefaults } from './buildNode'

/**
 *
 * @param {Array} elements
 * @param {boolean} useProportional
 */
export default function getGraphLayout(
  elements,
  useProportional = true,
  offsetWidth = 50,
) {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  dagreGraph.setGraph({ rankdir: 'LR' })

  const offsetPosition = (waitTime, offset) =>
    useProportional && waitTime > 0 ? waitTime * offset : 0

  const getNewXY = (el) => {
    let position
    let totalOffset = 0

    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id)

      totalOffset += offsetPosition(el.data.waitTime, offsetWidth)

      // Pass a slightly different position to notify react flow about the change
      position = {
        x: nodeWithPosition.x + totalOffset + Math.random() / 10000,
        y: nodeWithPosition.y,
      }
    }

    return position
  }

  elements.forEach((el) => {
    if (isNode(el)) {
      const { width } = nodeDefaults
      const { height } = nodeDefaults

      dagreGraph.setNode(el.id, {
        width,
        height,
      })
    } else {
      dagreGraph.setEdge(el.source, el.target)
    }
  })

  dagre.layout(dagreGraph)

  return elements.map((el) => ({ ...el, position: getNewXY(el) }))
}
