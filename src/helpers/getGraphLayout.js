import { isEdge, isNode } from './elementUtils'
import config from '../globalConfig'

const processedNodes = []
let siblingId

const getEdges = (elements) => elements.filter((el) => isEdge(el))
const getNodes = (elements) => elements.filter((el) => isNode(el))
const notifyCoordinateChange = (ordinate) =>
  Math.round(ordinate) + Math.random() / 10000

const getParallelPosition = (el, prevPosition, parent) => {
  const newY =
    siblingId > 1 ? prevPosition.y + config.nodeHeight : parent.position.y
  const position = {
    x: notifyCoordinateChange(
      parent.position.x + config.betweenNodes + config.nodeWidth,
    ),
    y: notifyCoordinateChange(newY),
  }

  return { ...el, position }
}

const getNextLinkedPosition = (el, prevPosition) => {
  const position = {
    x: notifyCoordinateChange(
      prevPosition.x + config.betweenNodes + config.nodeWidth,
    ),
    y: prevPosition.y,
  }

  return { ...el, position }
}

const getDetachedPosition = (el, prevPosition) => {
  const position = {
    x: prevPosition.x,
    y: notifyCoordinateChange(prevPosition.y + config.nodeHeight),
  }

  return { ...el, position }
}

const getParentInfo = (node, edges, nodes) => {
  const link = edges.filter((e) => e.target === node.id)

  const childrenCount =
    link.length > 0
      ? edges.filter((e) => e.source === link[0].source).length
      : 0

  const parent =
    childrenCount > 0 ? nodes.find((n) => n.id === link[0].source) : {}

  return [parent, childrenCount]
}

/**
 *
 * @param {Array} elements
 * @param {boolean} useProportional
 */
export default function getGraphLayout(
  elements,
  // useProportional = false,
  // offsetWidth = config.betweenNodes,
) {
  const edges = getEdges(elements)
  const nodes = getNodes(elements)

  const newNodes = nodes.map((el, idx) => {
    let newNode

    const [parent, childrenCount] = getParentInfo(el, edges, processedNodes)

    const lastPosition =
      processedNodes.length > 0
        ? processedNodes[processedNodes.length - 1].position
        : el.position

    if (idx === 0) {
      processedNodes.push(el)
      return el
    }

    switch (childrenCount) {
      case 0:
        newNode = getDetachedPosition(el, lastPosition)
        siblingId = 1
        break
      case 1:
        newNode = getNextLinkedPosition(el, lastPosition)
        siblingId = 1
        break
      default:
        newNode = getParallelPosition(el, lastPosition, parent)
        siblingId += 1
        break
    }

    processedNodes.push(newNode)
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
