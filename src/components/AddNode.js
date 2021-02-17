import { Container, Paper, Tooltip } from '@material-ui/core'
import { Launch, Menu } from '@material-ui/icons'
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
  paper: {
    width: '4em',
    elevation: 0,
    textAlign: 'center',
    background: theme.palette.primary.main,
  },
  container: {
    align: 'center',
    padding: '20px 10px 20px 10px',
  },
}))

const AddNode = (props) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <Container className={classes.container}>
      <Tooltip title="Drag to add new step">
        <Paper
          className={classes.paper}
          variant="outlined"
          onDragStart={(event) => onDragStart(event, 'customNode')}
          draggable
        >
          <Menu className={classes.icon} />
        </Paper>
      </Tooltip>{' '}
    </Container>
  )
}
export default AddNode
