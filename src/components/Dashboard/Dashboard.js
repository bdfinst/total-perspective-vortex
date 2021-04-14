import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'

import Agility from '../Charts/Agility'
import PipelineActivity from '../Charts/PipelineActivity'
import ProductFlowChart from '../Charts/ProductFlowChart'

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

export default function Dashboard() {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Paper className={classes.paper}>
          <PipelineActivity width={chartWidth} height={chartHeight} />
        </Paper>
      </Grid>

      <Grid item>
        <Paper className={classes.paper}>
          <ProductFlowChart width={chartWidth} height={chartHeight} />
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <Agility width={chartWidth} height={chartHeight} />
        </Paper>
      </Grid>
    </Grid>
  )
}
