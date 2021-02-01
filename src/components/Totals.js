import React from 'react'

import { flowEfficiency } from '../utils/utilities'
import { useVSMState } from './AppContext'

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

export default Totals
