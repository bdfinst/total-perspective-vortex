import React, { useEffect, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { useValueStream } from '../valueStreamContext'
import config from '../../../globalConfig'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
  },
  rework: {
    color: theme.palette.error.main,
  },
  inactive: {
    color: theme.palette.text.disabled,
  },
  arrowLeft: {
    transform: ' rotate(180deg)',
  },
  arrowRight: {},
  arrowDown: {
    transform: ' rotate(90deg)',
  },
}))

export const AddNode = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { createNode, state } = useValueStream()

  const handleAdd = () => {
    const node1 = state.elements[0]
    const posX = node1.position.x
    const posY = node1.position.y + config.nodeHeight - 50

    createNode(posX, posY)
  }
  return (
    <div>
      <IconButton
        title="Add new node"
        color="inherit"
        component="span"
        onClick={handleAdd}
        className={classes.root}
      >
        <InputOutlined className={classes.arrowDown} />
      </IconButton>
    </div>
  )
}

export const AddReworkNode = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { createReworkNode, state } = useValueStream()

  const handleAdd = () => {
    const node1 = state.elements[0]
    const posX = node1.position.x
    const posY = node1.position.y + config.nodeHeight - 50

    createReworkNode(posX, posY)
  }

  return (
    <div>
      <IconButton
        title="Add rework node"
        color="inherit"
        component="span"
        onClick={handleAdd}
        className={classes.root}
      >
        <InputOutlined className={`${classes.rework} ${classes.arrowDown}`} />
      </IconButton>
    </div>
  )
}

export const AddNodeBefore = ({ selectedNode }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { addNodeBefore } = useValueStream()

  const defaultTitle = 'Select node to insert before'
  const [title, setTitle] = useState(defaultTitle)

  const handleInsertStep = () => {
    addNodeBefore(selectedNode)
  }

  useEffect(() => {
    if (selectedNode) {
      setTitle(
        `Insert node before selected${selectedNode.id} ${selectedNode.data.processName}`,
      )
    } else {
      setTitle(defaultTitle)
    }
  }, [selectedNode])

  return (
    <div>
      <IconButton
        title={title}
        color="inherit"
        component="span"
        className={selectedNode ? classes.root : classes.inactive}
        onClick={handleInsertStep}
      >
        <InputOutlined className={classes.arrowLeft} />
      </IconButton>
    </div>
  )
}

export const AddNodeAfter = ({ selectedNode }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { addNodeAfter } = useValueStream()

  const unselectedTitle = 'Select node to edit'
  const [title, setTitle] = useState(unselectedTitle)

  const handleAddStep = () => {
    addNodeAfter(selectedNode)
  }

  useEffect(() => {
    if (selectedNode) {
      setTitle(
        `Add node after ${selectedNode.id} ${selectedNode.data.processName}`,
      )
    } else {
      setTitle(`Add node to end`)
    }
  }, [selectedNode])

  return (
    <div>
      <IconButton
        title={title}
        color="inherit"
        component="span"
        className={classes.arrowRight}
        onClick={handleAddStep}
      >
        <InputOutlined />
      </IconButton>
    </div>
  )
}
