import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    fontSize: '.9em',
    fontWeight: 'bold',
    color: theme.palette.common.black,
  },
}))

const CustomCardHeader = ({ title }) => (
  <Grid container spacing={0}>
    <Grid item xs={2}>
      <IconButton aria-label="settings">
        <SettingsOverscanIcon />
      </IconButton>
    </Grid>
    <Grid item xs={8}>
      <Typography>{title}</Typography>
    </Grid>
    <Grid item xs={2}>
      <IconButton aria-label="settings">
        <HelpOutlineIcon />
      </IconButton>
    </Grid>
  </Grid>
)

export default function ChartWrapper({ children, title }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CustomCardHeader title={title} />
      <CardContent>{children}</CardContent>
    </Card>
  )
}
