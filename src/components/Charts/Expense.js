/* eslint-disable react/no-array-index-key */
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

import Title from '../Title'

const buildWeekData = (weekNbr, opEx, capEx) => ({
  name: `Week ${weekNbr}`,
  opEx,
  capEx,
  total: opEx + capEx,
})

const costPerStory = () => {
  const blendedRate = 75
  const hoursPerDay = 6
  const actorCount = Math.floor(Math.random() * 5) + 1
  const devCycleTime = Math.floor(Math.random() * 10) + 1

  return devCycleTime * actorCount * hoursPerDay * blendedRate
}

const buildData = (weeks) => {
  const velocity = 20

  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const opVelocity = velocity * Math.random()
    const capVelocity = velocity - opVelocity

    let capEx = 0
    let opEx = 0
    for (let index = 0; index < opVelocity; index += 1) {
      opEx += costPerStory()
    }

    for (let index = 0; index < capVelocity; index += 1) {
      capEx += costPerStory()
    }

    return buildWeekData(el.weekNbr, opEx, capEx)
  })
}

export default function Expense({ width, height }) {
  const theme = useTheme()
  const data = buildData(8)

  return (
    <>
      <Title>Delivery Cost ($)</Title>

      <BarChart
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

        <Bar
          name="Operational Expense"
          type="monotone"
          dataKey="opEx"
          stackId="1"
          fill={theme.palette.warning.light}
        />

        <Bar
          name="Feature Expense"
          dataKey="capEx"
          type="monotone"
          stackId="1"
          fill={theme.palette.secondary.light}
        />

        <Bar
          name="Total Expense"
          dataKey="total"
          type="monotone"
          fill={theme.palette.primary.dark}
          maxBarSize={5}
        />
      </BarChart>
    </>
  )
}
