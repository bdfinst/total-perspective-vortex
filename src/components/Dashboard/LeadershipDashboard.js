/* eslint-disable react/no-array-index-key */

import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'

// import Agility from '../Charts/AgilityTrend'
import ChartWrapper from '../Charts/ChartWrapper'
import Effort from '../Charts/Effort'
import LeadTime from '../Charts/LeadTime'
import SpeedThroughput from '../Charts/SpeedThroughput'
import TeamTable from './TeamTable'
import getTableData from './createData'
import teams from '../../__mocks__/teams'

// import Workflow from '../Charts/Workflow'

const chartWidth = 250
const chartHeight = 150
const margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export default function LeadershipDashboard() {
  const weekCount = 8
  const [chartData] = useState(getTableData(weekCount, teams))

  const graphs = [
    // {
    //   chart: Workflow({ width: chartWidth, height: chartHeight, margin }),
    //   title: 'Work Catagories',
    // },
    {
      chart: Effort({ width: chartWidth, height: chartHeight, margin }),
      title: 'Delivery Effort (FTE)',
    },
    {
      chart: LeadTime({ width: chartWidth, height: chartHeight, margin }),
      title: 'Lead Time (Days)',
    },
    {
      chart: SpeedThroughput({
        width: chartWidth,
        height: chartHeight,
        margin,
      }),
      title: 'Speed and Throughput',
    },

    // {
    //   chart: Agility({ width: chartWidth, height: chartHeight, margin }),
    //   title: 'Agility',
    // },
  ]

  return (
    <Grid container spacing={3}>
      <Grid container item spacing={3} xs={12}>
        {graphs.map((graph, key) => (
          <Grid item key={key}>
            <ChartWrapper title={graph.title}>{graph.chart}</ChartWrapper>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <TeamTable data={chartData} />
      </Grid>
    </Grid>
  )
}
