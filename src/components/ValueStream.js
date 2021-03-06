import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import clsx from 'clsx'

import { ValueStreamProvider } from './ValueStreamMap/valueStreamContext'
import Totals from './ValueStreamMap/Totals'
import ValueStreamMap from './ValueStreamMap/ValueStreamMap'
import config from '../globalConfig'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 350,
  },
  vsmHeight: {
    height: config.vsmHeight,
  },
}))

export default function ValueStream() {
  const classes = useStyles()

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const valueStreamPaper = clsx(classes.paper, classes.vsmHeight)

  return (
    <ValueStreamProvider>
      <Grid item xs={12} md={9}>
        <Paper className={valueStreamPaper}>
          <ValueStreamMap />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper className={fixedHeightPaper}>
          <Totals />
        </Paper>
      </Grid>
    </ValueStreamProvider>
  )
}
