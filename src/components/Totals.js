import React, { useEffect, useState } from 'react'

import { getNodeSums } from '../utils/utilities'
import { useValueStream } from '../reactContext'

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
      <div data-testid="totalTime">Total Time: {totals.cycleTime}</div>
      <div data-testid="avgPCA">Average %C/A: {totals.avgPCA}%</div>
      <div data-testid="flow">Flow Efficiency:{totals.flowEfficiency}%</div>
    </>
  )
}

export default Totals
