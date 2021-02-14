import { GitHub } from '@material-ui/icons'
import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'

const GitHubButton = () => {
  return (
    <div>
      <Tooltip title="Fork me on GitHub">
        <IconButton
          color="primary"
          aria-label="GitHub link"
          component="span"
          onClick={() => window.open('https://github.com/bdfinst/vsm-tool')}
        >
          <GitHub fontSize="large" />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default GitHubButton
