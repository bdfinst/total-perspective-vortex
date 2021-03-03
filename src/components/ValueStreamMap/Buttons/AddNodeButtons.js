import React, { useEffect, useState } from 'react'
import { InputOutlined } from '@material-ui/icons'
import { Tooltip } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { useValueStream } from '../valueStreamContext'
import IconButtonStyled from './IconButtonStyled'
import config from '../../../globalConfig'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.dark,
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
      <Tooltip title="Add new node">
        <IconButtonStyled onClick={handleAdd} className={classes.root}>
          <InputOutlined className={classes.arrowDown} />
        </IconButtonStyled>
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
        <IconButtonStyled
          className={selectedNode ? classes.root : classes.inactive}
          onClick={handleInsertStep}
        >
          <InputOutlined className={classes.arrowLeft} />
        </IconButtonStyled>
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
        <IconButtonStyled
          className={classes.arrowRight}
          onClick={handleAddStep}
        >
          <InputOutlined />
        </IconButtonStyled>
      </Tooltip>
    </div>
  )
}
