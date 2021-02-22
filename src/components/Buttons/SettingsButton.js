import React, { useEffect, useState } from 'react'
import { SettingsOutlined } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { IconButtonStyled } from './IconButtonStyled'

const useStyles = makeStyles((theme) => ({
  inactive: {
    color: theme.palette.text.disabled,
  },
  active: {
    color: theme.palette.primary.main,
  },
}))

export const SettingsButton = ({ onDialogOpen, selectedNode }) => {
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
    <IconButtonStyled
      className={selectedNode ? classes.active : classes.inactive}
      title={title}
      onClick={handleOpen}
    >
      <SettingsOutlined fontSize="large" />
    </IconButtonStyled>
  )
}
