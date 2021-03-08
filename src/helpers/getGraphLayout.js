import { isNode } from 'react-flow-renderer'
import dagre from 'dagre'

import { isReworkNode } from '.'
import config from '../globalConfig'

/**
 *
 * @param {Array} elements
 * @param {boolean} useProportional
 */
export default function getGraphLayout(
  elements,
  useProportional = false,
  offsetWidth = config.betweenNodes,
) {
  let totalOffset = 0

  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))

  // network-simplex, tight-tree or longest-path
  dagreGraph.setGraph({
    rankdir: 'LR',
    align: 'UL',
    ranker: 'network-simplex',
  })

  const offsetPosition = (waitTime, offset) =>
    useProportional && waitTime > 0 ? waitTime * offset : 0

  const getNewXY = (el) => {
    let position

    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id)

      totalOffset += offsetPosition(el.data.waitTime, offsetWidth)

      // Pass a slightly different position to notify react flow about the change
      const calcY = isReworkNode(el)
        ? nodeWithPosition.y - 150
        : nodeWithPosition.y

      const xPos = nodeWithPosition.x + totalOffset + Math.random() / 10000
      const calcX = isReworkNode(el) ? xPos - 100 : xPos

      position = {
        x: calcX,
        y: calcY,
      }
    }

    return position
  }

  // TODO: make width actual node width to enable relative widths
  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, {
        width: config.nodeWidth,
        height: config.nodeHeight,
      })
    } else {
      dagreGraph.setEdge(el.source, el.target)
    }
  })

  dagre.layout(dagreGraph)

  return elements.map((el) => ({ ...el, position: getNewXY(el) }))
}
