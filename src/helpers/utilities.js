export const getElementById = (id, elements) =>
  elements.filter((el) => el.id === `${id}`)[0]

export const addValues = (a, b) => Number(a) + Number(b)

export const getNodes = (elements) => {
  return elements.filter((element) => element.elType === 'NODE')
}

export const getNodeById = (elements, id) => {
  return getNodes(elements).find((node) => node.id === id)
}

export const getEdges = (elements) => {
  return elements.filter((element) => element.elType === 'EDGE')
}

export const edgeExists = (elements, newEdge) => {
  return getEdges(elements).find((el) => el.id === newEdge.id) ? true : false
}

export const getNodeSums = (elements) => {
  const sums = getNodes(elements)
    .map((element) => element.data)
    .reduce((acc, val) => {
      return {
        processTime: addValues(acc.processTime, val.processTime),
        waitTime: addValues(acc.waitTime, val.waitTime),
        actorTime: addValues(acc.waitTime, val.processTime * val.actors),
        pctCompleteAccurate: addValues(
          acc.pctCompleteAccurate,
          val.pctCompleteAccurate,
        ),
      }
    })

  const nodeCount = getNodes(elements).length

  const totals = {
    actorTime: sums.actorTime,
    processTime: sums.processTime,
    waitTime: sums.waitTime,
    totalTime: sums.waitTime + sums.processTime,
    flowEfficiency: flowEfficiency(
      sums.processTime,
      sums.processTime + sums.waitTime,
    ),
    avgPCA: Math.round((sums.pctCompleteAccurate / nodeCount) * 100) / 100,
  }

  return totals
}

export const flowEfficiency = (processTime, waitTime) => {
  if (waitTime === 0 || isNaN(waitTime)) {
    return 0
  }

  if (processTime === 0 || isNaN(waitTime) || waitTime < processTime) {
    return 0
  }

  return Math.round((processTime / waitTime) * 100) / 100
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
