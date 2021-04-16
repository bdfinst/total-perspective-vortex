/* eslint-disable react/no-array-index-key */
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const buildData = () => {
  const teams = 24
  const impSpeed = Math.floor(Math.random() * teams)
  const impQuality = Math.floor(Math.random() * teams)
  const declSpeed = teams - impSpeed
  const declQuality = teams - impQuality
  const totalImprovement = teams / 3

  return [
    { name: 'Improving overall', value: totalImprovement },
    { name: 'Improving speed', value: impSpeed },
    { name: 'Improving quality', value: impQuality },
    { name: 'Degrading speed', value: declSpeed },
    { name: 'Degrading quality', value: declQuality },
  ]
}

export default function Agility({ width, height, margin }) {
  const theme = useTheme()

  const data = buildData()
  const outerRadius = height * 0.35
  const innerRadius = outerRadius * 0.6
  const COLORS = [
    theme.palette.primary.dark,
    theme.palette.secondary.light,
    theme.palette.primary.light,
    theme.palette.warning.light,
    theme.palette.error.dark,
  ]

  return (
    <PieChart width={width} height={height}>
      <Pie
        dataKey="value"
        data={data}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        fill="#82ca9d"
        margin={margin}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}
