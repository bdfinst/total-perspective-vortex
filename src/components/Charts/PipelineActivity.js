import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  Tooltip,
  XAxis,
} from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

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

export default function PipelineActivity({ width, height, margin }) {
  const theme = useTheme()

  const data = buildData(8)

  return (
    <ComposedChart width={width} height={height} data={data} margin={margin}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <Tooltip />
      <Legend />

      <ReferenceLine
        labelPosition="end"
        y={ciTarget}
        label={`CI Target for team of ${teamSize}`}
        stroke={theme.palette.primary.dark}
        strokeDasharray="3 6"
      />

      <Area
        name="CI Frequency"
        dataKey="ciRate"
        type="monotone"
        fill={theme.palette.primary.light}
        stroke={theme.palette.primary.dark}
      />
      <Area
        name="Deploy Frequency"
        type="monotone"
        dataKey="deployRate"
        fill={theme.palette.secondary.light}
        stroke={theme.palette.secondary.dark}
      />
      <Line
        name="Defects"
        type="monotone"
        dataKey="defectRate"
        stroke={theme.palette.error.main}
      />
    </ComposedChart>
  )
}
