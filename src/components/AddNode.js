import { Card, CardContent, Typography } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      transform: 'translateZ(2)',
    },
  },
  icon: {
    transform: 'scaleX(-1)',
    '&:hover': {
      transform: 'scale(-2,2)',
    },
    fontSize: 35,
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
    <div>
      <Card
        className={classes.root}
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'customNode')}
        draggable
      >
        <CardContent className={classes.root}>
          <Launch className={classes.icon} />
        </CardContent>
      </Card>
    </div>
  )
}
export default AddNode
