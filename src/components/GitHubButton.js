import { GitHub } from '@material-ui/icons'
import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'

const GitHubButton = (props) => {
  return (
    <div>
      <Tooltip title="Fork me on GitHub">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          href={props.href}
          target="_blank"
          rel="noreferrer"
        >
          <GitHub />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default GitHubButton
