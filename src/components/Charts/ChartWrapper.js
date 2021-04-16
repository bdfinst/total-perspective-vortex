import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import IconButton from '@material-ui/core/IconButton'
import React from 'react'
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function ChartWrapper({ children, title }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        title={title}
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
      <CardContent>{children}</CardContent>
    </Card>
  )
}
