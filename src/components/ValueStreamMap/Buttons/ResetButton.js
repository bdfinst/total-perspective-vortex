import { Delete } from '@material-ui/icons'
import { Tooltip } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

import { useValueStream } from '../valueStreamContext'
import IconButtonStyled from './IconButtonStyled'

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
      <Tooltip title="Reset diagram">
        <IconButtonStyled className={classes.button} onClick={handleReset}>
          <Delete />
        </IconButtonStyled>
      </Tooltip>
    </div>
  )
}
export default ResetButton
