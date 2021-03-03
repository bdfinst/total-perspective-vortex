import { Save } from '@material-ui/icons'
import { Tooltip } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'
import exportFromJSON from 'export-from-json'

import { useValueStream } from '../valueStreamContext'
import IconButtonStyled from './IconButtonStyled'

const useStyles = makeStyles((theme) => ({
  button: { color: theme.palette.secondary.dark },
}))

const SaveButton = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { state } = useValueStream()

  const handleExport = () => {
    exportFromJSON({
      data: state,
      fileName: 'vsm',
      exportType: 'json',
    })
  }

  return (
    <div>
      <Tooltip title="Export to file">
        <IconButtonStyled className={classes.button} onClick={handleExport}>
          <Save />
        </IconButtonStyled>
      </Tooltip>
    </div>
  )
}
export default SaveButton
