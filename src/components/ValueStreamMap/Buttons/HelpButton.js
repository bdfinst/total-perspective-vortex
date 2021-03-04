import { HelpOutlined } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  button: { color: theme.palette.secondary.dark },
}))

const HelpButton = ({ onClick, title }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div>
      <IconButton
        title={title}
        color="inherit"
        component="span"
        className={classes.button}
        onClick={onClick}
      >
        <HelpOutlined />
      </IconButton>
    </div>
  )
}
export default HelpButton
