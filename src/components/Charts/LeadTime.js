/* eslint-disable react/no-array-index-key */
import { Bar, BarChart, Tooltip, XAxis } from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const buildWeekData = (weekNbr, leadTime) => ({
  name: `Week ${weekNbr}`,
  leadTime,
})

const buildData = (weeks) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const leadTime = Math.floor(Math.random() * 60) + 5

    return buildWeekData(el.weekNbr, leadTime)
  })
}

export default function Agility({ width, height, margin }) {
  const theme = useTheme()
  const data = buildData(8)

  return (
    <BarChart width={width} height={height} data={data} margin={margin}>
      <Bar dataKey="leadTime" fill={theme.palette.primary.dark} />

      <Tooltip />
      <XAxis dataKey="name" />
    </BarChart>
  )
}
