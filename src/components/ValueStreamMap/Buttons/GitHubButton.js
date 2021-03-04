import { GitHub } from '@material-ui/icons'
import React from 'react'

import IconButtonStyled from './IconButtonStyled'

const GitHubButton = () => (
  <IconButtonStyled
    color="inherit"
    title="Fork me on GitHub"
    onClick={() =>
      window.open('https://github.com/bdfinst/total-perspective-vortex')
    }
  >
    <GitHub />
  </IconButtonStyled>
)

export default GitHubButton
