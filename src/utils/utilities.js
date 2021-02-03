const flowEfficiency = (processTime, cycleTime) => {
  if (cycleTime === 0 || isNaN(cycleTime)) {
    return 0
  }

  if (processTime === 0 || isNaN(cycleTime) || cycleTime < processTime) {
    return 0
  }

  return Math.round((processTime / cycleTime) * 100) / 100
}

const nodeStyle = {
  border: '2px solid #3385e9',
  borderRadius: '12px',
  padding: 8,
  minWidth: '100px',
  // backgroundColor: '#3385e9',
}

const buildNode = (id, position) => {
  return {
    id: `${id}`,
    type: 'stepNode',
    elType: 'NODE',
    data: { processTime: 0, cycleTime: 0, pctCompleteAccurate: 100 },
    style: nodeStyle,
    position,
  }
}

const buildEdge = (id, source, target) => {
  return {
    id: `${id}`,
    source: `${source}`,
    target: `${target}`,
    elType: 'EDGE',
    animated: true,
    style: { stroke: 'red' },
    arrowHeadType: 'arrowclosed',
  }
}

const getElementById = (id, elements) =>
  elements.filter((el) => el.id === `${id}`)[0]

const addValues = (a, b) => Number(a) + Number(b)

const getNodes = (elements) => {
  return elements.filter((element) => element.elType === 'NODE')
}
const getNodeSums = (elements) => {
  const sums = getNodes(elements)
    .map((element) => element.data)
    .reduce((acc, val) => {
      return {
        processTime: addValues(acc.processTime, val.processTime),
        cycleTime: addValues(acc.cycleTime, val.cycleTime),
        pctCompleteAccurate: addValues(
          acc.pctCompleteAccurate,
          val.pctCompleteAccurate,
        ),
      }
    })

  const nodeCount = getNodes(elements).length

  const totals = {
    processTime: sums.processTime,
    cycleTime: sums.cycleTime,
    waitTime: sums.cycleTime - sums.processTime,
    flowEfficiency: flowEfficiency(sums.processTime, sums.cycleTime),
    avgPCA: Math.round((sums.pctCompleteAccurate / nodeCount) * 100) / 100,
  }

  return totals
}

export { flowEfficiency, buildNode, buildEdge, getNodeSums, getElementById }
