import { Delete } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import { useValueStream } from '../valueStreamContext'

const useStyles = makeStyles((theme) => ({
  button: { color: theme.palette.secondary.dark },
}))

const ResetButton = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { reset } = useValueStream()

  const handleReset = () => reset()

  return (
    <div>
      <IconButton
        title="Reset diagram"
        color="inherit"
        component="span"
        className={classes.button}
        onClick={handleReset}
      >
        <Delete />
      </IconButton>
    </div>
  )
}
export default ResetButton
