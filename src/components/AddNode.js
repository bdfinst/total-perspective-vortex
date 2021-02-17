import { Container, IconButton, Paper, Tooltip } from '@material-ui/core'
import { Menu, ViewListRounded } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  icon: {
    '&:hover': {
      transform: 'scale(-1.3,1.3)',
    },
    fontSize: 40,
    color: theme.textPrimary,
  },
}))

const AddNode = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <Tooltip title="Drag to add step">
      <IconButton
        color="primary"
        aria-label="GitHub link"
        component="span"
        draggable
        onDragStart={(event) => onDragStart(event, 'customNode')}
      >
        <ViewListRounded className={classes.icon} />
      </IconButton>
    </Tooltip>
  )
}
export default AddNode