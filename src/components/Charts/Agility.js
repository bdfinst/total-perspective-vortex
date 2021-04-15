/* eslint-disable react/no-array-index-key */
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import React from 'react'

import Title from '../Title'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFFF42']

const buildData = () => {
  const teams = 24
  const impSpeed = Math.floor(Math.random() * teams)
  const impQuality = Math.floor(Math.random() * teams)
  const declSpeed = teams - impSpeed
  const declQuality = teams - impQuality
  const totalImprovement = teams / 3

  return [
    { name: 'Improving speed', value: impSpeed },
    { name: 'Improving quality', value: impQuality },
    { name: 'Improving overall', value: totalImprovement },
    { name: 'Degrading speed', value: declSpeed },
    { name: 'Degrading quality', value: declQuality },
  ]
}

export default function Agility({ width, height }) {
  const data = buildData()
  return (
    <>
      <Title>Agility</Title>

      <PieChart width={width} height={height}>
        <Pie
          dataKey="value"
          data={data}
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  )
}
