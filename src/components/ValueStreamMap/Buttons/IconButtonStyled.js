import { IconButton, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(() => ({
  paper: {
    textAlign: 'center',
  },
}))

const IconButtonStyled = ({
  title,
  children,
  tabIndex,
  onClick,
  color,
  className,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.paper}>
      <Tooltip title={title}>
        <IconButton
          tabIndex={tabIndex || 0}
          color={color || 'primary'}
          className={className}
          component="span"
          onClick={onClick}
        >
          {children}
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default IconButtonStyled
