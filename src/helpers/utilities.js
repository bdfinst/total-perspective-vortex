import { isEdge, isNode } from 'react-flow-renderer'

export const getElementById = (id, elements) =>
  elements.filter((el) => el.id === `${id}`)[0]

export const addValues = (a, b) => Number(a) + Number(b)

export const getNodes = (elements) => {
  return elements.filter((element) => isNode(element))
}

export const getNodeById = (elements, id) => {
  return getNodes(elements).find((node) => `${node.id}` === `${id}`)
}

export const getEdges = (elements) => {
  return elements.filter((element) => isEdge(element))
}

export const getLastNode = (elements) => {
  const el = getNodes(elements)

  return el[el.length - 1]
}

export const getEdgesBySource = (elements, node) => {
  return getEdges(elements).filter((e) => e.source === node.id)
}

export const getEdgesByTarget = (elements, node) => {
  return getEdges(elements).filter((e) => e.target === node.id)
}

export const getLastEdge = (elements) => {
  const el = getEdges(elements)
  return el[el.length - 1]
}

export const findEdgesTo = (node, elements) => {
  return elements
    .filter((element) => isEdge(element))
    .filter((edge) => edge.target === node.id)
}

export const edgeExists = (elements, newEdge) => {
  return getEdges(elements).find(
    (el) => el.source === newEdge.source && el.target === newEdge.target,
  )
    ? true
    : false
}

export const roundTo2 = (number) => Math.round(number * 100) / 100

const calcPropertyAvg = (nodes, property) => {
  const posFilter = (val) => val > 0
  const values = nodes
    .filter((node) => isNode(node))
    .filter((node) => posFilter(node.data[property]))
    .map((node) => node.data[property])

  return (
    values.reduce((acc, pca) => {
      return acc + pca
    }, 0) / values.length
  )
}

const calcPropertySum = (nodes, property) => {
  const values = nodes
    .filter((node) => isNode(node))
    .map((node) => node.data[property])

  return values.reduce((acc, pca) => {
    return acc + pca
  }, 0)
}

export const getNodeSums = (elements) => {
  const nodes = getNodes(elements)
  const peopleTime = nodes
    .map((node) => node.data)
    .reduce((acc, val) => acc + val.people * val.processTime, 0)

  const totals = {
    peopleTime: peopleTime,
    averageActors:
      nodes.reduce((acc, node) => acc + node.data.people, 0) / nodes.length,
    processTime: calcPropertySum(elements, 'processTime'),
    waitTime: calcPropertySum(elements, 'waitTime'),
    avgPCA: roundTo2(calcPropertyAvg(elements, 'pctCompleteAccurate')),
  }
  totals.totalTime = totals.waitTime + totals.processTime
  totals.flowEfficiency = calcFlowEfficiency(
    totals.processTime,
    totals.totalTime,
  )

  return totals
}

export const calcFlowEfficiency = (processTime, totalTime) => {
  if (
    totalTime === 0 ||
    isNaN(totalTime) ||
    processTime === 0 ||
    isNaN(processTime)
  ) {
    return 0
  }

  return roundTo2((processTime / totalTime) * 100)
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
