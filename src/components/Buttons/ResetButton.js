import { Delete } from '@material-ui/icons'
import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'

export const ResetButton = (props) => {
  return (
    <div>
      <Tooltip title="Reset diagram">
        <IconButton onClick={props.onClick}>
          <Delete />
        </IconButton>
      </Tooltip>
    </div>
  )
}
