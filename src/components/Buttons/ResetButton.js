import { Delete } from '@material-ui/icons'
import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'

import { useValueStream } from '../../appContext/valueStreamContext'

export const ResetButton = (props) => {
  const { reset } = useValueStream()

  const handleReset = () => reset()

  return (
    <div>
      <Tooltip title="Reset diagram">
        <IconButton onClick={handleReset}>
          <Delete />
        </IconButton>
      </Tooltip>
    </div>
  )
}
