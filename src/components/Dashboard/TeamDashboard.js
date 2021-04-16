/* eslint-disable react/no-array-index-key */
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'

import PipelineActivity from '../Charts/PipelineActivity'
import SpeedVelocity from '../Charts/SpeedVelocity'
import Workflow from '../Charts/Workflow'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const chartWidth = 350
const chartHeight = 200
const margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const graphs = [PipelineActivity, Workflow, SpeedVelocity]

export default function TeamDashboard() {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      {graphs.map((Graph, key) => (
        <Grid item key={key}>
          <Paper className={classes.paper}>
            <Graph width={chartWidth} height={chartHeight} margin={margin} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
