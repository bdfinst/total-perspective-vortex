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

  const defaults = {
    title: 'Select node to edit',
    color: theme.palette.text.disabled,
  }
  const [title, setTitle] = useState(defaults.title)
  const [color, setColor] = useState(defaults.color)

  const handleOpen = () => {
    onDialogOpen()
  }

  useEffect(() => {
    if (selectedNode) {
      setColor(theme.palette.primary.main)
      setTitle(`Edit node ${selectedNode.id} ${selectedNode.data.processName}`)
    } else {
      setColor(defaults.color)
      setTitle(defaults.title)
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
