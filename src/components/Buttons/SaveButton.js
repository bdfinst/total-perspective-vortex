import { IconButton, Tooltip } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import React from 'react'
import exportFromJSON from 'export-from-json'

import { useValueStream } from '../../appContext/valueStreamContext'

export const SaveButton = (props) => {
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
        <IconButton onClick={handleExport}>
          <Save />
        </IconButton>
      </Tooltip>
    </div>
  )
}
