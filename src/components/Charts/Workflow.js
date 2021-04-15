import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

import Title from '../Title'

const buildWeekData = (weekNbr, stories, ktlo, defects) => ({
  name: `Week ${weekNbr}`,
  stories,
  ktlo,
  defects,
})

const buildData = (weeks) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const stories = Math.floor(Math.random() * 10)
    const ktlo = Math.floor(Math.random() * 10)
    const defects = Math.floor(Math.random() * 10)

    return buildWeekData(el.weekNbr, stories, ktlo, defects)
  })
}

export default function Workflow({ width, height, margin }) {
  const theme = useTheme()

  return (
    <>
      <Title>Work Catagories</Title>
      <BarChart
        width={width}
        height={height}
        data={buildData(8)}
        margin={margin}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="stories"
          name="New Work"
          stackId="a"
          fill={theme.palette.primary.light}
        />
        <Bar
          dataKey="ktlo"
          name="Maintenance"
          stackId="a"
          fill={theme.palette.warning.light}
        />
        <Bar
          dataKey="defects"
          name="Defects"
          stackId="a"
          fill={theme.palette.error.light}
        />
      </BarChart>
    </>
  )
}