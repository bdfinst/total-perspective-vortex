/* eslint-disable react/no-array-index-key */
import { Legend, Line, LineChart, Tooltip, XAxis } from 'recharts'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'

import randomRange from '../../helpers/randomRange'

const buildWeekData = (weekNbr, epicLeadTime, storyLeadTime) => ({
  name: `Week ${weekNbr}`,
  storyLeadTime,
  epicLeadTime,
})

const buildData = (weeks) => {
  const init = []
  for (let index = 0; index < weeks; index += 1) {
    init.push({ weekNbr: index + 1 })
  }
  return init.map((el) => {
    const epicLeadTime = Math.floor(randomRange(5, 20))
    const storyLeadTime = Math.floor(randomRange(1, 5))

    return buildWeekData(el.weekNbr, epicLeadTime, storyLeadTime)
  })
}

const renderTooltipContent = (o) => {
  const { payload } = o

  const ttWrapper = {
    margin: '0px',
    padding: '5px',
    backgroundColor: 'rgb(255, 255, 255)',
    border: '1px solid rgb(204, 204, 204)',
    whiteSpace: 'nowrap',
  }

  return (
    <div style={ttWrapper}>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} Days`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function LeadTime({ width, height, margin }) {
  const theme = useTheme()
  const data = buildData(8)

  return (
    <LineChart width={width} height={height} data={data} margin={margin}>
      <Line
        dataKey="storyLeadTime"
        name="Stories"
        fill={theme.palette.primary.dark}
      />
      <Line
        dataKey="epicLeadTime"
        name="Epics"
        fill={theme.palette.secondary.light}
      />

      <Tooltip content={renderTooltipContent} />
      <Legend />

      <XAxis dataKey="name" />
    </LineChart>
  )
}
