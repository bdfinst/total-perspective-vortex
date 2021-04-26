/* eslint-disable react/no-array-index-key */
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
} from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const getDefectRate = (throughput) =>
  throughput === 0
    ? 0
    : Math.round(1 / throughput) * Math.floor(Math.random() * 5)

const buildWeekData = (weekNbr, cycleTime, throughput, defectRate) => ({
  name: `Week ${weekNbr}`,
  cycleTime,
  throughput,
  defectRate,
})

const buildData = (weeks) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const cycleTime = Math.floor(Math.random() * 14 + 0.5)
    const throughput = Math.floor((Math.random() * 14) / cycleTime) + 1
    const defectRate = getDefectRate(throughput)

    return buildWeekData(el.weekNbr, cycleTime, throughput, defectRate)
  })
}

export default function SpeedVelocity({ width, height, margin }) {
  const theme = useTheme()

  const data = buildData(8)

  return (
    <ComposedChart width={width} height={height} data={data} margin={margin}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
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
      <Line
        name="Defect Rate"
        type="monotone"
        dataKey="defectRate"
        stroke={theme.palette.error.main}
      />
    </ComposedChart>
  )
}
