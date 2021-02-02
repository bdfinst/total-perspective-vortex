const flowEfficiency = (processTime, cycleTime) => {
  if (cycleTime === 0 || isNaN(cycleTime)) {
    return 0
  }

  if (processTime === 0 || isNaN(cycleTime) || cycleTime < processTime) {
    return 0
  }

  return Math.round((processTime / cycleTime) * 100)
}

const buildNode = (id, position) => {
  return {
    id,
    type: 'stepNode',
    elType: 'NODE',
    data: { processTime: 0, cycleTime: 0, pctCompleteAccurate: 100 },
    style: { border: '1px solid #777', padding: 8 },
    position,
  }
}

const buildEdge = (id, source, target) => {
  return {
    id,
    source,
    target,
    elType: 'EDGE',
    animated: true,
    style: { stroke: 'red' },
    arrowHeadType: 'arrowclosed',
  }
}

const addValues = (a, b) => Number(a) + Number(b)

const getNodeSums = (elements) => {
  return elements
    .filter((element) => element.elType === 'NODE')
    .map((element) => element.data)
    .reduce((acc, val) => {
      return {
        processTime: addValues(acc.processTime, val.processTime),
        cycleTime: addValues(acc.cycleTime, val.cycleTime),
        pctCompleteAccurate:
          addValues(acc.pctCompleteAccurate, val.pctCompleteAccurate) / 2,
      }
    })
}

export { flowEfficiency, buildNode, buildEdge, getNodeSums }
