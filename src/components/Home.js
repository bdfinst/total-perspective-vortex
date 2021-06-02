import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: '70vh',
    minHeight: '300px',
  },
}))

export default function Home() {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to the Total Perspective Vortex
      </Typography>
      <Typography variant="body1" gutterBottom>
        Looking to improve your flow of delivery? You cannot reach a goal until
        you know where you are starting from.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The Total Perspective Vortex is a set of tools to enable you to embrace
        reality, establish where you are, and help you plot a course to where
        you want to be.
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Improvement is a journey, not a destination. Take the first step today.
      </Typography>
      <div align="center">
        <img src="tpvLogos/tpv_dark_logo.png" alt="TPV Logo" width="40%" />
      </div>
    </Paper>
  )
}
