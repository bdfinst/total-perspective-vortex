import { HelpOutlined } from '@material-ui/icons'
import { Tooltip } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import IconButtonStyled from './IconButtonStyled'

const useStyles = makeStyles((theme) => ({
  button: { color: theme.palette.secondary.dark },
}))

const HelpButton = ({ onClick, title }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div>
      <Tooltip title={title}>
        <IconButtonStyled
          className={classes.button}
          onClick={onClick}
          color="inherit"
        >
          <HelpOutlined />
        </IconButtonStyled>
      </Tooltip>
    </div>
  )
}
export default HelpButton
