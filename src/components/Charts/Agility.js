/* eslint-disable react/no-array-index-key */
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import React from 'react'

import Title from '../Title'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FFFF42']

const data = [
  { name: 'Improving speed', value: 10 },
  { name: 'Improving quality', value: 9 },
  { name: 'Improving overall', value: 8 },
  { name: 'Degrading speed', value: 12 },
  { name: 'Degrading quality', value: 10 },
]

export default function Agility({ width, height }) {
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
