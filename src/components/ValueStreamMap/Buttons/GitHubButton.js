import { GitHub } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import React from 'react'

const GitHubButton = () => (
  <IconButton
    component="span"
    color="inherit"
    title="Fork me on GitHub"
    onClick={() =>
      window.open('https://github.com/bdfinst/total-perspective-vortex')
    }
  >
    <GitHub />
  </IconButton>
)

export default GitHubButton
