import { Button, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import { useValueStream } from '../valueStreamContext'

const useStyles = makeStyles((theme) => ({
  button: { color: theme.palette.secondary.dark },
}))

export const ResetButton = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { reset } = useValueStream()

  const handleReset = () => reset()

  return (
    <div>
      <Tooltip title="Reset diagram">
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleReset}
        >
          <Delete />
        </Button>
      </Tooltip>
    </div>
  )
}
