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

const getDefectRate = (ciRate) => (ciRate === 0 ? 0 : (1 / ciRate) * 100)

const buildData = (weeks) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const ciRate = Math.floor(Math.random() * ciTarget * 1.5)
    const deployRate = Math.floor(Math.random() * ciRate)
    const defectRate = getDefectRate(ciRate)

    return buildWeekData(el.weekNbr, ciRate, deployRate, defectRate)
  })
}

export default function Chart() {
  const theme = useTheme()

  const data = buildData(13)

  return (
    <>
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
          stroke="gold"
          strokeDasharray="3 3"
        />

        <Bar dataKey="ciRate" barSize={20} fill={theme.palette.primary.main} />
        <Scatter dataKey="deployRate" fill={theme.palette.secondary.main} />
        <Line
          type="monotone"
          dataKey="defectRate"
          stroke={theme.palette.error.main}
        />
      </ComposedChart>
    </>
  )
}
