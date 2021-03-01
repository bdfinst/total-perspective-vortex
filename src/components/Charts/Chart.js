import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import React from 'react'

import Title from '../Examples/Title'

const teamSize = 6
const ciTarget = teamSize * 5

const buildWeekData = (weekNbr, ciRate, deployRate, defectRate) => ({
  name: `Week ${weekNbr}`,
  ciRate,
  deployRate,
  defectRate,
})

const getDefectRate = (deployRate) =>
  deployRate === 0 ? 0 : Math.round((1 / deployRate) * 50)

const buildData = (weeks) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const ciRate = Math.floor(Math.random() * ciTarget * 1.5)
    const deployRate = Math.floor(Math.random() * ciRate)
    const defectRate = getDefectRate(deployRate)

    return buildWeekData(el.weekNbr, ciRate, deployRate, defectRate)
  })
}

export default function Chart() {
  const theme = useTheme()

  const data = buildData(13)

  return (
    <Paper>
      <Title>Pipeline Activity</Title>
      <ComposedChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <ReferenceLine
          labelPosition="end"
          y={ciTarget}
          label={`Weekly CI Target for team of ${teamSize}`}
          stroke={theme.palette.primary.dark}
          strokeDasharray="3 6"
        />

        <Bar
          name="CI Frequency"
          dataKey="ciRate"
          barSize={20}
          fill={theme.palette.primary.dark}
        />
        <Scatter
          name="Deploy Frequency"
          dataKey="deployRate"
          fill={theme.palette.secondary.light}
        />
        <Line
          name="Defect Rate"
          type="monotone"
          dataKey="defectRate"
          stroke={theme.palette.error.main}
        />
      </ComposedChart>
    </Paper>
  )
}
