/* eslint-disable react/no-array-index-key */
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

import Title from '../Title'

const buildWeekData = (weekNbr, cycleTime, throughput) => ({
  name: `Week ${weekNbr}`,
  cycleTime,
  throughput,
})

const buildData = (weeks) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const cycleTime = Math.floor(Math.random() * 14 + 0.5)
    const throughput = Math.floor((Math.random() * 14) / cycleTime) + 1

    return buildWeekData(el.weekNbr, cycleTime, throughput)
  })
}

export default function CycleTime({ width, height }) {
  const theme = useTheme()

  const data = buildData(8)

  return (
    <>
      <Title>Speed and Velocity</Title>

      <ComposedChart
        width={width}
        height={height}
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

        <Area
          name="Cycle Time"
          dataKey="cycleTime"
          type="monotone"
          fill={theme.palette.primary.light}
          stroke={theme.palette.primary.dark}
        />
        <Area
          name="Throughput"
          type="monotone"
          dataKey="throughput"
          fill={theme.palette.secondary.light}
          stroke={theme.palette.secondary.dark}
        />
      </ComposedChart>
    </>
  )
}
