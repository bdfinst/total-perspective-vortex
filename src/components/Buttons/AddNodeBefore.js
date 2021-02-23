import React, { useEffect, useState } from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { useValueStream } from '../../appContext/valueStreamContext'

const useStyles = makeStyles((theme) => ({
  inactive: {
    color: theme.palette.text.disabled,
    transform: 'rotateY(180deg)',
  },
  active: {
    color: theme.palette.primary.dark,
    transform: 'rotateY(180deg)',
  },
}))

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
        `Insert node before ${selectedNode.id} ${selectedNode.data.processName}`,
      )
    } else {
      setTitle(defaultTitle)
    }
  }, [selectedNode])

  return (
    <div>
      <Tooltip title={title}>
        <Button
          className={selectedNode ? classes.active : classes.inactive}
          variant="outlined"
          onClick={handleInsertStep}
        >
          <InputOutlined />
        </Button>
      </Tooltip>
    </div>
  )
}
