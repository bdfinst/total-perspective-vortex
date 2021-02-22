import { SettingsOutlined } from '@material-ui/icons'
import React from 'react'

import { IconButtonStyled } from './IconButtonStyled'

export const SettingsButton = ({ onClick }) => {
  return (
    <IconButtonStyled color="primary" title="Open edit" onClick={onClick}>
      <SettingsOutlined fontSize="large" />
    </IconButtonStyled>
  )
}
