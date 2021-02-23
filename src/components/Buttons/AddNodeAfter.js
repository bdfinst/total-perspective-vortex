import React, { useEffect, useState } from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { InputOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { useValueStream } from '../../appContext/valueStreamContext'

const useStyles = makeStyles((theme) => ({
  inactive: {
    color: theme.palette.text.disabled,
  },
  active: {
    color: theme.palette.primary.dark,
  },
}))

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
          className={classes.activee}
          variant="outlined"
          onClick={handleAddStep}
        >
          <InputOutlined />
        </Button>
      </Tooltip>
    </div>
  )
}
