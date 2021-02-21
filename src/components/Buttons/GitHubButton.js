import { GitHub } from '@material-ui/icons'
import React from 'react'

import { IconButtonStyled } from './IconButtonStyled'

export const GitHubButton = () => {
  return (
    <IconButtonStyled
      color="primary"
      title="Fork me on GitHub"
      onClick={() => window.open('https://github.com/bdfinst/value-stream-map')}
    >
      <GitHub fontSize="large" />
    </IconButtonStyled>
  )
}
