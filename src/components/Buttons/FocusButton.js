import { IconButton } from '@material-ui/core'
import { Visibility } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    '&.Mui-disabled': {
      pointerEvents: 'auto',
    },
  },
}))

export const FocusButton = ({ onClick, enabled }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div>
      {/* wrap in <span> to display tooltip when disabled */}
      <IconButton
        className={classes.root}
        disabled={!enabled}
        onClick={onClick}
      >
        <Visibility />
      </IconButton>
    </div>
  )
}
