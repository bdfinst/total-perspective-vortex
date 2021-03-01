import {
  Area,
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

const buildWeekData = (weekNbr, ciRate, deployRate, defectRate) => {
  return {
    name: `Week ${weekNbr}`,
    ciRate,
    deployRate,
    defectRate,
  }
}

const buildData = (weeks, teamSize) => {
  const init = []
  for (let index = 0; index < weeks; index++) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const ciRate = Math.floor(Math.random() * teamSize * 3)
    const deployRate = Math.floor(Math.random() * ciRate)
    const defectRate =
      ciRate <= 0 ? 0 : Math.floor(Math.random() * (1 / ciRate) * 60)

    return buildWeekData(el.weekNbr, ciRate, deployRate, defectRate)
  })
}

export default function Chart() {
  const theme = useTheme()
  const teamSize = 6
  const data = buildData(13, teamSize)

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
          y={10}
          label={`CI Target for team of ${teamSize}`}
          stroke="red"
          strokeDasharray="3 3"
        />

        <Bar dataKey="ciRate" barSize={20} fill="#413ea0" />

        <Scatter dataKey="deployRate" fill="red" />
        {/* <Line type="monotone" dataKey="deployRate" stroke="#413ea0" /> */}
        <Line type="monotone" dataKey="defectRate" stroke="#ff7300" />
      </ComposedChart>
      );
    </>
  )
}
