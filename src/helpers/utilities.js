export const flowEfficiency = (processTime, waitTime) => {
  if (waitTime === 0 || isNaN(waitTime)) {
    return 0
  }

  if (processTime === 0 || isNaN(waitTime) || waitTime < processTime) {
    return 0
  }

  return Math.round((processTime / waitTime) * 100) / 100
}

export const nodeStyle = {
  border: '2px solid #3385e9',
  borderRadius: '12px',
  padding: 8,
  minWidth: '100px',
}

/**
 *
 * @param {x,y} x and y Coordinates
 */
export const buildNode = ({ id, x, y }) => {
  if (!x || !y) {
    throw new Error('XY Coordinates not available for buildNode')
  }
  const position = { x, y }

  return {
    id: id > 0 ? `${id}` : '-1',
    type: 'stepNode',
    elType: 'NODE',
    sourcePosition: 'right',
    targetPosition: 'left',
    data: {
      description: '',
      actors: 0,
      processTime: 0,
      waitTime: 0,
      pctCompleteAccurate: 100,
    },
    style: nodeStyle,
    position,
  }
}

export const buildEdge = (source, target) => {
  return {
    id: `${source.id}_${target.id}`,
    source: `${source.id}`,
    target: `${target.id}`,
    elType: 'EDGE',
    style: { stroke: 'red' },
    arrowHeadType: 'arrow',
  }
}

export const getElementById = (id, elements) =>
  elements.filter((el) => el.id === `${id}`)[0]

export const addValues = (a, b) => Number(a) + Number(b)

export const getNodes = (elements) => {
  return elements.filter((element) => element.elType === 'NODE')
}
export const getEdges = (elements) => {
  return elements.filter((element) => element.elType === 'EDGE')
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
