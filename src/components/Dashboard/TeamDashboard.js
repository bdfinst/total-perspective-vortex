/* eslint-disable react/no-array-index-key */
import Grid from '@material-ui/core/Grid'
import React from 'react'

import ChartWrapper from '../Charts/ChartWrapper'
import Effort from '../Charts/Effort'
import PipelineActivity from '../Charts/PipelineActivity'
import SpeedThroughput from '../Charts/SpeedThroughput'

const chartWidth = 300
const chartHeight = 200
const margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export default function TeamDashboard() {
  const graphs = [
    {
      chart: Effort({ width: chartWidth, height: chartHeight, margin }),
      title: 'Delivery Effort (FTE)',
    },
    {
      chart: PipelineActivity({
        width: chartWidth,
        height: chartHeight,
        margin,
      }),
      title: 'Pipeline Activity',
    },
    {
      chart: SpeedThroughput({
        width: chartWidth,
        height: chartHeight,
        margin,
      }),
      title: 'Speed and Throughput',
    },
  ]

  return (
    <Grid container spacing={3}>
      {graphs.map((graph, key) => (
        <Grid item key={key}>
          <ChartWrapper title={graph.title}>{graph.chart}</ChartWrapper>
        </Grid>
      ))}
    </Grid>
  )
}
