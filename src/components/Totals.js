import React, { useEffect, useState } from 'react'

import { getNodeSums } from '../helpers/utilities'
import { useValueStream } from '../appContext/valueStreamContext'

const Totals = () => {
  const { state } = useValueStream()
  const [totals, setTotals] = useState(getNodeSums(state.elements))

  useEffect(() => {
    const total = getNodeSums(state.elements)
    setTotals(total)
  }, [state.elements])

  return (
    <>
      <div data-testid="processTime">Process Time: {totals.processTime}</div>
      <div data-testid="waitTime">Wait Time: {totals.waitTime}</div>
      <div data-testid="actorTime">Actor Time: {totals.actorTime}</div>
      <div data-testid="totalTime">Total Time: {totals.totalTime}</div>
      <div data-testid="avgPCA">Average %C/A: {totals.avgPCA}%</div>
      <div data-testid="flow">Flow Efficiency:{totals.flowEfficiency}%</div>
    </>
  )
}

export default Totals
