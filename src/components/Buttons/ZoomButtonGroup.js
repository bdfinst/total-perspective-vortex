import { ButtonGroup, IconButton, Tooltip } from '@material-ui/core'
import { Visibility, ZoomIn, ZoomOut } from '@material-ui/icons'
import { useStore, useZoomPanHelper } from 'react-flow-renderer'
import React from 'react'

export const ZoomButtonGroup = () => {
  const { zoomOut, fitView, zoomIn, setCenter } = useZoomPanHelper()
  const store = useStore()

  const handleFocusNode = () => {
    const { nodes } = store.getState()
    const node = nodes.find((el) => el.selected === true)

    if (node) {
      const x = node.__rf.position.x + node.__rf.width / 2
      const y = node.__rf.position.y + node.__rf.height / 2
      const zoom = 1.85

      setCenter(x, y, zoom)
    } else {
      fitView()
    }
  }

  return (
    <div>
      <ButtonGroup orientation="vertical" color="primary">
        <Tooltip title="Zoom in">
          <IconButton onClick={zoomIn}>
            <ZoomIn />
          </IconButton>
        </Tooltip>
        <Tooltip title="Zoom out">
          <IconButton onClick={zoomOut}>
            <ZoomOut />
          </IconButton>
        </Tooltip>
        <Tooltip title="Fit to screen">
          <IconButton onClick={handleFocusNode}>
            <Visibility />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}
