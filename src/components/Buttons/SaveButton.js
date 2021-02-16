import { IconButton, Tooltip } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import React from 'react'

export const SaveButton = (props) => {
  return (
    <div>
      <Tooltip title="Export to file">
        <IconButton onClick={props.onClick}>
          <Save />
        </IconButton>
      </Tooltip>
    </div>
  )
}
