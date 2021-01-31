import React from 'react'

import { isNode, useVSMState } from '../components/AppContext'

const flowEfficiency = (processTime, cycleTime) => {
  if (cycleTime === 0 || isNaN(cycleTime)) {
    return 0
  }

  if (processTime === 0 || isNaN(cycleTime) || cycleTime < processTime) {
    return 0
  }

  return Math.round((processTime / cycleTime) * 100)
}
const Totals = (input) => {
  const elements = input.data || []
  let totals = {
    processTime: 0,
    cycleTime: 0,
    pctCompleteAccurate: 0,
  }

  if (elements.length > 0) {
    totals = elements
      .filter((el) => isNode(el))
      .reduce((a, b) => ({
        processTime: a.data.processTime + b.data.processTime,
        cycleTime: a.data.cycleTime + b.data.cycleTime,
        pctCompleteAccurate:
          (a.data.pctCompleteAccurate + b.data.pctCompleteAccurate) / 2,
      }))
  }

  return (
    <>
      <div>Process Time: {totals.processTime}</div>
      <div>Total Time: {totals.cycleTime}</div>
      <div>Average C/A: {Math.round(totals.pctCompleteAccurate)}%</div>
      <div>
        Flow Efficiency:{flowEfficiency(totals.processTime, totals.cycleTime)}%
      </div>
    </>
  )
}

const Sidebar = () => {
  const { elements } = useVSMState()

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
  return (
    <aside>
      <div className="description">Drag nodes to the pane on the right.</div>
      <div
        className="vsmnode input"
        onDragStart={(event) => onDragStart(event, 'stepNode')}
        draggable
      >
        Step Node
      </div>
      <Totals data={elements} />
    </aside>
  )
}

export default Sidebar
