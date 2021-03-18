import { isEdge as isEdgeRFR, isNode as isNodeRFR } from 'react-flow-renderer'
import { v4 as uuidv4 } from 'uuid'

import config from '../globalConfig'
import theme from '../theme'

export const isNode = (element) => isNodeRFR(element)
export const isEdge = (element) => isEdgeRFR(element)

export const createEdgeId = () => `${uuidv4()}`

export const buildEdge = (source, target) => ({
  id: createEdgeId(),
  source: `${source.id}`,
  target: `${target.id}`,
  arrowHeadType: 'arrowclosed',
  type: 'custom',
  selected: false,
})

export const defaultNodeData = {
  processName: '',
  people: 0,
  processTime: 0,
  waitTime: 0,
  pctCompleteAccurate: 100,
}

export const buildNode = ({ id, x, y }) => {
  const validCoord = (n) => !Number.isNaN(n) && n > -1

  if (!validCoord(x) || !validCoord(y)) {
    throw new Error('XY Coordinates not available for buildNode')
  }
  const position = { x, y }

  return {
    id: id > 0 ? `${id}` : '-1',
    type: config.processNodeType,
    sourcePosition: 'right',
    targetPosition: 'left',
    selected: false,
    data: defaultNodeData,
    style: {
      width: config.nodeWidth,
      background: theme.palette.background.paper,
      borderColor: config.deselectedColor,
      borderRadius: '12px',
      borderStyle: 'solid',
      borderWidth: '4px',
      padding: 5,
    },
    position,
  }
}

export const buildReworkNode = ({ id, x, y }) => {
  const validCoord = (n) => !Number.isNaN(n) && n > -1

  if (!validCoord(x) || !validCoord(y)) {
    throw new Error('XY Coordinates not available for buildNode')
  }
  const position = { x, y }

  return {
    id: id > 0 ? `${id}` : '-1',
    type: config.reworkNodeType,
    sourcePosition: 'left',
    targetPosition: 'bottom',
    selected: false,
    data: { description: '' },
    style: {
      width: config.nodeWidth,
      background: theme.palette.background.paper,
      borderColor: config.deselectedColor,
      borderRadius: '12px',
      borderStyle: 'solid',
      borderWidth: '4px',
      padding: 5,
    },
    position,
  }
}

export const getParentInfo = (node, elements) => {
  const edges = elements.filter((el) => isEdge(el))
  const nodes = elements.filter((el) => isNode(el))

  const link = edges.filter((e) => e.target === node.id)

  const childrenCount =
    link.length > 0
      ? edges.filter((e) => e.source === link[0].source).length
      : 0

  const parent =
    childrenCount > 0 ? nodes.find((n) => n.id === link[0].source) : {}

  return [parent, childrenCount]
}
