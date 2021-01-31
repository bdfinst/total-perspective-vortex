import React from 'react'

import { useVSMState } from '../components/AppContext'

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

  const totals = elements
    .filter((el) => el.data)
    .reduce((a, b) => ({
      processTime: Number(a.data.processTime) + Number(b.data.processTime),
      cycleTime: Number(a.data.cycleTime) + Number(b.data.cycleTime),
      pctCompleteAccurate:
        (Number(a.data.pctCompleteAccurate) +
          Number(b.data.pctCompleteAccurate)) /
        2,
    }))

  console.log(elements)
  console.log(totals)

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

  console.log(elements)

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
