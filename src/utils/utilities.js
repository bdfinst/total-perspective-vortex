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
    animated: true,
    style: { stroke: 'red' },
    arrowHeadType: 'arrowclosed',
  }
}

export { flowEfficiency, buildNode, buildEdge }
