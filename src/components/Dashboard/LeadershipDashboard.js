/* eslint-disable react/no-array-index-key */
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan'

import Agility from '../Charts/Agility'
import DevCycleTime from '../Charts/DevCycleTime'
import Expense from '../Charts/Expense'
import LeadTime from '../Charts/LeadTime'
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
const graphs = [Workflow, LeadTime, DevCycleTime, Expense, Agility]

export default function LeadershipDashboard() {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      {graphs.map((Graph, key) => (
        <Grid item key={key}>
          <Card className={classes.paper}>
            <CardHeader
              action={
                <>
                  <IconButton aria-label="settings">
                    <SettingsOverscanIcon />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <HelpOutlineIcon />
                  </IconButton>
                </>
              }
            />
            <CardContent>
              <Graph width={chartWidth} height={chartHeight} margin={margin} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
