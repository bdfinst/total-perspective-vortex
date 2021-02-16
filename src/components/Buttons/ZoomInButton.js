import { IconButton, Tooltip } from '@material-ui/core'
import { ZoomIn } from '@material-ui/icons'
import { useZoomPanHelper } from 'react-flow-renderer'
import React from 'react'

export const ZoomInButton = () => {
  const { zoomIn } = useZoomPanHelper()

  return (
    <div>
      <Tooltip title="Reset diagram">
        <IconButton onClick={zoomIn}>
          <ZoomIn />
        </IconButton>
      </Tooltip>
    </div>
  )
}
