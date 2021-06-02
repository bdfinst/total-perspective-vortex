/* eslint-disable react/no-array-index-key */
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis } from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import NumberFormat from 'react-number-format'
import React from 'react'

const buildWeekData = (weekNbr, opEx, capEx, defectEx) => ({
  name: `Week ${weekNbr}`,
  opEx,
  capEx,
  defectEx,
})

const costPerStory = () => {
  const blendedRate = 75
  const hoursPerDay = 6
  const actorCount = Math.floor(Math.random() * 5) + 1
  const devCycleTime = Math.floor(Math.random() * 10) + 1

  return devCycleTime * actorCount * hoursPerDay * blendedRate
}

const buildData = weeks => {
  const velocity = 20

  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map(el => {
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

    const defectEx = Math.floor(opEx * Math.random())

    return buildWeekData(el.weekNbr, opEx - defectEx, capEx, defectEx)
  })
}

const renderTooltipContent = o => {
  const { payload, label } = o
  const total = payload.reduce((result, entry) => result + entry.value, 0)

  const ttWrapper = {
    margin: '0px',
    padding: '5px',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(204, 204, 204)',
    whiteSpace: 'nowrap',
  }

  return (
    <div style={ttWrapper}>
      <p className="total">
        {`${label}: `}
        <NumberFormat
          value={total}
          displayType="text"
          thousandSeparator
          prefix="$"
        />
      </p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: `}
            <NumberFormat
              value={entry.value}
              displayType="text"
              thousandSeparator
              prefix="$"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Expense({ width, height, margin }) {
  const theme = useTheme()
  const data = buildData(8)

  return (
    <BarChart width={width} height={height} data={data} margin={margin}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      {/* <YAxis tickFormatter={(value) => `$ ${value / 1000}K`} /> */}
      <Tooltip content={renderTooltipContent} />
      <Legend />

      <Bar
        name="Defect Expense"
        type="monotone"
        dataKey="defectEx"
        stackId="1"
        fill={theme.palette.error.light}
      />

      <Bar
        name="KTLO Expense"
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
    </BarChart>
  )
}
