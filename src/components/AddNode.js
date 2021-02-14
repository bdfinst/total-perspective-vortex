import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.backgroundColor,
    color: theme.color,
    width: '60px',
    height: '60px',
    // backgroundColor: theme.primary,
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
        raised={true}
        variant="outlined"
        onDragStart={(event) => onDragStart(event, 'customNode')}
        draggable
      >
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Add Node
          </Typography>
        </CardContent>
      </Card>

      {/* <div className="description">Drag nodes to the pane on the right.</div>
      <div
        className="vsmnode input"
        onDragStart={(event) => onDragStart(event, 'customNode')}
        draggable
      >
        Add Node
      </div> */}
    </div>
  )
}
export default AddNode
