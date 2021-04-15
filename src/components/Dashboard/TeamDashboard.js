/* eslint-disable react/no-array-index-key */
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'

import PipelineActivity from '../Charts/PipelineActivity'
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

const chartWidth = 500
const chartHeight = 300

const graphs = [PipelineActivity, Workflow]

export default function TeamDashboard() {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      {graphs.map((Graph, key) => (
        <Grid item key={key}>
          <Paper className={classes.paper}>
            <Graph width={chartWidth} height={chartHeight} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
