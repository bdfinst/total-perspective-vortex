import { IconButton } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'
import exportFromJSON from 'export-from-json'

import { buildFileFromElements } from '../../../helpers'
import { useValueStream } from '../valueStreamContext'

const useStyles = makeStyles((theme) => ({
  button: { color: theme.palette.secondary.dark },
}))

const SaveButton = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { state } = useValueStream()

  const handleExport = () => {
    exportFromJSON({
      data: buildFileFromElements(state.elements),
      fileName: 'vsm',
      exportType: 'json',
    })
  }

  return (
    <div>
      <IconButton
        title="Export to file"
        color="inherit"
        component="span"
        className={classes.button}
        onClick={handleExport}
      >
        <Save />
      </IconButton>
    </div>
  )
}
export default SaveButton
