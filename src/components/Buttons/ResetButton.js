import { Button, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import React from 'react'

const ResetButton = (props) => {
  return (
    <div>
      <Tooltip title="Reset diagram">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Delete />}
          onClick={props.onClick}
        >
          Reset
        </Button>
      </Tooltip>
    </div>
  )
}

export default ResetButton
