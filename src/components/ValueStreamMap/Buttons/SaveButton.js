import { Button, Tooltip } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'
import exportFromJSON from 'export-from-json'

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
      data: state,
      fileName: 'vsm',
      exportType: 'json',
    })
  }

  return (
    <div>
      <Tooltip title="Export to file">
        <Button
          variant="outlined"
          className={classes.button}
          onClick={handleExport}
        >
          <Save />
        </Button>
      </Tooltip>
    </div>
  )
}
export default SaveButton
