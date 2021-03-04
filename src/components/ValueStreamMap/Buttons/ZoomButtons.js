import { IconButton } from '@material-ui/core'
import { Visibility, ZoomIn, ZoomOut } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useStore, useZoomPanHelper } from 'react-flow-renderer'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  button: { color: theme.palette.primary.dark },
}))

export const ZoomInButton = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { zoomIn } = useZoomPanHelper()

  return (
    <>
      <IconButton
        title="Zoom in"
        color="inherit"
        component="span"
        className={classes.button}
        onClick={zoomIn}
      >
        <ZoomIn />
      </IconButton>
    </>
  )
}
export const ZoomOutButton = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { zoomOut } = useZoomPanHelper()

  return (
    <>
      <IconButton
        title="Zoom out"
        color="inherit"
        component="span"
        className={classes.button}
        onClick={zoomOut}
      >
        <ZoomOut />
      </IconButton>
    </>
  )
}
export const ZoomFocusButton = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { fitView, setCenter } = useZoomPanHelper()
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
    <>
      <IconButton
        title="Fit to screen"
        color="inherit"
        component="span"
        className={classes.button}
        onClick={handleFocusNode}
      >
        <Visibility />
      </IconButton>
    </>
  )
}
