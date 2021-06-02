/* eslint-disable react/no-array-index-key */
import { Bar, BarChart, Legend, Tooltip, XAxis } from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const buildWeekData = (weekNbr, stories, ktlo, defects) => ({
  name: `Week ${weekNbr}`,
  stories,
  ktlo,
  defects,
})

const toPercent = decimal => `${Math.round(decimal * 100)}%`

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0

  return toPercent(ratio)
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
      <p className="total">{`${label} (Throughput: ${total})`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} (${getPercent(
              entry.value,
              total,
            )})`}
          </li>
        ))}
      </ul>
    </div>
  )
}

const buildData = weeks => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map(el => {
    const stories = Math.floor(Math.random() * 10) * 24
    const ktlo = Math.floor(Math.random() * 4) * 24
    const defects = Math.floor(Math.random() * 4) * 24

    return buildWeekData(el.weekNbr, stories, ktlo, defects)
  })
}

export default function Workflow({ width, height, margin }) {
  const theme = useTheme()

  return (
    <BarChart width={width} height={height} data={buildData(8)} margin={margin}>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="name" />
      <Tooltip content={renderTooltipContent} />
      <Legend />
      <Bar
        dataKey="stories"
        name="New Work"
        stackId="a"
        fill={theme.palette.primary.light}
      />
      <Bar
        dataKey="ktlo"
        name="Maintenance"
        stackId="a"
        fill={theme.palette.warning.light}
      />
      <Bar
        dataKey="defects"
        name="Defects"
        stackId="a"
        fill={theme.palette.error.light}
      />
    </BarChart>
  )
}
