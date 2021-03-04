import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { SettingsOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  inactive: {
    color: theme.palette.text.disabled,
  },
  active: {
    color: theme.palette.primary.dark,
  },
}))

const SettingsButton = ({ onDialogOpen, selectedNode }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const unselectedTitle = 'Select node to edit'
  const [title, setTitle] = useState(unselectedTitle)

  const handleOpen = () => {
    onDialogOpen()
  }

  useEffect(() => {
    if (selectedNode) {
      setTitle(`Edit node ${selectedNode.id} ${selectedNode.data.processName}`)
    } else {
      setTitle(unselectedTitle)
    }
  }, [selectedNode])

  return (
    <div>
      <Button
        title={title}
        className={selectedNode ? classes.active : classes.inactive}
        onClick={handleOpen}
      >
        <SettingsOutlined />
      </Button>
    </div>
  )
}
export default SettingsButton
