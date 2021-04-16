/* eslint-disable react/no-array-index-key */
import Grid from '@material-ui/core/Grid'
import React from 'react'

import ChartWrapper from '../Charts/ChartWrapper'
import PipelineActivity from '../Charts/PipelineActivity'
import SpeedVelocity from '../Charts/SpeedVelocity'
import Workflow from '../Charts/Workflow'

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
      chart: Workflow({ width: chartWidth, height: chartHeight, margin }),
      title: 'Work Catagories',
    },
    {
      chart: PipelineActivity({
        width: chartWidth,
        height: chartHeight,
        margin,
      }),
      title: 'Epic Lead Time (Days)',
    },
    {
      chart: SpeedVelocity({ width: chartWidth, height: chartHeight, margin }),
      title: 'Speed and Velocity',
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
