import React, { useEffect, useState } from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { useValueStream } from '../valueStreamContext'

const useStyles = makeStyles((theme) => ({
  inactive: {
    color: theme.palette.text.disabled,
    transform: 'rotateY(180deg)',
  },
  arrowLeft: {
    color: theme.palette.primary.dark,
    transform: 'rotateY(180deg)',
  },
  arrowRight: {
    color: theme.palette.primary.dark,
  },
  arrowDown: {
    color: theme.palette.primary.dark,
    transform: 'rotateY(90deg)',
  },
}))

export const AddNode = () => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const { createNode } = useValueStream()

  return (
    <div>
      <Tooltip title="Add new node">
        <Button
          className={classes.arrowDown}
          variant="outlined"
          onClick={createNode({ x: 100, y: 100 })}
        >
          <InputOutlined />
        </Button>
      </Tooltip>
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
      <Tooltip title={title}>
        <Button
          className={selectedNode ? classes.arrowLeft : classes.inactive}
          variant="outlined"
          onClick={handleInsertStep}
        >
          <InputOutlined />
        </Button>
      </Tooltip>
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
      <Tooltip title={title}>
        <Button
          className={classes.arrowRight}
          variant="outlined"
          onClick={handleAddStep}
        >
          <InputOutlined />
        </Button>
      </Tooltip>
    </div>
  )
}
