import { getParentInfo, isEdge, isNode } from './elementUtils'
import config from '../globalConfig'

const processedNodes = []
let siblingId

const getEdges = elements => elements.filter(el => isEdge(el))
const getNodes = elements => elements.filter(el => isNode(el))
const notifyCoordinateChange = ordinate =>
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

const getDetachedPosition = (el, prevPosition) => {
  const position = {
    x: prevPosition.x,
    y: notifyCoordinateChange(prevPosition.y + config.nodeHeight),
  }

  return { ...el, position }
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
        siblingId = 0
        newNode = getDetachedPosition(el, lastPosition)
        break
      case 1:
        siblingId = 0
        // newNode = getNextLinkedPosition(el, lastPosition)
        newNode = getParallelPosition(el, lastPosition, parent)
        break
      default:
        siblingId += 1
        newNode = getParallelPosition(el, lastPosition, parent)
        break
    }

    processedNodes.push(newNode)
    return newNode
  })

  return newNodes.concat(edges)
}
