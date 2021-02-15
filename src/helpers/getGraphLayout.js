import { isNode } from 'react-flow-renderer'
import dagre from 'dagre'

import { nodeDefaults } from './buildNode'

const dagreGraph = new dagre.graphlib.Graph()

/**
 *
 * @param {Array} elements
 * @param {boolean} useProportional
 */
export const getGraphLayout = (elements, useProportional = true) => {
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  dagreGraph.setGraph({ rankdir: 'LR' })
  const xShift = 50

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: nodeDefaults.width,
        height: nodeDefaults.height,
      })
    } else {
      dagreGraph.setEdge(el.source, el.target)
    }
  })

  dagre.layout(dagreGraph)
  return elements.map((el, idx) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id)
      const proportionalX =
        el.data.waitTime && el.data.waitTime > 0 && useProportional
          ? nodeWithPosition.x + el.data.waitTime * xShift
          : nodeWithPosition.x
      el.targetPosition = 'left'
      el.sourcePosition = 'right'
      // Pass a slightly different position to notify react flow about the change
      el.position = {
        x: proportionalX + Math.random() / 10000,
        y: nodeWithPosition.y,
      }
    }
    return el
  })
}
