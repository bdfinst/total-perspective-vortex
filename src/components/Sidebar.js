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

const addValues = (a, b) => Number(a) + Number(b)

const Totals = () => {
  const { elements } = useVSMState()

  const totals = elements
    .filter((el) => el.hasOwnProperty('data'))
    .map((el) => el.data)
    .reduce((acc, val) => {
      return {
        processTime: addValues(acc.processTime, val.processTime),
        cycleTime: addValues(acc.cycleTime, val.cycleTime),
        pctCompleteAccurate:
          addValues(acc.pctCompleteAccurate, val.pctCompleteAccurate) / 2,
      }
    })

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
      <Totals />
    </aside>
  )
}

export default Sidebar
