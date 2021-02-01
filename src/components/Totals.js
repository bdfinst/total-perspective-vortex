import React from 'react'

import { flowEfficiency } from '../utils/utilities'
import { useVSMState } from '../reactContext'

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
