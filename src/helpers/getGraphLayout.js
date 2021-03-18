import { isEdge, isNode } from 'react-flow-renderer'
import dagre from 'dagre'

import config from '../globalConfig'

let lastPosition = { x: 0, y: 0 }

const getEdges = (elements) => elements.filter((el) => isEdge(el))
const getNodes = (elements) => elements.filter((el) => isNode(el))
const notifyCoordinateChange = (ordinate) =>
  Math.round(ordinate) + Math.random() / 10000

const getNextLinkedPosition = (el, idx, nodes) => {
  const position = {
    x: notifyCoordinateChange(
      lastPosition.x + config.betweenNodes + config.nodeWidth,
    ),
    y: nodes[idx - 1].position.y,
  }

  return { ...el, position }
}

const getDetachedPosition = (el, prevPosition) => {
  const position = {
    x: prevPosition.x,
    y: notifyCoordinateChange(
      prevPosition.y + config.betweenRows + config.nodeHeight,
    ),
  }
  return { ...el, position }
}

const isLinkedNode = (node, edges) =>
  edges.find((e) => e.source === node.id || e.target === node.id)

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
  const edges = getEdges(elements)
  const nodes = getNodes(elements)

  const newNodes = nodes.map((el, idx) => {
    if (idx === 0) {
      lastPosition = el.position
      return el
    }

    const newNode = isLinkedNode(el, edges)
      ? getNextLinkedPosition(el, idx, nodes)
      : getDetachedPosition(el, lastPosition)

    lastPosition = newNode.position

    return newNode
  })
  return newNodes.concat(edges)

  // const dagreGraph = new dagre.graphlib.Graph()
  // dagreGraph.setDefaultEdgeLabel(() => ({}))

  // // network-simplex, tight-tree or longest-path
  // dagreGraph.setGraph({
  //   rankdir: 'LR',
  //   align: 'UL',
  //   ranker: 'network-simplex',
  // })

  // const offsetPosition = (waitTime, offset) =>
  //   useProportional && waitTime > 0 ? waitTime * offset : 0

  // const getNewXY = (el) => {
  //   let position

  //   if (isNode(el)) {
  //     const nodeWithPosition = dagreGraph.node(el.id)

  //     totalOffset += offsetPosition(el.data.waitTime, offsetWidth)

  //     // Pass a slightly different position to notify react flow about the change
  //     const calcY = nodeWithPosition.y

  //     const calcX = nodeWithPosition.x + totalOffset + Math.random() / 10000

  //     position = {
  //       x: calcX,
  //       y: calcY,
  //     }
  //   }

  //   return position
  // }

  // // TODO: make width actual node width to enable relative widths
  // elements.forEach((el) => {
  //   if (isNode(el)) {
  //     dagreGraph.setNode(el.id, {
  //       width: config.nodeWidth,
  //       height: config.nodeHeight,
  //     })
  //   } else {
  //     dagreGraph.setEdge(el.source, el.target)
  //   }
  // })

  // dagre.layout(dagreGraph)

  // return elements.map((el) => ({ ...el, position: getNewXY(el) }))
}
