import { Button, Tooltip } from '@material-ui/core'
import { GitHub } from '@material-ui/icons'
import React from 'react'

export const GitHubButton = () => {
  return (
    <div>
      <Tooltip title="Fork me on GitHub">
        <Button
          color="primary"
          aria-label="GitHub link"
          component="span"
          onClick={() => window.open('https://github.com/bdfinst/vsm-tool')}
        >
          <GitHub fontSize="large" />
        </Button>
      </Tooltip>
    </div>
  )
}
