import { IconButton, Tooltip } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
  },
}))

export const IconButtonStyled = ({ title, children, onClick }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div className={classes.paper}>
      <Tooltip title={title}>
        <IconButton color="primary" component="span" onClick={onClick}>
          {children}
        </IconButton>
      </Tooltip>
    </div>
  )
}
