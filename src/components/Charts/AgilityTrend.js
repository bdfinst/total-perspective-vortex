/* eslint-disable react/no-array-index-key */
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

const buildWeekData = (
  weekNbr,
  impSpeed,
  impQuality,
  declSpeed,
  declQuality,
) => ({
  name: `Week ${weekNbr}`,
  impSpeed,
  impQuality,
  declSpeed,
  declQuality,
})

const buildData = (weeks, teamCount) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const speed = Math.floor(Math.random() * teamCount)
    const quality = Math.floor(Math.random() * teamCount)
    const impSpeed = speed > 0 ? speed : 1
    const impQuality = quality > 0 ? quality : 1
    const declSpeed = teamCount - impSpeed
    const declQuality = teamCount - impQuality

    return buildWeekData(
      el.weekNbr,
      impSpeed,
      impQuality,
      declSpeed,
      declQuality,
    )
  })
}

const toPercent = (decimal) => `${Math.round(decimal * 100)}%`

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0

  return toPercent(ratio)
}

const renderTooltipContent = (o) => {
  const { payload, label } = o
  const total = payload.reduce((result, entry) => result + entry.value, 0) / 2
  const ttWrapper = {
    margin: '0px',
    padding: '5px',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(204, 204, 204)',
    whiteSpace: 'nowrap',
  }

  return (
    <div style={ttWrapper}>
      <p className="total">{`${label} (Teams: ${total})`}</p>
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

export default function AgilityTrend({ width, height, margin }) {
  const theme = useTheme()

  const teamCount = 24
  const weeks = 8

  const data = buildData(weeks, teamCount)

  return (
    <AreaChart
      width={width}
      height={height}
      data={data}
      stackOffset="expand"
      margin={margin}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tickFormatter={toPercent} />
      <Tooltip content={renderTooltipContent} />

      <Area
        type="monotone"
        name="Declining Speed"
        dataKey="declSpeed"
        stackId="1"
        stroke={theme.palette.warning.dark}
        fill={theme.palette.warning.light}
      />
      <Area
        type="monotone"
        name="Declining Quality"
        dataKey="declQuality"
        stackId="1"
        stroke={theme.palette.error.dark}
        fill={theme.palette.error.light}
      />
      <Area
        type="monotone"
        name="Improving Speed"
        dataKey="impSpeed"
        stackId="1"
        stroke={theme.palette.primary.dark}
        fill={theme.palette.primary.light}
      />
      <Area
        type="monotone"
        name="Improving Quality"
        dataKey="impQuality"
        stackId="1"
        stroke={theme.palette.secondary.dark}
        fill={theme.palette.secondary.light}
      />
    </AreaChart>
  )
}
