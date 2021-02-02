import React, { useEffect, useState } from 'react'

import { flowEfficiency, getNodeSums } from '../utils/utilities'
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
      <div data-testid="totalTime">Total Time: {totals.cycleTime}</div>
      <div data-testid="pctca">
        Average C/A: {Math.round(totals.pctCompleteAccurate)}%
      </div>
      <div data-testid="flow">
        Flow Efficiency:{flowEfficiency(totals.processTime, totals.cycleTime)}%
      </div>
    </>
  )
}

export default Totals
