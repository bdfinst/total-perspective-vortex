import { isEdge as isEdgeRFR, isNode as isNodeRFR } from 'react-flow-renderer'
import { v4 as uuidv4 } from 'uuid'

import config from '../globalConfig'
import theme from '../theme'

export const isNode = (element) => isNodeRFR(element)
export const isEdge = (element) => isEdgeRFR(element)

export const getElementById = (id, elements) =>
  elements.find((el) => `${el.id}` === `${id}`)

export const addValues = (a, b) => Number(a) + Number(b)

export const getProcessNodes = (elements) =>
  elements.filter(
    (element) => isNode(element) && element.type === config.processNodeType,
  )

export const getAllNodes = (elements) =>
  elements.filter((element) => isNode(element))

export const getReworkNodes = (elements) =>
  elements.filter(
    (element) => isNode(element) && element.type === config.reworkNodeType,
  )

export const isProcessNode = (element) =>
  isNode(element) && element.type === config.processNodeType

export const isReworkNode = (element) =>
  isNode(element) && element.type === config.reworkNodeType

export const getNodeById = (elements, id) =>
  getAllNodes(elements).find((node) => `${node.id}` === `${id}`)

export const getEdges = (elements) =>
  elements.filter((element) => isEdge(element))

export const getLastProcessNode = (elements) => {
  const el = getProcessNodes(elements)

  return el[el.length - 1]
}

export const getLastReworkNode = (elements) => {
  const el = getReworkNodes(elements)

  return el[el.length - 1]
}

/**
 *
 * @param {*} elements
 * @param {*} {sourceId, targetId}
 */
export const getEdge = (elements, { sourcedId, targetId }) =>
  getEdges(elements)
    .filter((e) => (sourcedId ? e.source === sourcedId : true))
    .filter((e) => (targetId ? e.target === targetId : true))
export const getEdgesBySource = (elements, node) =>
  getEdges(elements).filter((e) => e.source === node.id)

export const getEdgesByTarget = (elements, node) =>
  getEdges(elements).filter((e) => e.target === node.id)

export const getNodeIndexes = (elements) =>
  elements
    .map((e, index) => (isNode(e) ? { id: e.id, index } : undefined))
    .filter((e) => e !== undefined)

export const getLastEdge = (elements) => {
  const el = getEdges(elements)
  return el[el.length - 1]
}

export const findEdgesTo = (node, elements) =>
  elements
    .filter((element) => isEdge(element))
    .filter((edge) => edge.target === node.id)

export const edgeExists = (elements, newEdge) =>
  !!getEdges(elements).find(
    (el) => el.source === newEdge.source && el.target === newEdge.target,
  )

export const roundTo2 = (number) => Math.round(number * 100) / 100

const calcPropertyAvg = (nodes, property) => {
  const posFilter = (val) => val > 0
  const values = nodes
    .filter((node) => isNode(node))
    .filter((node) => posFilter(node.data[property]))
    .map((node) => node.data[property])

  return values.reduce((acc, pca) => acc + pca, 0) / values.length
}

export const convertToNumeric = (data) => {
  const outData = Object.keys(data).reduce(
    (map, key) => ({
      ...map,
      [key]:
        (typeof data[key] === 'string' && Number.isNaN(Number(data[key]))) ||
        data[key].length === 0
          ? data[key]
          : Number(data[key]),
    }),
    {},
  )

  return outData
}

const calcPropertySum = (nodes, property) =>
  nodes
    .map((node) => Number(node.data[property]))
    .reduce((acc, val) => acc + val, 0)

const totalPeopleTime = (nodes) =>
  nodes
    .map((node) => convertToNumeric(node.data))
    .reduce((acc, val) => acc + val.people * val.processTime, 0)

export const nodeReworkTime = (node) => {
  const values = convertToNumeric(node.data)
  return values.processTime * ((100 - values.pctCompleteAccurate) / 100)
}

const totalReworkTime = (nodes) =>
  nodes.map((node) => nodeReworkTime(node)).reduce((acc, val) => acc + val, 0)

export const calcFlowEfficiency = (processTime, totalTime) => {
  if (
    totalTime === 0 ||
    Number.isNaN(totalTime) ||
    processTime === 0 ||
    Number.isNaN(processTime)
  ) {
    return 0
  }

  return roundTo2((processTime / totalTime) * 100)
}

export const getNodesums = (elements) => {
  const nodes = getProcessNodes(elements).map((el) => ({
    ...el,
    data: convertToNumeric(el.data),
  }))

  const totals = {
    peopleTime: totalPeopleTime(nodes),
    averageActors:
      nodes.reduce((acc, node) => acc + node.data.people, 0) / nodes.length,
    processTime: calcPropertySum(nodes, 'processTime'),
    waitTime: calcPropertySum(nodes, 'waitTime'),
    avgPCA: roundTo2(calcPropertyAvg(nodes, 'pctCompleteAccurate')),
    reworkTime: totalReworkTime(nodes),
  }
  totals.totalTime = totals.waitTime + totals.processTime + totals.reworkTime
  totals.flowEfficiency = calcFlowEfficiency(
    totals.processTime,
    totals.totalTime,
  )

  return totals
}

export const toJson = (str) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}

export const removeElements = (elementsToRemove, elements) => {
  const nodeIdsToRemove = elementsToRemove.map((n) => n.id)

  return elements.filter((element) => {
    const edgeElement = element
    return !(
      nodeIdsToRemove.includes(element.id) ||
      nodeIdsToRemove.includes(edgeElement.target) ||
      nodeIdsToRemove.includes(edgeElement.source)
    )
  })
}

export const spliceArray = (array, index, element) => {
  const newArray = array.map((a) => a)
  newArray.splice(index, 0, element)
  return newArray
}

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
  const validCoordinate = (n) => !Number.isNaN(n) && n > -1

  if (!validCoordinate(x) || !validCoordinate(y)) {
    throw new Error('XY coordinates not available for buildNode')
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
  const validCoordinate = (n) => !Number.isNaN(n) && n > -1

  if (!validCoordinate(x) || !validCoordinate(y)) {
    throw new Error('XY coordinates not available for buildNode')
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

export const getParentInfo = (node, edges, nodes) => {
  const link = edges.filter((e) => e.target === node.id)

  const childrenCount =
    link.length > 0
      ? edges.filter((e) => e.source === link[0].source).length
      : 0

  const parent =
    childrenCount > 0 ? nodes.find((n) => n.id === link[0].source) : {}

  return [parent, childrenCount]
}

const nodeTotalTime = (node) =>
  node.data.processTime + node.data.waitTime + nodeReworkTime(node)

export const highlightConstraints = (elements) => {
  const values = elements
    .filter(
      (el) => isNode(el) && (el.data.processTime > 0 || el.data.waitTime > 0),
    )
    .map((el) => ({ id: el.id, time: nodeTotalTime(el) }))

  if (values.length < 1) return elements

  const reverseTimeSeq = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const time1 = a.time
    const time2 = b.time

    if (time1 > time2) return -1
    if (time1 < time2) return 1

    return 0
  }

  values.sort(reverseTimeSeq)

  const updated = elements.map((el) => {
    if (el.id === values[0].id)
      return {
        ...el,
        style: { ...el.style, background: config.primaryConstraintColor },
      }
    if (values.length > 2 && (el.id === values[1].id || el.id === values[2].id))
      return {
        ...el,
        style: { ...el.style, background: config.secondaryConstraintColor },
      }

    return el
  })

  return updated
}
